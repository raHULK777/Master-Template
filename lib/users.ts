/**
 * Santos Construction — Demo Users
 * Simple in-memory user store for demo purposes.
 * In production, this would be a database lookup.
 */

export interface SantosUser {
  id: string;
  email: string;
  role: 'admin' | 'client' | 'field_staff';
  name: string;
  salt: string;
  passwordHash: string;
}

/**
 * SHA-256 hash of password + salt (simplified for demo).
 * In production, use bcrypt or argon2.
 */
export function SANTOS_HASH(password: string, salt: string): string {
  // Simple hash for demo — concatenate password + salt and hash
  const text = password + salt;
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

export const SANTOS_USERS: SantosUser[] = [
  {
    id: 'admin-1',
    email: 'admin@santosconstruction.com',
    role: 'admin',
    name: 'Santos Admin',
    salt: 'santos-admin-salt',
    passwordHash: SANTOS_HASH('Admin@123', 'santos-admin-salt'),
  },
  {
    id: 'client-1',
    email: 'demo@santosconstruction.com',
    role: 'client',
    name: 'Demo Client',
    salt: 'santos-client-salt',
    passwordHash: SANTOS_HASH('Demo@123', 'santos-client-salt'),
  },
  {
    id: 'field-1',
    email: 'field@santosconstruction.com',
    role: 'field_staff',
    name: 'Field Staff',
    salt: 'santos-field-salt',
    passwordHash: SANTOS_HASH('Field@123', 'santos-field-salt'),
  },
];
