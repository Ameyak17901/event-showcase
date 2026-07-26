import type { Event } from "@/types/event";

export interface UserPermissions {
  id?: string;
  publicMetadata?: {
    role?: string;
  };
}

/**
 * Determines whether a given user has management permissions (edit, delete) for an event.
 *
 * Rules:
 * 1. Admin users (role === 'admin') can edit/delete ANY event.
 * 2. Event creators can edit/delete their OWN events (event.user_id === user.id).
 * 3. If an event has no user_id associated (legacy events), fallback to admin check or creator ownership.
 */
export const canManageEvent = (
  user: UserPermissions | null | undefined,
  event: Event
): boolean => {
  if (!user || !user.id) return false;

  // Check for explicit admin role in Clerk publicMetadata
  const isAdmin = user.publicMetadata?.role === "admin";
  if (isAdmin) return true;

  // Check for ownership match
  if (event.user_id && event.user_id === user.id) {
    return true;
  }

  return false;
};
