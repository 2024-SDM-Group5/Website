'use client';

import { useTranslation } from 'react-i18next';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/hook/useUser';
import i18next from '@/lib/i18n';

let prefix = '/website';
if (process.env.NEXT_PUBLIC_NODE_ENV == 'development') prefix = '';

function Footer() {
	const pathname = usePathname();
	const pathSegments = pathname.split('/').filter(Boolean);
	const session = useSession();
	const userId = useUser(session.data?.idToken);
	const { t, i18n } = useTranslation('translation', { i18n: i18next });
	const tabsConfig = [
		{ value: 'map', label: t('地圖探索'), href: prefix + '/map/0/general' },
		{ value: 'community', label: t('美食社群'), href: prefix + '/community/overview' },
		{ value: 'mymap', label: t('我的地圖'), href: prefix + '/mymap/map' },
		{ value: 'profile', label: t('帳戶'), href: prefix + `/profile/${userId}/overview` },
	];
	let activeTab = pathSegments[1];
	if (process.env.NEXT_PUBLIC_NODE_ENV == 'development') {
		activeTab = pathSegments[0];
	}
	return (
		<Tabs
			value={activeTab}
			className="h-15 z-100 fixed bottom-0 w-full bg-[#FDFBF4] text-[#2D2327]"
		>
			<TabsList className="border-b-none z-100 h-full w-full rounded-none p-0">
				{tabsConfig.map((tab) => (
					<TabsTrigger
						key={tab.value}
						value={tab.value}
						className="data-[state=active]:border-b-none data-[state=active]:border-t-solid border-b-none text-muted-foreground z-100 relative flex-1 rounded-none border-t-4 border-b-transparent bg-transparent pb-3 pt-2 font-semibold shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-t-[#2D2327] [&_a]:text-neutral-500 [&_a]:data-[state=active]:text-[#2D2327]"
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

export default Footer;
