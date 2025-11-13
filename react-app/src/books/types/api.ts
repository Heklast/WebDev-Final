export type ApiResponse<T> = { data: T } | T

export function unwrapApiResponse<T>(payload: ApiResponse<T>): T {
  // If payload has a `data` field, return it; otherwise return payload as T
  if (payload && typeof payload === 'object') {
    const maybeObj = payload as Record<string, unknown>
    if ('data' in maybeObj) {
      return (maybeObj['data'] as unknown) as T
    }
  }
  return payload as T
}
