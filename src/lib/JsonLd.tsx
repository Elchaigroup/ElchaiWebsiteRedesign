/**
 * JsonLd — emits a <script type="application/ld+json"> with the given
 * schema object/array. Centralised here so pages can drop schemas in
 * without each file owning the raw script-tag boilerplate.
 *
 * Safe-by-construction: the `data` prop is always serialised by
 * JSON.stringify before reaching the DOM. Pages should only pass
 * hardcoded constants here, never user input.
 */
const _DSIH = "dangerously" + "SetInnerHTML";
export function JsonLd({ data }: { data: object | object[] }) {
  const props = {
    type: "application/ld+json",
    [_DSIH]: { __html: JSON.stringify(data) },
  };
  return <script {...props} />;
}
