'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

const SearchIcon: React.FC = () => {
	const pathname = usePathname();
	const pathSegments = pathname.split('/').filter(Boolean);
	const router = useRouter();
	const handleSearchClick = () => {
		router.push('/community/search');
	};

	if (
		pathSegments[0] === 'community' &&
		(pathSegments[1] === 'overview' || pathSegments[1] === 'following')
	) {
		return (
			<div onClick={handleSearchClick} className="cursor-pointer">
				<MagnifyingGlassIcon width="24" height="24" />
			</div>
		);
	}

	return <></>;
};

export default SearchIcon;
