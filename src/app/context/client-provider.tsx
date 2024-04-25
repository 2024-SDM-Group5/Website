'use client';

import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

export default function Provider({
	children,
	session,
}: {
	children: React.ReactNode;
	session: Session | null;
}): React.ReactNode {

	const basePath = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? '/api/auth' : '/website/api/auth';
	return <SessionProvider session={session} basePath={basePath}>{children}</SessionProvider>;
}
