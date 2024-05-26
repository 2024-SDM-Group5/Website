'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

const SearchIcon: React.FC = () => {
	const pathname = usePathname();
	const pathSegments = pathname.split('/').filter(Boolean);

	if (
		pathSegments.length >= 2 && pathSegments[pathSegments.length-2] === 'community' &&
		(pathSegments[pathSegments.length-1] === 'overview' || pathSegments[pathSegments.length-1] === 'following')
	) {
		return (
			<Link href="/community/search">
				<MagnifyingGlassIcon width="28" height="28" />
			</Link>
		);
	}

	return <></>;
};

export default SearchIcon;
