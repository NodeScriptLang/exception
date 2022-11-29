# Type-safe Exception

> Because Error class in JavaScript could have been designed better.

Simple serialization-friendly Exception class, with opt-in type-safe details, numeric status code and custom fields.

## Examples

```ts
import { Exception } from '@nodescript/exception';

// Sometimes it's handy to put all app errors in `errors.ts`, for better centralization and visibility

// Error `name` will be inferred from class name
export class ValidationError extends Exception {
    // Optionally, numeric `status` can be assigned
    status = 400;
}

// Optionally, `details` field can have types

export class AccessDeniedError extends Exception<{ reason: string }> {
    status = 403;
}

throw new AccessDeniedError('You are not allowed here', { reason: 'too boring' });
```
