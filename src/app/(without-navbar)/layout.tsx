import React from 'react';
import type { ReactNode } from 'react';

import Footer from '@/components/Footer';

type Props = {
	children: ReactNode;
};

function Layout({ children }: Props) {
	return (
		<div className="flex max-h-screen w-full flex-col bg-[#FDFBF4] text-[#2D2327]">
			<main className="flex flex-1 overflow-auto">{children}</main>

			<Footer />
		</div>
	);
}

export default Layout;
