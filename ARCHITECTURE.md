# Frontend Architecture Documentation for API Modules

## Overview

This project implements a modular frontend architecture for interacting with backend APIs, following the **Repository Pattern**. The pattern abstracts data access logic, allowing seamless switching between different backends (e.g., REST API or Supabase) without changing the client-side code. This promotes maintainability, testability, and scalability.

The architecture is applied consistently across modules such as:

- **Auth**: Handles authentication-related operations (e.g., signup, signin, change password).
- **Products**: Manages product CRUD operations and listing.
- **Product Categories**: Manages product category CRUD and listing.
- **Product Stocks**: Manages stock inventory CRUD and listing.
- **Warehouse Locations**: Manages warehouse location CRUD and listing.
- **Dashboard**: Provides summary data for dashboard views.

Each module follows a standardized structure with files for validation, actions, interfaces, repositories, and services. This ensures consistency and reusability.

Key principles:

- **Validation**: Uses Zod for schema validation to ensure data integrity.
- **Abstraction**: Repository interface defines contracts; implementations handle specific backends.
- **API Interaction**: REST services use a shared `apiFetch` utility for HTTP requests.
- **Error Handling**: Centralized error handling for validation, API errors, and unauthorized access.
- **Configurability**: Environment variable `MODE` (e.g., "supabase") switches backend implementations.

## Architecture Diagram

Below is a high-level flow of the architecture:

```
User Interaction (e.g., UI Component)
          |
          v
Action Functions (action.ts)
          |
          v
Repository Factory (newModuleRepository() in repository.ts)
          |
          +------------------> Supabase Implementation (if MODE === "supabase")
          |
          v
REST Repository Implementation (RestModuleRepository in repository.ts)
          |
          v
Service Functions (services.ts) --> apiFetch Utility
          |
          v
Backend API (REST endpoints)
```

- **Action Layer**: Entry point for business logic calls.
- **Repository Layer**: Abstracts data source (REST or Supabase).
- **Service Layer**: Handles actual API calls and validation.

## File Structure

Each module (e.g., `auth`, `products`) has its own directory with the following files:

1. **module-validation.ts**:

   - Defines Zod schemas for request and response types.
   - Exports schemas (e.g., `SignupRequestSchema`) and inferred types (e.g., `SignupRequest`).
   - Purpose: Ensures input/output data validation to catch errors early.
   - Example (from auth):
     ```typescript
     export const SignupRequestSchema = z.object({
       email: z.string().email(),
       password: z.string().min(8),
       full_name: z.string().min(1),
     });
     export type SignupRequest = z.infer<typeof SignupRequestSchema>;
     ```

2. **module-action.ts**:

   - Exports action functions that serve as the public API for the module.
   - Each function checks for token (if required), creates a repository instance via factory, and calls the repository method.
   - Purpose: Orchestrates the call, handles basic auth checks, and returns APIResponse.
   - Example (from products):
     ```typescript
     export async function createProductAction(
       token: string,
       data: CreateProductRequest
     ): Promise<APIResponse<ProductResponse | null>> {
       if (!token) {
         /* Return unauthorized error */
       }
       const repo = newProductRepository();
       return repo.createProduct(token, data);
     }
     ```

3. **module-interface.ts**:

   - Defines the TypeScript interface for the repository.
   - Lists all methods with signatures (e.g., params and return types).
   - Purpose: Enforces contract for all repository implementations.
   - Example (from auth):
     ```typescript
     export interface AuthRepository {
       signUp(
         cookies: Cookies,
         data: SignupRequest
       ): Promise<APIResponse<SignupResponse | null>>;
       // Other methods...
     }
     ```

4. **module-repository.ts**:

   - Implements the repository interface.
   - Includes:
     - `SupabaseModuleRepository`: Placeholder for Supabase backend (throws error if not implemented).
     - `RestModuleRepository`: Calls REST services, with token checks.
   - Factory function `newModuleRepository()`: Returns appropriate implementation based on `process.env.MODE`.
   - Purpose: Switches backends dynamically.
   - Example (from products):
     ```typescript
     export class RestProductRepository implements ProductRepository {
       async createProduct(
         token: string,
         data: CreateProductRequest
       ): Promise<APIResponse<ProductResponse | null>> {
         if (!token) {
           /* Return unauthorized */
         }
         return createProductRest(token, data);
       }
     }
     export function newProductRepository(): ProductRepository {
       if (process.env.MODE === "supabase")
         return new SupabaseProductRepository();
       return new RestProductRepository();
     }
     ```

5. **module-services.ts**:
   - Contains REST-specific functions for API calls.
   - Validates data with Zod schemas.
   - Uses `apiFetch` to make HTTP requests.
   - Handles errors, including custom logic (e.g., detecting duplicate errors from response.message).
   - Purpose: Low-level API interaction and validation.
   - Example (from products):
     ```typescript
     export async function createProductRest(
       token: string,
       data: CreateProductRequest
     ): Promise<APIResponse<ProductResponse | null>> {
       try {
         const validatedData = CreateProductRequestSchema.safeParse(data);
         if (!validatedData.success) {
           /* Return validation error */
         }
         const response = await apiFetch<ProductResponse>(
           "/products",
           "POST",
           { Authorization: `Bearer ${token}` },
           validatedData.data
         );
         if (
           response.status === "error" &&
           response.message.toLowerCase().includes("duplicate")
         ) {
           // Custom error handling for duplicates
         }
         return response;
       } catch (error) {
         /* Handle Zod or general errors */
       }
     }
     ```

## Shared Components

- **api-types.ts**: Defines common types like `APIResponse`, `Payload`, `ErrorDetail`, etc.
- **api-base.ts** (assumed): Contains `apiFetch` function for HTTP requests and `handleZodError` for Zod error formatting.
- **Cookies Handling**: In auth module, uses cookies for token storage (e.g., via `@remix-run/node` or similar library).
- **Environment Variables**: `process.env.MODE` for backend switching; `API_BASE_URL` for REST endpoint.

## Data Flow

1. **Client Call**: UI/component calls an action function (e.g., `signUpAction(data)`).
2. **Action**: Validates token (if needed), gets repository via factory, calls repo method.
3. **Repository**: If REST, forwards to service with token check.
4. **Service**: Validates input with Zod, calls `apiFetch`, processes response (e.g., custom duplicate error handling), returns `APIResponse`.
5. **Response Propagation**: Errors bubble up as `APIResponse` with status, message, and errors.

## Error Handling

- **Validation Errors**: Zod parses data; failures return 400 with field-specific errors.
- **Unauthorized**: Token checks return 401.
- **API Errors**: Caught in `apiFetch`; custom logic for duplicates (e.g., SKU conflicts).
- **General Errors**: Fall back to 500 with "Unexpected server error".

## Best Practices Followed

- **Type Safety**: Zod for runtime validation + TypeScript types.
- **Modularity**: Each module is self-contained.
- **Extensibility**: Easy to add Supabase impl or new modules.
- **Security**: Token-based auth for protected endpoints.
- **Performance**: Uses caching in `apiFetch` where applicable.

## Example Usage

In a UI component (e.g., React):

```typescript
import { signUpAction } from "./auth-action";

async function handleSignup(formData) {
  const response = await signUpAction({
    email: "...",
    password: "...",
    full_name: "...",
  });
  if (response.status === "success") {
    // Handle success
  } else {
    // Display errors
  }
}
```

## Dependencies

- **zod**: For schema validation.
- **fetch API**: Native or polyfilled for `apiFetch`.
- **Cookie Library**: E.g., `react-cookie` or framework-specific for auth.
- **Environment**: Node.js with TypeScript.

## Future Improvements

- Implement full Supabase backend in placeholders.
- Add unit tests for actions, repositories, and services.
- Integrate with state management (e.g., Redux) for global token handling.

For questions or contributions, contact [your-email@example.com].
