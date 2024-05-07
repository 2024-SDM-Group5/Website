'use client';

import { useCallback, useEffect } from 'react';

import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useUser } from '@/hook/useUser';
import i18next from '@/lib/i18n';

const GoogleSignInButton = dynamic(() => import('@/components/GoogleSignInButton'), {
	ssr: false,
});

export default function Login() {
	const { data: session, status: authStatus } = useSession();
	const userId = useUser(session?.idToken);
	const router = useRouter();

	const redirectToMap = useCallback(() => {
		let prefix = '/website';
		if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
			prefix = '';
		}
		router.push(`${prefix}/map/0/general`);
	}, [router]);

	useEffect(() => {
		if (authStatus === 'authenticated' && userId) {
			redirectToMap();
		}
	}, [authStatus, userId, redirectToMap]);

	if (authStatus === 'loading') {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<div className="mb-10 mt-[-20px]">
				<Image
					src="/images/logo.png"
					alt="title"
					width={250}
					height={250}
					priority={true}
				/>
			</div>
			<div className="mb-10 mt-[-20px]">
				<Image
					src="/images/title.png"
					alt="title"
					width={250}
					height={250}
					priority={true}
				/>
			</div>
			<GoogleSignInButton />
		</div>
	);
}
