'use client';

import React, { useState, useEffect } from 'react';

import { useSession } from 'next-auth/react';

import axios from 'axios';

import PostList from '@/components/PostList';

interface Diary {
	id: number;
	imageUrl: string;
	restaurantName: string;
}

export default function Page() {
	const { data: session } = useSession();
	const [posts, setPosts] = useState<Array<{ diaryId: number }>>([]);
	useEffect(() => {
		const fetchDiaries = async () => {
			if (session?.idToken) {
				try {
					const response = await axios.get<Diary[]>(
						'https://mainserver-service:8080/api/v1/diaries',
						{
							params: { following: true },
							headers: { Authorization: `Bearer ${session.idToken}` },
						},
					);
					const diaryPosts = response.data.map((diary: Diary) => ({
						diaryId: diary.id,
					}));
					setPosts(diaryPosts);
				} catch (error) {
					console.error('Failed to fetch diaries:', error);
				}
			}
		};

		fetchDiaries();
	}, [session]);

	return <PostList posts={posts} />;
}
