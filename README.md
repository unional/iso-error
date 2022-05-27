# iso-error

[![GitHub Action][github-release]][github-action-url]
[![VS Code][vscode-image]][vscode-url]

Welcome to the [`iso-error`] monorepo.

[`iso-error`] is about making errors work across the physical boundary.

Packages:

- [`iso-error`]
- [`google-cloud-api`]
- [`iso-error-google-cloud-api`]
- [`iso-error-web`]

## Contributing

This repository uses [yarn] v3.

You should use [corepack] to manage your package managers.

We follow [conventional commits] to manage our changes,
and we use [changesets] to manage versioning.

If you are creating an PR,
please run `yarn changeset` (or `yarn cs` for short) to describe your changes.

[`google-cloud-api`]: https://github.com/unional/iso-error/tree/main/packages/google-cloud-api
[`iso-error`]: https://github.com/unional/iso-error/tree/main/packages/iso-error
[`iso-error-google-cloud-api`]: https://github.com/unional/iso-error/tree/main/packages/iso-error-google-cloud-api
[`iso-error-web`]: https://github.com/unional/iso-error/tree/main/packages/iso-error-web
[changesets]: https://github.com/changesets/changesets
[conventional commits]: https://www.conventionalcommits.org/en/v1.0.0/
[corepack]: https://nodejs.org/api/corepack.html
[github-action-url]: https://github.com/unional/iso-error/actions
[github-release]: https://github.com/unional/iso-error/workflows/release/badge.svg
[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/
[yarn PnP]: https://yarnpkg.com/features/pnp
