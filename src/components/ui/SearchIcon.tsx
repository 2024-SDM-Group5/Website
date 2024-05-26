'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

const SearchIcon: React.FC = () => {
	const pathname = usePathname();
	const pathSegments = pathname.split('/').filter(Boolean);
	const len = pathSegments.length;
	let prefix = '/website',
		path = '/community/search';
	if (process.env.NEXT_PUBLIC_NODE_ENV == 'development') {
		prefix = '';
	}
	path = prefix + path;
	if (
		len >= 2 &&
		pathSegments[len - 2] === 'community' &&
		(pathSegments[len - 1] === 'overview' || pathSegments[len - 1] === 'following')
	) {
		return (
			<Link href={`${prefix}/community/search`}>
				<MagnifyingGlassIcon width="28" height="28" />
			</Link>
		);
	}

	return <></>;
};

export default SearchIcon;
