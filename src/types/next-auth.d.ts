import NextAuth, { DefaultUser } from 'next-auth';

export interface User extends DefaultUser {
  /** The UUID of the user */
  id?: string;
  /** The baseline pitch of the user's voice */
  baseline?: number;
}
