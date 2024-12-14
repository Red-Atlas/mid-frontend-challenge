# Project Setup and Overview

This README provides a detailed guide for setting up and understanding the structure of this React project, which is built with [Bun](https://bun.sh/) as the package manager and runtime.

The project did not face major technical difficulties. Zustand was used to emulate global storage with data persistence, React Query for data caching, Axios for API calls, React Hook Form for complex forms, and Zod for their validations. Tailwind CSS was used for styling, and React Leaflet for maps. Development followed DRY and SOLID principles, and some reusable components were created using the compound component design pattern with extensible styles and control props.

This app utilizes lazy loading and custom hooks to optimize performance and enhance reusability.

Lazy loading is used to defer the loading of non-critical resources at the initial page load time,
which helps in improving the performance and speed of the application.

Custom hooks are implemented to encapsulate and reuse stateful logic across different components,
promoting cleaner and more maintainable code.

This code uses Zustand for global state management with data persistence.
It emulates user login to protect routes such as creation and editing.
The authenticated state is persisted.

- In the project setup, the following improvements can be made:
- - Optimize the GET endpoint of a property to accept a search query, allowing filtering from the backend.
- - This approach assumes best practices and takes advantage of the existing backend pagination, which is excellent.
- - With more time, the architecture and design could be further refined.

  ```bash
  URL WEB
  https://bruno-lisboa-mid-frontend-challenge-g7hi3qpxe.vercel.app/
  ```

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Technology Stack](#technology-stack)
- [Key Features](#key-features)
- [Error Handling](#error-handling)

## Prerequisites

Ensure the following are installed on your system:

- **Node.js** (for compatibility with React)
- **Bun** (install via [Bun](https://bun.sh/))
- **Git** (to clone the repository)

## Installation

1. Clone the repository:

   ```bash
   git clone <https://github.com/br1lisboa/mid-frontend-challenge>
   cd <repository-directory>
   ```

2. Install dependencies using Bun:
   ```bash
   bun install
   ```

## Running the Project

To start the development server:

```bash
bun dev
```

The application will be accessible at `http://localhost:3000/`.

For production builds:

```bash
bun build
```

To preview the production build:

```bash
bun preview
```

## Technology Stack

This project uses the following libraries and tools:

### Core Libraries

- **React**: Component-based UI library.
- **Bun**: High-performance JavaScript runtime and package manager.

### Data Fetching

- **Axios**: Simplified HTTP client for API requests.
- **React Query**: State management for server-side data.

### Form Handling and Validation

- **React Hook Form**: Lightweight form library.
- **Zod**: Schema-based validation for forms and API responses.

### Styling

- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.

### Mapping

- **React Leaflet**: Interactive maps integration using Leaflet.

## Key Features

### Error Handling

- **Custom Error Handling**: Centralized error management for form validation, API responses, and application runtime.
- **404 Handling**: Graceful fallback for non-existent routes.
- **API Error Management**: Meaningful messages and retries for failed API calls.

### Custom URL Management

- Fallback mechanisms for invalid or outdated URLs.
- Redirects and messaging for improved user experience.

### Maps Integration

- Interactive maps using React Leaflet with support for custom markers and dynamic data.

### Responsive Design

- Fully responsive layouts powered by Tailwind CSS.

## Error Handling

### API Errors

Errors from the API are intercepted and categorized into:

- **Client Errors (4xx)**: Display appropriate user feedback.
- **Server Errors (5xx)**: Retry logic or friendly error messaging.

### Form Validation Errors

Using Zod with React Hook Form ensures:

- Real-time validation feedback.
- Detailed error messages for invalid inputs.

### Routing Errors

- A custom 404 page is rendered for unknown URLs.
- Redirection logic guides users back to valid pages.
