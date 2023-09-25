---
'iso-error-web': patch
---

Relax the type of `HttpStatusText` to `Record<number, string>`.
This allows user to use it by passing in an `number`:

```ts

// `Response['status']: number`
const response: Response = await fetch(...)

const status = HttpStatusText[response.status]
```
