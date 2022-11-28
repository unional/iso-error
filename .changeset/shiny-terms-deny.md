---
"iso-error": major
---

Remove `IsoError.Serializable`.

While the concept is still there (`SerializableConverter`),
the type is not needed because the value across physically boundary is untyped.
