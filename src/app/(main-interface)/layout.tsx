import React from 'react';
import type { ReactNode } from 'react';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SearchIcon from '@/components/ui/SearchIcon';

type Props = {
	children: ReactNode;
};

function Layout({ children }: Props) {
	return (
		<div className="flex h-screen w-full flex-col bg-[#FDFBF4] text-[#2D2327]">
			<div className="fixed right-4 top-4 z-10">
				<SearchIcon />
			</div>
			<Navbar />

			<main className="mb-[52px] flex flex-1 overflow-hidden ">{children}</main>

			<Footer />
		</div>
	);
}

export default Layout;
