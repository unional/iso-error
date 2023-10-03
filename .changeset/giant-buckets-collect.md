---
'google-cloud-api': major
---

Add missing `status` in the data structure:

```ts
{
  error: {
    code: number,
    status: string, // new
    message: string,
    details: Details[]
  }
}
```

This `status` is mentioned in the [Google Cloud APIs documentation](https://cloud.google.com/apis/docs/errors) ([example](https://translate.googleapis.com/language/translate/v2?key=invalid&q=hello&source=en&target=es&format=text&$.xgafv=2)) but was not added before.

Since this change adds a new required/expected field. This is a breaking change.

