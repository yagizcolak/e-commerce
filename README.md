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

- #### **4.2 E2E Tests**

```bash
# Launch the Cypress Test Runner for interactive testing.
npm run cypress:open

# Execute all Cypress tests in headless mode
npm run cypress:run
```

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

### **6. Styling**

- #### **6.1 Theme Colors**

| Property            | Color Name                 | Light Mode Value                              | Dark Mode Value                              |
|---------------------|----------------------------|-----------------------------------------------|---------------------------------------------|
| Primary Colors      | `--primary-color`          | `#1976d2` <span style="display:inline-block;width:10px;height:10px;background-color:#1976d2;border-radius:50%;margin-left:5px;"></span> | `#1976d2` <span style="display:inline-block;width:10px;height:10px;background-color:#1976d2;border-radius:50%;margin-left:5px;"></span> |
|                     | `--primary-color-light`    | `#63a4ff` <span style="display:inline-block;width:10px;height:10px;background-color:#63a4ff;border-radius:50%;margin-left:5px;"></span> | `#63a4ff` <span style="display:inline-block;width:10px;height:10px;background-color:#63a4ff;border-radius:50%;margin-left:5px;"></span> |
|                     | `--primary-color-dark`     | `#004ba0` <span style="display:inline-block;width:10px;height:10px;background-color:#004ba0;border-radius:50%;margin-left:5px;"></span> | `#004ba0` <span style="display:inline-block;width:10px;height:10px;background-color:#004ba0;border-radius:50%;margin-left:5px;"></span> |
| Secondary Colors    | `--secondary-color`        | `#9c27b0` <span style="display:inline-block;width:10px;height:10px;background-color:#9c27b0;border-radius:50%;margin-left:5px;"></span> | `#9c27b0` <span style="display:inline-block;width:10px;height:10px;background-color:#9c27b0;border-radius:50%;margin-left:5px;"></span> |
|                     | `--secondary-color-light`  | `#d05ce3` <span style="display:inline-block;width:10px;height:10px;background-color:#d05ce3;border-radius:50%;margin-left:5px;"></span> | `#d05ce3` <span style="display:inline-block;width:10px;height:10px;background-color:#d05ce3;border-radius:50%;margin-left:5px;"></span> |
|                     | `--secondary-color-dark`   | `#6a0080` <span style="display:inline-block;width:10px;height:10px;background-color:#6a0080;border-radius:50%;margin-left:5px;"></span> | `#6a0080` <span style="display:inline-block;width:10px;height:10px;background-color:#6a0080;border-radius:50%;margin-left:5px;"></span> |
| Error Colors        | `--error-color`            | `#f44336` <span style="display:inline-block;width:10px;height:10px;background-color:#f44336;border-radius:50%;margin-left:5px;"></span> | `#f44336` <span style="display:inline-block;width:10px;height:10px;background-color:#f44336;border-radius:50%;margin-left:5px;"></span> |
|                     | `--error-color-light`      | `#ff7961` <span style="display:inline-block;width:10px;height:10px;background-color:#ff7961;border-radius:50%;margin-left:5px;"></span> | `#ff7961` <span style="display:inline-block;width:10px;height:10px;background-color:#ff7961;border-radius:50%;margin-left:5px;"></span> |
|                     | `--error-color-dark`       | `#ba000d` <span style="display:inline-block;width:10px;height:10px;background-color:#ba000d;border-radius:50%;margin-left:5px;"></span> | `#ba000d` <span style="display:inline-block;width:10px;height:10px;background-color:#ba000d;border-radius:50%;margin-left:5px;"></span> |
| Warning Colors      | `--warning-color`          | `#ffa726` <span style="display:inline-block;width:10px;height:10px;background-color:#ffa726;border-radius:50%;margin-left:5px;"></span> | `#ffa726` <span style="display:inline-block;width:10px;height:10px;background-color:#ffa726;border-radius:50%;margin-left:5px;"></span> |
| Info Colors         | `--info-color`             | `#29b6f6` <span style="display:inline-block;width:10px;height:10px;background-color:#29b6f6;border-radius:50%;margin-left:5px;"></span> | `#29b6f6` <span style="display:inline-block;width:10px;height:10px;background-color:#29b6f6;border-radius:50%;margin-left:5px;"></span> |
| Success Colors      | `--success-color`          | `#66bb6a` <span style="display:inline-block;width:10px;height:10px;background-color:#66bb6a;border-radius:50%;margin-left:5px;"></span> | `#66bb6a` <span style="display:inline-block;width:10px;height:10px;background-color:#66bb6a;border-radius:50%;margin-left:5px;"></span> |
| Background Colors   | `--background-color`       | `#ffffff` <span style="display:inline-block;width:10px;height:10px;background-color:#ffffff;border-radius:50%;margin-left:5px;"></span> | `#1d1d1d` <span style="display:inline-block;width:10px;height:10px;background-color:#1d1d1d;border-radius:50%;margin-left:5px;"></span> |
|                     | `--background-default`     | `#f0f0f0` <span style="display:inline-block;width:10px;height:10px;background-color:#f0f0f0;border-radius:50%;margin-left:5px;"></span> | `#121212` <span style="display:inline-block;width:10px;height:10px;background-color:#121212;border-radius:50%;margin-left:5px;"></span> |
| Text Colors         | `--text-primary-color`     | `#212121` <span style="display:inline-block;width:10px;height:10px;background-color:#212121;border-radius:50%;margin-left:5px;"></span> | `#ffffff` <span style="display:inline-block;width:10px;height:10px;background-color:#ffffff;border-radius:50%;margin-left:5px;"></span> |
|                     | `--text-secondary-color`   | `#757575` <span style="display:inline-block;width:10px;height:10px;background-color:#757575;border-radius:50%;margin-left:5px;"></span> | `#757575` <span style="display:inline-block;width:10px;height:10px;background-color:#757575;border-radius:50%;margin-left:5px;"></span> |
| Common Colors       | `--white-color`            | `#ffffff` <span style="display:inline-block;width:10px;height:10px;background-color:#ffffff;border-radius:50%;margin-left:5px;"></span> | `#ffffff` <span style="display:inline-block;width:10px;height:10px;background-color:#ffffff;border-radius:50%;margin-left:5px;"></span> |
|                     | `--black-color`            | `#000000` <span style="display:inline-block;width:10px;height:10px;background-color:#000000;border-radius:50%;margin-left:5px;"></span> | `#000000` <span style="display:inline-block;width:10px;height:10px;background-color:#000000;border-radius:50%;margin-left:5px;"></span> |

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

### **7. Project Structure**

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
