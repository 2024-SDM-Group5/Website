'use client';

import React from 'react';

import PostList from '@/components/PostList';

const posts = [
	{
		diaryId: 1
	},
	{
		diaryId: 2
	},
];

export default function Page() {
	return (
		<PostList posts={posts} />
	);
}
