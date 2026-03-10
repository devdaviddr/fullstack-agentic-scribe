/**
 * Shared TypeScript types and interfaces for the fullstack application.
 */

/** Represents a user in the system */
export interface User {
  id: string;
  email: string;
  name: string | null;
}

/** API response wrapper for a list of users */
export interface UsersResponse {
  users: User[];
}

/** API health check response */
export interface HealthResponse {
  status: string;
  database: string;
  timestamp: string;
}

/** Generic API error response */
export interface ApiError {
  error: string;
  message: string;
}
