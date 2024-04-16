'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import axios from 'axios';

import { ProfileEditDialog } from '@/components/ProfileEditDialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface UserDetail {
	id: number;
	displayName: string;
	avatarUrl: string;
	following: number;
	followed: number;
	mapId: number;
	postCount: number;
}

const mockUserDetail: UserDetail = {
	id: 12345,
	displayName: 'Claire',
	avatarUrl: '/images/food.jpg',
	following: 15,
	followed: 20,
	mapId: 67890,
	postCount: 15,
};

const mockDiary: Diary[] = [
	{
		id: 1,
		imageUrl: '/images/food.jpg',
	},
	{
		id: 2,
		imageUrl: '/images/food.jpg',
	},
	{
		id: 3,
		imageUrl: '/images/food.jpg',
	},
	{
		id: 4,
		imageUrl: '/images/food.jpg',
	},
	{
		id: 5,
		imageUrl: '/images/food.jpg',
	},
	{
		id: 6,
		imageUrl: '/images/food.jpg',
	},
	{
		id: 7,
		imageUrl: '/images/food.jpg',
	},
	{
		id: 8,
		imageUrl: '/images/food.jpg',
	},
	{
		id: 9,
		imageUrl: '/images/food.jpg',
	},
	{
		id: 10,
		imageUrl: '/images/food.jpg',
	},
	{
		id: 11,
		imageUrl: '/images/food.jpg',
	},
	{
		id: 12,
		imageUrl: '/images/food.jpg',
	},
	{
		id: 13,
		imageUrl: '/images/food.jpg',
	},
	{
		id: 14,
		imageUrl: '/images/food.jpg',
	},
	{
		id: 15,
		imageUrl: '/images/food.jpg',
	},
	{
		id: 16,
		imageUrl: '/images/food.jpg',
	},
	{
		id: 17,
		imageUrl: '/images/food.jpg',
	},
	{
		id: 18,
		imageUrl: '/images/food.jpg',
	},
];

interface Diary {
	id: number;
	imageUrl: string;
}

const UserArchive = () => {
	const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
	const [userDiaries, setUserDiaries] = useState<Diary[]>([]);
	const params = useParams<{ id: string }>();

	const handleViewMap = () => {
		// Handle view map logic
	};

	const handleFollow = () => {
		// Handle follow logic
	};
	useEffect(() => {
		const fetchUserDetail = async () => {
			try {
				// const response = await axios.get<UserDetail>(`/api/v1/user/${params.id}`);
				// setUserDetail(response.data);
				setUserDetail(mockUserDetail);
			} catch (error) {
				console.error('Failed to fetch user details:', error);
			}
		};
		const fetchUserDiaries = async () => {
			try {
				// const response = await axios.get<UserDiariesResponse>(`/api/v1/users/${params.id}/diaries`);
				// setUserDiaries(response.data.diaries);
				setUserDiaries(mockDiary);
			} catch (error) {
				if (axios.isAxiosError(error) && error.response) {
					console.error(`Error fetching diaries: ${error.response.status}`);
				} else {
					console.error('Failed to fetch user diaries:', error);
				}
			}
		};

		fetchUserDiaries();
		fetchUserDetail();
	}, [params.id]);

	if (!userDetail) return <div>Loading...</div>;

	return (
		<div className="flex w-full flex-1 flex-col">
			<div className="flex w-full flex-1 overflow-auto">
				<div className="grid min-h-min w-full grid-cols-3 gap-1 bg-white">
					{userDiaries.map((diary) => (
						<div key={diary.id} className="relative ">
							<Image
								src={diary.imageUrl}
								alt={`Diary ${diary.id}`}
								width={500}
								height={500}
								// fill={true}
								priority={true}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default UserArchive;
