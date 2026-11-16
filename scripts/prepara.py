"""Create a private project from the complete original template without overwriting."""
from pathlib import Path
import argparse
import re
import shutil
import sys

ROOT = Path(__file__).resolve().parents[1]


def prepare(root, slug):
    if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', slug):
        raise ValueError('Use an ASCII kebab-case project name')
    destination = root / 'projects' / slug
    if destination.exists() or destination.is_symlink():
        raise FileExistsError('Project exists; resume its WORKFLOW_STATUS.md')
    if (root / 'projects').is_symlink():
        raise ValueError('projects cannot be a symlink')
    shutil.copytree(root / '02_PROJECT_TEMPLATE', destination)
    return destination


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('slug')
    args = p.parse_args()
    try:
        prepare(ROOT, args.slug)
        print('Project created in projects/' + args.slug + '. Fill 01_INPUT/CLIENT_BRIEF.md and follow AGENTS.md.')
    except (ValueError, OSError) as exc:
        print(type(exc).__name__ + ': project not created; check name, template and destination.', file=sys.stderr)
        return 2
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
