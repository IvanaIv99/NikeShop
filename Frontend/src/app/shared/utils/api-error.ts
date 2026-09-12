import { HttpErrorResponse } from '@angular/common/http';

export function extractApiErrorMessage(
  error: unknown,
  fallback = 'Something went wrong. Please try again.'
): string {
  const message = (error as HttpErrorResponse)?.error?.data?.message;
  return typeof message === 'string' && message.trim().length > 0 ? message : fallback;
}
