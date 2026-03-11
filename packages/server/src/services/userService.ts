import type { User } from '@shared/index';
import * as userRepo from '../repositories/userRepository';

/**
 * Business logic for user-related operations.  Currently just passes
 * through to the repository, but this is the appropriate place to add
 * caching, transformation, validation, etc.
 */
export async function fetchUsers(): Promise<User[]> {
  return userRepo.getAllUsers();
}
