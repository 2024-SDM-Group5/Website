'use client';

import Link from 'next/link';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const tabsConfig = [
	{ value: 'map', label: '地圖探索', href: '/website/map/general' },
	{ value: 'community', label: '美食社群', href: '/website/community/overview' },
	{ value: 'mymap', label: '我的地圖', href: '/website/mymap/map' },
	{ value: 'profile', label: '帳戶', href: '/website/profile/1/overview' },
];

const Footer = () => {
	return (
		<Tabs defaultValue={tabsConfig[3]?.value} className="fixed bottom-0 w-full bg-white">
			<TabsList className="border-b-none w-full rounded-none bg-transparent p-0">
				{tabsConfig.map((tab) => (
					<TabsTrigger
						key={tab.value}
						value={tab.value}
						className="data-[state=active]:border-b-none data-[state=active]:border-t-solid data-[state=active]:border-t-black border-b-none text-muted-foreground relative flex-1 rounded-none border-b-2 border-t-2 border-b-transparent bg-transparent pb-3 pt-2 font-semibold shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-t-black"
					>
						<Link href={tab.href}>{tab.label}</Link>
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	);
};

export default Footer;
