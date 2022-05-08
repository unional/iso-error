# iso-error

[![GitHub Action][github-release]][github-action-url]
[![VS Code][vscode-image]][vscode-url]

Welcome to the [`iso-error`] monorepo.

[`iso-error`] is about making errors work across the physical boundary.

## Contributing

This repository uses [yarn PnP].

You should use [corepack] to manage your package managers.

When using [VS Code][vscode-url],
please first install the recommended extensions before running `yarn`.

We follow [conventional commits] to manage our changes,
and we use [changesets] to manage versioning.

If you are creating an PR,
please run `yarn changeset` (or `yarn cs` for short) to describe your changes.

[`iso-error`]: https://github.com/unional/iso-error/tree/main/packages/iso-error
[changesets]: https://github.com/changesets/changesets
[conventional commits]: https://www.conventionalcommits.org/en/v1.0.0/
[corepack]: https://nodejs.org/api/corepack.html
[github-action-url]: https://github.com/unional/iso-error/actions
[github-release]: https://github.com/unional/iso-error/workflows/release/badge.svg
[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/
[yarn PnP]: https://yarnpkg.com/features/pnp
