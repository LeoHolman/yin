import NextAuth from 'next-auth';
import SequelizeAdapter from '@auth/sequelize-adapter';
import sequelize from './utils/sequelize';
import { User } from './models/user';
import Credentials from 'next-auth/providers/credentials';
import { saltAndHashPassword } from './utils/password';
import { redirect } from 'next/navigation';
import GoogleProvider from 'next-auth/providers/google';

const adapter = SequelizeAdapter(sequelize, {
  models: {
    User: User,
  },
});

sequelize.sync();

const usernamePasswordCredentialsProvider = Credentials({
  name: 'Credentials',
  credentials: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
  },
  authorize: async (credentials) => {
    let user = null;
    user = await User.findOne({ where: { email: credentials?.email } });

    if (!user) {
      throw new Error('User not found.');
    }
    const userSalt = user.salt;

    const passwordHash = await saltAndHashPassword(
      String(credentials?.password),
      userSalt
    );

    if (passwordHash !== user.password) {
      throw new Error('Invalid credentails');
    }

    return user;
  },
});

const Google = GoogleProvider({
  clientId: String(process.env.AUTH_GOOGLE_ID),
  clientSecret: String(process.env.AUTH_GOOGLE_SECRET),
  //     const dbuser = await User.findOne({ where: { email: profile.email } });
  //     console.log('profile checked');
  //     // return { ...profile, ...dbuser?.dataValues };
  //     return { ...dbuser?.dataValues };
  //   },
  allowDangerousEmailAccountLinking: true,
});

export const handler = NextAuth({
  //   providers: [usernamePasswordCredentialsProvider, Google],
  providers: [Google],
  adapter: adapter,
  callbacks: {
    session: async ({ session, token, user }) => {
      return Promise.resolve({
        ...session,
        user: { ...session.user, ...user },
      });
    },
  },
});
