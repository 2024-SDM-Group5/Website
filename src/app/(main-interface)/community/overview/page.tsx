'use client';

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import PostList from '@/components/PostList';

interface Diary {
	id: number;
	imageUrl: string;
	restaurantName: string;
}

export default function Page() {
	const [posts, setPosts] = useState<Array<{ diaryId: number }>>([]);

	useEffect(() => {
		const fetchDiaries = async () => {
			try {
				const response = await axios.get<Diary[]>(
					'https://pc214.ee.ntu.edu.tw/backend/api/v1/diaries',
				);
				const diaryPosts = response.data.map((diary: Diary) => ({
					diaryId: diary.id,
				}));
				setPosts(diaryPosts);
			} catch (error) {
				console.error('Failed to fetch diaries:', error);
			}
		};

		fetchDiaries();
	}, []);

	return <PostList posts={posts} />;
}
