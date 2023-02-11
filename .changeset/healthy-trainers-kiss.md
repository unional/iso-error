---
"iso-error-google-cloud-api": minor
---

Re-export `google-cloud-api`.
So now consumer can get code in `google-cloud-api` directly from `iso-error-google-cloud-api`.

This ensure the same version is being used.

If not, the serialization might fail due to version mismatch,
and `instanceof` check will fail.
