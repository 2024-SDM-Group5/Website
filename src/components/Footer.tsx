'use client';

import Link from 'next/link';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const tabsConfig = [
	{ value: 'general', label: '地圖探索', href: '/map/general' },
	{ value: 'map', label: '美食社群', href: '/community/overview' },
	{ value: 'restaurant', label: '我的地圖', href: '/map/restaurants/overview' },
	{ value: 'archive', label: '帳戶', href: '/profile/1/overview' },
];

const Footer = () => {
	return (
		<Tabs defaultValue={tabsConfig[3]?.value} className="w-full">
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
