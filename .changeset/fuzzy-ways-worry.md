---
'google-cloud-api': major
---

Flatten spec.

The updated folder-based spec does not work well when used.
It creates conflicting schema names between `code/*` and `status/*`.

Also, the naming scheme of `error~any-of` and `error=aborted` create invalid key per OpenAPI spec.

They are now replaced with `-`.
Although it missed some meaning, that's a compromise need to be made.

