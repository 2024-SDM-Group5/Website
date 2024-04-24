'use client';

import { useEffect } from 'react';

import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import GoogleSignInButton from '@/components/GoogleSignInButton';
import { useUser } from '@/hook/useUser';

export default function Login() {
	const { data: session, status: authStatus } = useSession();
	const userId = useUser(session?.idToken);
	const router = useRouter();
	console.log(process.env);

	useEffect(() => {
		if (authStatus === 'authenticated' && userId) {
			let prefix = '/website';
			if (process.env.NEXT_PUBLIC_NODE_ENV == 'development') {
				prefix = '';
			}
			router.push(prefix + `/profile/${userId}/overview`);
		}
	}, [authStatus, userId, router]);

	if (authStatus === 'loading') {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div>
				<h1 className="mb-8 text-center text-7xl">食光行</h1>
				<GoogleSignInButton />
			</div>
		</div>
	);
}
