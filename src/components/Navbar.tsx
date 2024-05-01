'use client';

import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/hook/useUser';
import { useTranslation } from 'react-i18next';

function Navbar() {
	const pathname = usePathname();
	const pathSegments = pathname.split('/').filter(Boolean);
	let rootPath = pathSegments[1];
	const [activeTab, setActiveTab] = useState('');
	const session = useSession();
	const { t } = useTranslation();
	const userId = useUser(session.data?.idToken);
	
	let tabsConfig: { value: string; label: string; href: string }[] = [];
	let prefix = '/website';
	if (process.env.NEXT_PUBLIC_NODE_ENV == 'development') {
		prefix = '';
		rootPath = pathSegments[0];
	}
	if (rootPath === 'map') {
		tabsConfig = [
			{ value: 'general', label: t('地圖'), href: prefix + '/map/0/general' },
			{ value: 'map', label: t('地圖總覽'), href: prefix + '/map/map' },
			{ value: 'restaurant', label: t('餐廳總覽'), href: prefix + '/map/0/restaurant' },
			{ value: 'archive', label: t('我的收藏'), href: prefix + '/map/archive' },
		];
	} else if (rootPath === 'community') {
		tabsConfig = [
			{ value: 'overview', label: t('總覽'), href: prefix + '/community/overview' },
			{ value: 'following', label: t('追蹤中'), href: prefix + '/community/following' },
		];
	} else if (rootPath === 'mymap') {
		tabsConfig = [
			{ value: 'map', label: t('地圖總覽'), href: prefix + '/mymap/map' },
			{ value: 'restaurants', label: t('餐廳總覽'), href: prefix + '/mymap/restaurants' },
		];
	} else if (rootPath === 'profile') {
		tabsConfig = [
			{ value: 'overview', label: t('總覽'), href: prefix + `/profile/${userId}/overview` },
			{ value: 'archive', label: t('我的收藏'), href: prefix + `/profile/${userId}/archive` },
		];
	}

	useEffect(() => {
		const segments = pathname.split('/');
		const lastSegment = segments[segments.length - 1];
		setActiveTab(lastSegment);
	}, [pathname, setActiveTab]);

	return (
		<Tabs value={activeTab} className="h-15 w-full">
			<TabsList className="h-full w-full rounded-none bg-white p-0">
				{tabsConfig.map((tab) => (
					<TabsTrigger
						key={tab.value}
						value={tab.value}
						className="border-b-gray text-muted-foreground relative flex-1 rounded-none border-b-4 bg-transparent pb-3 pt-2 font-semibold shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-[#FF990A] [&_a]:text-neutral-500 [&_a]:data-[state=active]:text-[#FF990A]"
					>
						<Link href={tab.href} className="text-lg">
							{tab.label}
						</Link>
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	);
}

export default Navbar;
