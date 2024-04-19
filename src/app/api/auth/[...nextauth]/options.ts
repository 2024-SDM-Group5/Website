import type { Account, Session, User, Profile } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

export const options = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,

	callbacks: {
		async session({
			session,
			token,
		}: {
			session: Session;
			token: JWT;
			user: User;
		}): Promise<Session> {
			session.username = token.username;
			session.idToken = token.idToken;
			return session;
		},
		async jwt({
			token,
			account,
			profile,
		}: {
			token: JWT;
			account: Account | null;
			profile?: Profile | undefined;
		}): Promise<JWT> {
			if (profile) {
				token.username = profile.login;
			}
			if (account) {
				token.idToken = account.id_token;
			}
			return token;
		},
	},
	session: {
		maxAge: 60 * 60,
	},
	jwt: {
		maxAge: 60 * 60,
	},
};
