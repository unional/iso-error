---
"iso-error": patch
---

fix: relax `fromSerializable()` type

The `IsoError.Serializable` is too restrictive.
Plugin may support a different serialization that remedy any restriction from `Serializable`.

So the type does not bring much values.
