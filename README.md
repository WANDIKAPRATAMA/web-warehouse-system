# Product Management Application

## Overview

This application is a full-stack product management system designed to handle products, product categories, product stocks, warehouse locations, and a dashboard for summary analytics. The frontend is implemented in TypeScript with a modular architecture using the **Repository Pattern**, ensuring scalability and maintainability. The backend is built with Go using the Fiber framework, providing a RESTful API. The system supports authentication and authorization, with role-based access control and token-based authentication.

### Features

- **Authentication**: User signup, signin, password change, role change, token refresh, and signout.
- **Products**: CRUD operations for products, including SKU and category management.
- **Product Categories**: CRUD operations for categorizing products.
- **Product Stocks**: Manage stock levels tied to products and warehouse locations.
- **Warehouse Locations**: CRUD operations for warehouse management.
- **Dashboard**: Displays summary metrics like total stock, number of products, low stock, and out-of-stock items.
- **Error Handling**: Robust validation and error handling for duplicate entries (e.g., SKU conflicts).
- **Backend Switching**: Supports REST and (placeholder) Supabase backends via environment configuration.

### Tech Stack

- **Frontend**:
  - TypeScript
  - Zod (for schema validation)
  - Fetch API (for HTTP requests)
  - Cookie handling library (e.g., `react-cookie` or framework-specific)
- **Backend**:
  - Go with Fiber framework
  - UUID for unique identifiers
  - Validator for request validation
- **Environment**:
  - Node.js (for frontend)
  - Go runtime (for backend)
- **Optional**:
  - Supabase (placeholder for alternative backend)

## Prerequisites

To run the application, ensure the following are installed:

- **Node.js** (v16 or higher) for the frontend
- **npm** or **yarn** for package management
- **Go** (v1.18 or higher) for the backend
- **Git** for cloning the repository
- A modern browser (e.g., Chrome, Firefox) for testing
- Optional: Supabase account if using the Supabase backend

## Getting Started

Follow these steps to set up and run the application locally.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Set Up Environment Variables

The application uses environment variables to configure the API base URL, authentication secrets, and backend mode. A sample configuration is provided in `src/libs/configs/.env.example`.

1. Navigate to `src/libs/configs` (for frontend) and create a `.env` file by copying `.env.example`:

   ```bash
   cp src/libs/configs/.env.example src/libs/configs/.env
   ```

2. Edit `src/libs/configs/.env` with the following values:

   ```
   # Frontend environment variables
   NEXTAUTH_URL=http://localhost:3000
   AUTH_SECRET=420b7a99ab9ab44b1bf27564aca86246
   API_BASE_URL=http://localhost:8080/api
   MODE=rest # Set to "supabase" for Supabase backend
   ```

3. For the backend, create a `.env` file in the root of the Go project (adjust based on your backend setup). Example:
   ```
   # Backend environment variables
   PORT=8080
   DB_URL=your_database_connection_string
   JWT_SECRET=your_jwt_secret
   ```

### 3. Install Dependencies

#### Frontend

Navigate to the frontend directory (e.g., `frontend/` or root if monorepo):

```bash
cd frontend
npm install
# or
yarn install
```

#### Backend

Navigate to the backend directory (e.g., `backend/` or root for Go):

```bash
cd backend
go mod tidy
```

### 4. Run the Application

#### Backend

Start the Go backend server:

```bash
cd backend
go run main.go
```

The backend will run on `http://localhost:8080` (or the port specified in `.env`).

#### Frontend

Start the frontend development server:

```bash
cd frontend
npm run dev
# or
yarn dev
```

The frontend will run on `http://localhost:3000` (as specified in `NEXTAUTH_URL`).

### 5. Access the Application

Open your browser and navigate to `http://localhost:3000`. You can now interact with the application, including:

- Signing up or signing in to obtain an access token.
- Managing products, categories, stocks, and warehouse locations.
- Viewing the dashboard summary.

### 6. Example API Usage

To interact with the API directly (e.g., via Postman or curl):

1. **Sign Up**:
   ```bash
   curl -X POST http://localhost:8080/api/auth/signup \
   -H "Content-Type: application/json" \
   -d '{"email": "user@example.com", "password": "password123", "full_name": "John Doe"}'
   ```
2. **Get Products** (requires token):
   ```bash
   curl -X GET http://localhost:8080/api/products \
   -H "Authorization: Bearer <your-token>"
   ```

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── libs/
│   │   │   ├── configs/
│   │   │   │   ├── .env.example
│   │   │   │   ├── .env
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth-validation.ts
│   │   │   │   ├── auth-action.ts
│   │   │   │   ├── auth-interface.ts
│   │   │   │   ├── auth-repository.ts
│   │   │   │   ├── auth-services.ts
│   │   │   ├── products/
│   │   │   ├── product-categories/
│   │   │   ├── product-stocks/
│   │   │   ├── warehouse-locations/
│   │   │   ├── dashboard/
│   │   ├── api-types.ts
│   │   ├── api-base.ts
├── backend/
│   ├── main.go
│   ├── dtos/
│   ├── controllers/
│   ├── usecases/
│   ├── routes/
│   ├── middleware/
│   ├── .env
```

- **frontend/src/libs/configs**: Environment configuration.
- **frontend/src/modules**: Module-specific files for validation, actions, interfaces, repositories, and services.
- **backend**: Go-based REST API with Fiber framework.

## Architecture Details

The frontend follows the **Repository Pattern** with a modular structure:

- **Validation**: Zod schemas ensure type safety for requests/responses.
- **Actions**: Entry points for business logic, validating tokens.
- **Interfaces**: Define contracts for repository implementations.
- **Repositories**: Abstract data access (REST or Supabase).
- **Services**: Handle API calls, validation, and error handling (e.g., duplicate SKU errors).

For detailed architecture, refer to the [Architecture Documentation](#architecture-documentation) section (assumed to exist in a separate file or as part of this README).

## Troubleshooting

- **401 Unauthorized**: Ensure a valid token is provided in the `Authorization` header.
- **400 Validation Failed**: Check request payload against Zod schemas.
- **500 Server Error**: Verify backend is running and `API_BASE_URL` is correct.
- **Supabase Not Implemented**: Set `MODE=rest` in `.env` unless Supabase is configured.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact

For support or inquiries, contact [your-email@example.com].

---

This README provides a clear guide to setting up and running the application, with a focus on environment configuration and prerequisites. Let me know if you need further customization or additional sections!
