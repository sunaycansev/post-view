# SPA Development Project Task List

## Overview

This task list tracks the implementation of our Single Page Application according to the Product Requirements Document.

## Completed Tasks

- [x] Set up basic route definitions file
- [x] Create AuthorityGuard component for permission checks
- [x] Implement useAuthority hook for permission verification
- [x] Create basic auth hook with mock user data
- [x] Fix naming in permission-related components (changed roleMatched to isAuthorized)
- [x] Enhance routing architecture
  - [x] Separate public and private routes with isPrivate flag
  - [x] Create AuthWrapper component to handle auth state
  - [x] Implement redirect to login for unauthenticated users trying to access private routes
- [x] Create basic Login page
- [x] Create navigation system
  - [x] Implement navigator object with get/go methods
  - [x] Add permission checks to navigation
  - [x] Support dynamic parameters in routes
- [x] Fix permission checking bug in useAuthority hook

## In Progress Tasks

- [ ] Implement authentication layer
  - [x] Create login page with simple UI
  - [ ] Store authentication state in React Query
  - [ ] Add logout functionality

## Next Tasks

- [ ] Implement required pages
  - [ ] Dashboard with recent posts and comments
  - [ ] Posts list page with CRUD operations
  - [ ] Single post page with tabs
  - [ ] Create post page
  - [ ] Improve access denied page
- [ ] Add header component with navigation links
- [ ] Implement i18n support
  - [ ] Setup translation loading
  - [ ] Prefetch translations according to route config

## Implementation Plan

### Authentication & Routing Enhancement (✅ Completed)

1. Create an `AuthWrapper` component that:

   - Checks if a route requires authentication ✅
   - Redirects to login if unauthenticated ✅
   - Applies permission checks using AuthorityGuard for authenticated users ✅

2. Update route definitions to include:

   - `isPrivate` flag to indicate if authentication is required ✅
   - Keep existing permissions for fine-grained control ✅

3. Implement React Query for auth state:
   - Create auth provider using React Query
   - Store user data and authentication status
   - Provide login/logout functions

### Navigation System (✅ Completed)

1. Create a navigator service:
   - Generate from route configuration ✅
   - Implement `get` method to return URL with param support ✅
   - Implement `go` method to navigate with permission checks ✅

### Page Implementation

1. Dashboard:

   - Fetch and display recent posts and comments
   - Use React Query for data fetching

2. Posts and Comments:
   - Implement CRUD operations respecting permissions
   - Create reusable components for posts and comments

### Relevant Files

- src/components/AuthorityGuard.tsx - Permission checks ✅
- src/utils/hooks/useAuthority.ts - Permission verification logic ✅
- src/utils/hooks/useAuth.ts - Authentication hook (needs enhancement)
- src/routes/routes.ts - Route definitions with isPrivate flag ✅
- src/App.tsx - Main routing with AuthWrapper ✅
- src/components/AuthWrapper.tsx - Authentication wrapper ✅
- src/pages/Login.tsx - Simple login page ✅
- src/services/navigator.ts - Navigation service with get/go methods ✅
- src/pages/\* - Various pages to be implemented
