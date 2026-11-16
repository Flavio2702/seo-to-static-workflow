[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$WorkingDirectory,

  [Parameter(Mandatory = $true)]
  [ValidateNotNullOrEmpty()]
  [string]$Target,

  [ValidateSet("context_load", "bridge_preflight")]
  [string]$Mode = "context_load",

  [string]$SkillDirectory = $env:IMPECCABLE_HOME,

  [switch]$RequireDesign
)

$repositoryRoot = Split-Path -Parent $PSScriptRoot
$projectsRoot = Join-Path $repositoryRoot "projects"

$resolvedProjectsRoot = Resolve-Path -LiteralPath $projectsRoot -ErrorAction Stop
$resolvedWorkingDirectory = Resolve-Path -LiteralPath $WorkingDirectory -ErrorAction Stop
$projectsPath = [System.IO.Path]::GetFullPath($resolvedProjectsRoot.Path).TrimEnd('\', '/')
$requestedWorkingPath = [System.IO.Path]::GetFullPath($resolvedWorkingDirectory.Path).TrimEnd('\', '/')
$projectsPrefix = $projectsPath + [System.IO.Path]::DirectorySeparatorChar

if (-not $requestedWorkingPath.StartsWith($projectsPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "Working directory non valida. Usa una cartella dentro projects/<cliente>/."
}

$relativeWorkingPath = $requestedWorkingPath.Substring($projectsPath.Length).TrimStart('\', '/')
$workingSegments = $relativeWorkingPath -split '[\\/]'
if ($workingSegments.Count -lt 1 -or [string]::IsNullOrWhiteSpace($workingSegments[0]) -or $workingSegments[0] -eq '.') {
  throw "Working directory non valida. Specifica un progetto projects/<cliente>/."
}

$clientRoot = [System.IO.Path]::GetFullPath((Join-Path $projectsPath $workingSegments[0])).TrimEnd('\', '/')
$clientPrefix = $clientRoot + [System.IO.Path]::DirectorySeparatorChar
if ($requestedWorkingPath -ne $clientRoot -and -not $requestedWorkingPath.StartsWith($clientPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "Working directory non valida. Impossibile risolvere un solo progetto cliente."
}

if ([System.IO.Path]::IsPathRooted($Target)) {
  throw "Target non valido. Usa un path relativo alla root del progetto cliente."
}

$targetSegments = $Target -split '[\\/]'
if ($targetSegments -contains '..') {
  throw "Target non valido. Il traversal con '..' non e consentito."
}

$normalizedTargetInput = $Target.Trim()
if ([string]::IsNullOrWhiteSpace($normalizedTargetInput) -or $normalizedTargetInput -eq '.') {
  throw "Target non valido. Specifica un file o una route cliente-relative."
}

$targetPath = [System.IO.Path]::GetFullPath((Join-Path $clientRoot $normalizedTargetInput))
if ($targetPath -eq $clientRoot -or -not $targetPath.StartsWith($clientPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "Target non valido. Il target deve restare dentro il progetto cliente."
}
$targetRelative = $targetPath.Substring($clientRoot.Length).TrimStart('\', '/').Replace('\', '/')

$userProfilePath = [Environment]::GetFolderPath('UserProfile')
if (-not $SkillDirectory) {
  $SkillDirectory = Join-Path $userProfilePath ".agents\skills\impeccable"
}
$skillRoot = (Resolve-Path -LiteralPath $SkillDirectory -ErrorAction Stop).Path
$skillDefinitionPath = Join-Path $skillRoot "SKILL.md"
$versionMatch = Select-String -LiteralPath $skillDefinitionPath -Pattern '^\s*version:\s*(\S+)\s*$' | Select-Object -First 1
if (-not $versionMatch) { throw "Versione Impeccable non leggibile da SKILL.md." }
$impeccableVersion = $versionMatch.Matches[0].Groups[1].Value
$scriptPath = Join-Path $skillRoot "scripts\context.mjs"
$launcherPath = Join-Path $skillRoot "scripts\impeccable.cmd"
if (-not (Test-Path -LiteralPath $scriptPath) -and -not (Test-Path -LiteralPath $launcherPath)) {
  throw "Launcher Impeccable assente: installare la skill o impostare IMPECCABLE_HOME."
}

function Write-ArtifactState {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Label,

    [Parameter(Mandatory = $true)]
    [string]$RelativePath
  )

  $artifactPath = Join-Path $clientRoot $RelativePath
  if (-not (Test-Path -LiteralPath $artifactPath -PathType Leaf)) {
    throw "Artifact richiesto mancante: $RelativePath"
  }

  $artifact = Get-Item -LiteralPath $artifactPath -ErrorAction Stop
  if ($artifact.Length -le 0) {
    throw "Artifact richiesto vuoto: $RelativePath"
  }

  $artifactHash = (Get-FileHash -LiteralPath $artifactPath -Algorithm SHA256).Hash.ToLowerInvariant()
  Write-Output "$Label.path=$RelativePath"
  Write-Output "$Label.sha256=$artifactHash"
}

Write-Output "IMPECCABLE_PREFLIGHT"
Write-Output "mode=$Mode"
Write-Output "impeccable_version=$impeccableVersion"
Write-Output "client_root=$clientRoot"
Write-Output "working_directory=$clientRoot"
Write-Output "requested_working_directory=$requestedWorkingPath"
Write-Output "target=$targetRelative"
Write-Output "design_required=$($RequireDesign.IsPresent.ToString().ToLowerInvariant())"

Write-ArtifactState -Label "product_bridge" -RelativePath "PRODUCT.md"
Write-ArtifactState -Label "product_canonical" -RelativePath "01_INPUT\PRODUCT.md"

if ($RequireDesign) {
  Write-ArtifactState -Label "design_bridge" -RelativePath "DESIGN.md"
  Write-ArtifactState -Label "design_canonical" -RelativePath "04_DESIGN\DESIGN.md"
  Write-ArtifactState -Label "mock_spec" -RelativePath "04_DESIGN\MOCK_IMPLEMENTATION_SPEC.md"
}

if ($Mode -eq "bridge_preflight") {
  Write-Output "status=ok"
  return
}

Write-Output "context_command=node context.mjs --target $targetRelative"
Push-Location $clientRoot
try {
  if (Test-Path -LiteralPath $scriptPath) {
    & node $scriptPath --target $targetRelative
  } else {
    & $launcherPath context --target $targetRelative
  }
  if ($LASTEXITCODE -ne 0) {
    throw "context.mjs terminato con exit code $LASTEXITCODE."
  }
}
finally {
  Pop-Location
}
Write-Output "status=ok"
