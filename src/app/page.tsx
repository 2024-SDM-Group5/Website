'use client';

import GoogleSignInButton from '@/components/GoogleSignInButton';

export default function Login() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div>
				<h1 className="mb-8 text-center text-7xl">APP Name</h1>
				<GoogleSignInButton />
			</div>
		</div>
	);
}
