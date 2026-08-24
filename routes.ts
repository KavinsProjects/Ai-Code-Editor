// Array of routes that are accessible to the public.
// These routes do not require authentication.

/** @type {string[]} */
export const publicRoutes: string[] = [];


// Array of routes that are protected.
// Only authenticated users can access these routes.

/** @type {string[]} */
export const protectedRoutes: string[] = [
  "/",
];


// Array of authentication routes that are accessible to the public.
// Routes that start with the "/api/auth/" prefix do not require authentication.

/** @type {string[]} */
export const authRoutes: string[] = [
  "/auth/sign-in",
];


// API authentication route prefix.
// Routes starting with this prefix do not require authentication.

/** @type {string} */
export const apiAuthPrefix: string = "/api/auth";


// Default route to redirect users to after login. to home
export const DEFAULT_LOGIN_REDIRECT: string = "/";