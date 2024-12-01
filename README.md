# Crea Store

A React application showcasing a product catalog with features like authentication, product details, comments, and more.

## **Overview**

This project is a single-page application built with React and TypeScript, emphasizing clean architecture and maintainable code. It simulates a product catalog where users can view products, see detailed information, and add comments. The application implements JWT-based authentication to secure user sessions, uses axios-mock-adapter to simulate API responses for development and testing, and ensures session persistence.

## Prerequisites

- **Node.js**
- **npm**

## Installation

### **1. Clone the repository**

```
git clone https://github.com/yagizcolak/e-commerce.git
cd e-commerce
```

### **2. Install Dependencies**

```
npm install
```

### **3. Running the Application**

```
npm start
```

The application will run at http://localhost:3000. It should automatically open in your default browser. If not, navigate to the URL manually.

### **4. Testing the Application**

- #### **4.1 Unit Tests**
  Each component and service has a test file, co-located in its own `__tests__` directory.

```bash
# Run all tests
npm run test

# Run in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage

# Coverage Report
Navigate to coverage/lcov-report/index.html and open it in a browser.
```
<div align="center">
  <img src="https://github.com/user-attachments/assets/81f3bba6-022b-4af3-a589-4a8db2a87b1a" alt="unit_tests" />
</div>

- #### **4.2 E2E Tests**

```bash
# Launch the Cypress Test Runner for interactive testing.
npm run cypress:open
```
<div align="center">
  <img src="https://github.com/user-attachments/assets/c4eb8d8c-cc15-4a85-91ec-5cd8feb013da" alt="e2e" />
</div>

<br/>

```bash
# Execute all Cypress tests in headless mode
npm run cypress:run
```
<div align="center">
  <img src="https://github.com/user-attachments/assets/47b60a16-107a-41a9-9c5f-36ca785702a7" alt="cypress_run" />
</div>

### **5. Key Features and Decisions**

- **Feature-Based File Structure:** Organized codebase by features (e.g., auth, products, comments) for better scalability and maintainability. Chose this structure to encapsulate related components, hooks, and services, making the codebase easier to navigate and scale. See: [bulletproof-react](https://github.com/alan2207/bulletproof-react)
- **Styling Approach**
  - **Combined MUI with SCSS:** Utilized MUI for its component library and theme management, while SCSS provided flexibility for custom styles.
  - **SCSS Modules:** Adopted CSS Modules with SCSS for local scoping of styles, preventing global namespace conflicts.
- **State Management with Context API:** Managed global states like authentication status, currency selection, and notifications using React Context. Used the built-in Context API for global state management to avoid additional dependencies and keep the application lightweight.
- **Routing with React Router:** Implemented client-side routing for navigation between pages.
- **Code Splitting with React.lazy and Suspense:** Optimized performance by lazily loading route components.
- **Authentication with JWT:** Implemented JWT-based authentication to secure user sessions.
- **API Mocking with axios-mock-adapter:** Utilized axios-mock-adapter to simulate API responses, facilitating development and testing without a real backend.
- **Session Persistence:** Maintained user sessions using sessionStorage to ensure persistent state across page reloads.
- **Testing Strategy**
  - **Unit Testing with Jest and React Testing Library:** Ensured code reliability through comprehensive unit tests for components, services and utilities.
  - **End-to-End Testing with Cypress:** Validated user flows and interactions with E2E tests.
 
### **6. Project Structure**

```
src/
├── api/                   # API configurations and mock endpoints
├── assets/                # Static assets (e.g. images, logos)
├── components/            # Reusable components
│   ├── common/            # Shared components
│   └── layouts/           # Layout components
├── context/               # Global state providers
├── features/              # Feature-specific modules
│   ├── auth/              # Authentication feature
│   ├── comments/          # Comments feature
│   ├── products/          # Products feature
│   │   ├── components/    # Feature-specific components
│   │   │   └── ProductCard/  # Example: ProductCard component
│   │   │       ├── ProductCard.tsx
│   │   │       ├── ProductCard.module.scss
│   │   │       └── __tests__/
│   │   │           └── ProductCard.test.tsx
│   │   ├── hooks/         # Feature-specific hooks
│   │   ├── services/      # API services for feature-specific data
│   │   ├── types/         # TypeScript models
│   │   └── utils/         # Utility functions
├── styles/                # Global SCSS variables and themes
├── types/                 # Shared TypeScript types
├── utils/                 # General utilities
```


### **7. Styling**

- #### **6.1 Theme Colors**

| Property          | Color Name                | Light Mode Value | Dark Mode Value |
| ----------------- | ------------------------- | ---------------- | --------------- |
| Primary Colors    | `--primary-color`         | `#1976d2`        | `#1976d2`       |
|                   | `--primary-color-light`   | `#63a4ff`        | `#63a4ff`       |
|                   | `--primary-color-dark`    | `#004ba0`        | `#004ba0`       |
| Secondary Colors  | `--secondary-color`       | `#9c27b0`        | `#9c27b0`       |
|                   | `--secondary-color-light` | `#d05ce3`        | `#d05ce3`       |
|                   | `--secondary-color-dark`  | `#6a0080`        | `#6a0080`       |
| Error Colors      | `--error-color`           | `#f44336`        | `#f44336`       |
|                   | `--error-color-light`     | `#ff7961`        | `#ff7961`       |
|                   | `--error-color-dark`      | `#ba000d`        | `#ba000d`       |
| Warning Colors    | `--warning-color`         | `#ffa726`        | `#ffa726`       |
| Info Colors       | `--info-color`            | `#29b6f6`        | `#29b6f6`       |
| Success Colors    | `--success-color`         | `#66bb6a`        | `#66bb6a`       |
| Background Colors | `--background-color`      | `#ffffff`        | `#1d1d1d`       |
|                   | `--background-default`    | `#f0f0f0`        | `#121212`       |
| Text Colors       | `--text-primary-color`    | `#212121`        | `#ffffff`       |
|                   | `--text-secondary-color`  | `#757575`        | `#757575`       |
| Common Colors     | `--white-color`           | `#ffffff`        | `#ffffff`       |
|                   | `--black-color`           | `#000000`        | `#000000`       |

- #### **6.2 SCSS Variables & Mixins**
  | **Category**  | **Variable Name**       | **Value**                                    |
  | ------------- | ----------------------- | -------------------------------------------- |
  | Fonts         | `$font-family`          | `'Roboto', 'Helvetica', 'Arial', sans-serif` |
  |               | `$font-size-small`      | `0.875rem` (14px)                            |
  |               | `$font-size-base`       | `1rem` (16px)                                |
  |               | `$font-size-large`      | `1.25rem` (20px)                             |
  |               | `$font-weight-light`    | `300`                                        |
  |               | `$font-weight-regular`  | `400`                                        |
  |               | `$font-weight-medium`   | `500`                                        |
  |               | `$font-weight-bold`     | `700`                                        |
  | Spacing       | `$spacing-unit`         | `8px`                                        |
  | Border Radius | `$border-radius-small`  | `4px`                                        |
  |               | `$border-radius-medium` | `8px`                                        |
  |               | `$border-radius-large`  | `16px`                                       |
  | Shadows       | `$box-shadow-default`   | `0px 1px 3px rgba(0, 0, 0, 0.2)`             |
  |               | `$box-shadow-medium`    | `0px 3px 6px rgba(0, 0, 0, 0.16)`            |
  |               | `$box-shadow-large`     | `0px 10px 20px rgba(0, 0, 0, 0.19)`          |

| **Mixin Name**              | **Purpose**                   | **Details**                                                            |
| --------------------------- | ----------------------------- | ---------------------------------------------------------------------- |
| `@mixin flex-center`        | Centers content using flexbox | Sets `display: flex`, `justify-content: center`, `align-items: center` |
| `@mixin transition`         | Adds smooth transitions       | Accepts `$properties`, `$duration`, and `$timing-function` arguments   |
| `@mixin button-hover-scale` | Adds hover scaling effect     | Includes the `transform` property and enlarges on hover                |
| `@mixin icon-spacing`       | Adds spacing for icons        | Adds `margin-right` and aligns the icon with `inline-flex`             |
