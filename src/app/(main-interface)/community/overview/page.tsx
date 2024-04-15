'use client';

import React from 'react';

import PostList from '@/components/PostList';

const posts = [
	{
		id: 1,
		authorAvatarUrl: '/images/1.jpg',
		authorName: 'John Doe',
		imageUrl: '/images/1.jpg',
		favCount: 121,
		replies: [
			{ id: 1, username: 'user1', content: 'Amazing post!' },
			{ id: 2, username: 'user2', content: 'Wow!' },
		],
	},
	{
		id: 2,
		authorAvatarUrl: '/images/1.jpg',
		authorName: 'Jane Smith',
		imageUrl: '/images/1.jpg',
		favCount: 75,
		replies: [{ id: 3, username: 'user3', content: 'Love this!' }],
	},
];

export default function Page() {
	return (
		<div className="mt-8 w-full">
			<PostList posts={posts} />
		</div>
	);
}
