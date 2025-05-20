/**
 * Check that `source` is a non-null object and has a key `K`.
 *
 * NOTE: only safe for single-string keys; nesting beyond this
 * point you’ll still have to assert or use a manual cast.
 */
export function hasKey(
  source: unknown,
  key: string,
): source is Record<string, unknown> {
  return (
    source != null &&
    (typeof source === "object" || typeof source === "function") &&
    key in source
  );
}
