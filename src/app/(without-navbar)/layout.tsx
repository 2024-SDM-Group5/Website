import React from 'react';
import type { ReactNode } from 'react';

import Footer from '@/components/Footer';

type Props = {
	children: ReactNode;
};

function Layout({ children }: Props) {
	return (
		<div className="flex max-h-screen w-full flex-col">
			<div className="mx-auto max-w-6xl px-4 py-5 text-center">
				<h1 className="text-xl font-bold text-gray-700">APP Name</h1>
			</div>

			<main className="flex flex-1 overflow-auto">{children}</main>

			<Footer />
		</div>
	);
}

export default Layout;
