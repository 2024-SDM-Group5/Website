'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const tabsConfig = [
	{ value: 'map', label: '地圖探索', href: '/map/general' },
	{ value: 'community', label: '美食社群', href: '/community/overview' },
	{ value: 'mymap', label: '我的地圖', href: '/mymap/map' },
	{ value: 'profile', label: '帳戶', href: '/profile/1/overview' },
];

const Footer = () => {
	const pathname = usePathname();
	const pathSegments = pathname.split('/').filter(Boolean);
	const activeTab = pathSegments[0];

	return (
		<Tabs value={activeTab} className="h-15 z-100 fixed bottom-0 w-full bg-white">
			<TabsList className="border-b-none z-100 h-full w-full rounded-none p-0">
				{tabsConfig.map((tab) => (
					<TabsTrigger
						key={tab.value}
						value={tab.value}
						className="data-[state=active]:border-b-none data-[state=active]:border-t-solid border-b-none text-muted-foreground z-100 relative flex-1 rounded-none border-t-4 border-b-transparent bg-transparent pb-3 pt-2 font-semibold shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-t-[#FF990A] [&_a]:text-neutral-500 [&_a]:data-[state=active]:text-[#FF990A]"
					>
						<Link href={tab.href} className="text-lg">
							{tab.label}
						</Link>
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	);
};

export default Footer;
