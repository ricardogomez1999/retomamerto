export function isValidationError(
  error: unknown
): error is { name: string; message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    (error as { name?: unknown }).name === "ValidationError"
  );
}
