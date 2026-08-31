---
'iso-error': patch
'iso-error-web': patch
'iso-error-google-cloud-api': patch
'google-cloud-api': patch
---

Point package metadata at the `cyberuni/iso-error` repository.

The repository moves out of the personal `unional` namespace so it can publish to
npm through GitHub OIDC trusted publishing instead of a long-lived `NPM_TOKEN`.
`repository`, `homepage` and `bugs` now name the new location, so the links npm
renders on each package page resolve.
