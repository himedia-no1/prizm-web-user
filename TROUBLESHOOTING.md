# Prizm Web User - Troubleshooting Guide

This document summarizes the common issues and solutions encountered during the development and refactoring of the Prizm Web User project.

## Project Setup & Architecture

The project is built with the following technologies:

- **Framework:** Next.js (with App Router)
- **State Management:** Zustand
- **API Client:** Axios (with a configurable base URL)
- **Styling:** CSS Modules and a global `globals.css` file

## Common Issues & Solutions

### 1. Modals Not Appearing

- **Problem:** Modals were not being rendered anywhere in the application.
- **Solution:** A global modal system was implemented using Zustand (`src/store/useStore.js`). A central `AppModals` component in `src/app/AppWrapper.jsx` renders the modals based on the state from the store.

### 2. 404 Errors on Navigation

- **Problem:** Navigating to certain pages resulted in 404 errors.
- **Solution:** The missing pages (e.g., for settings) were created in the `src/app` directory. The navigation logic was updated to use the correct Next.js routing with `next/navigation`.

### 3. Styling Issues

- **Problem:** The styling of the application, especially the login page, was inconsistent and did not match the desired design.
- **Solution:** The global styles from the `samples.jsx` file were consolidated into `src/app/globals.css`. Component-specific styles were handled using CSS Modules to avoid conflicts.

### 4. Build Errors

- **Problem:** A `useSyncExternalStore` error occurred during the build process.
- **Solution:** This was caused by using a client-side hook from Zustand in a Server Component. The issue was resolved by adding the `'use client';` directive to the affected components (e.g., `AuthHeader.jsx`).

### 5. Component-Specific Bugs

- **Channel Members Modal:** The button was incorrectly opening a single user's profile. This was fixed by changing the `onClick` handler to open the `members` modal.
- **Threads Modal:** The layout was changed to a card gallery using CSS grid, as requested.
- **Emoji Picker:** The emoji picker was implemented as a modal and connected to both the message context menu and the message input. The state was lifted up to the `ChannelPage` to allow the modal to update the input field.

## Future Development Guide

### Backend Integration

- **API Endpoint Configuration:** The backend API endpoint can be configured by setting the `NEXT_PUBLIC_API_URL` environment variable in a `.env.local` file at the root of the project.
- **API Functions:** New API functions can be added to the `src/api` directory. The `authAPI.js` file can be used as a reference.
- **State Management:** The Zustand stores in `src/store` can be used to manage the data fetched from the backend. New state and actions can be added to the stores as needed.
- **Data Fetching in Components:** API functions can be called from the components, and the data from the stores can be used to render the UI.
