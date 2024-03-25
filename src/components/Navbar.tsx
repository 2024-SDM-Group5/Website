'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Navbar = () => {
	const pathname = usePathname();
	const pathSegments = pathname.split('/').filter(Boolean);
	const rootPath = pathSegments[0];
	const [activeTab, setActiveTab] = useState('');
	let tabsConfig: { value: string; label: string; href: string }[] = [];

	if (rootPath === 'map') {
		tabsConfig = [
			{ value: 'general', label: '總地圖', href: '/map/general' },
			{ value: 'map', label: '地圖總覽', href: '/map/map/overview' },
			{ value: 'restaurant', label: '餐廳總覽', href: '/map/restaurants/overview' },
			{ value: 'archive', label: '我的收藏', href: '/map/archive' },
		];
	} else if (rootPath === 'community') {
		tabsConfig = [
			{ value: 'overview', label: '總覽', href: '/community/overview' },
			{ value: 'following', label: '追蹤中', href: '/community/following' },
		];
	} else if (rootPath === 'mymap') {
		tabsConfig = [
			{ value: 'map', label: '地圖總覽', href: '/mymap/map' },
			{ value: 'restaurants', label: '餐廳總覽', href: '/mymap/restaurants' },
		];
	} else if (rootPath === 'profile') {
		tabsConfig = [
			{ value: 'overview', label: '總覽', href: '/profile/1/overview' },
			{ value: 'archive', label: '我的收藏', href: '/profile/1/archive' },
		];
	}

	useEffect(() => {
		setActiveTab(pathname.split('/').slice(-1)[0]);
	}, [pathname]);

	return (
		<Tabs value={activeTab} className="w-full">
			<TabsList className="w-full rounded-none bg-transparent p-0">
				{tabsConfig.map((tab) => (
					<TabsTrigger
						key={tab.value}
						value={tab.value}
						className="text-muted-foreground data-[state=active]:border-b-black relative flex-1 rounded-none border-b-2 border-b-transparent bg-transparent pb-3 pt-2 font-semibold shadow-none transition-none focus-visible:ring-0"
					>
						<Link href={tab.href}>{tab.label}</Link>
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	);
};

export default Navbar;
