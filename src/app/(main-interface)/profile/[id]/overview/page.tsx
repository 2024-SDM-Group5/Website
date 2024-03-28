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
	avatarUrl: '/images/1.jpg',
	following: 15,
	followed: 20,
	mapId: 67890,
	postCount: 15,
};

const mockDiary: Diary[] = [
	{
		id: 1,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 2,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 3,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 4,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 5,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 6,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 7,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 8,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 9,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 10,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 11,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 12,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 13,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 14,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 15,
		imageUrl: '/images/1.jpg',
	},
];

interface Diary {
	id: number;
	imageUrl: string;
}

const UserProfile = () => {
	const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
	const [userDiaries, setUserDiaries] = useState<Diary[]>([]);
	const params = useParams<{ id: string }>();
	const handleEditProfile = () => {
		// Handle edit profile logic
	};

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
			<div className="p-4 pt-8">
				<div className="flex items-center justify-center ">
					<Image
						src={userDetail.avatarUrl}
						alt="User Avatar"
						width={80}
						height={80}
						priority={true}
						className="rounded-full"
					/>

					<div className="ml-4 flex space-x-4">
						<div>{userDetail.postCount} posts</div>
						<div>{userDetail.following} following</div>
						<div>{userDetail.followed} followers</div>
					</div>
				</div>
				<div className="ml-6 text-xl font-bold">{userDetail.displayName}</div>
				<div className="mt-2 flex w-full justify-between">
					<ProfileEditDialog idToken="" />
					<Button
						className="text-md w-[32%] bg-black px-3 py-1 text-sm text-white"
						onClick={handleViewMap}
					>
						View Map
					</Button>
					<Button
						className="text-md w-[32%] bg-black px-3 py-1 text-sm text-white"
						onClick={handleFollow}
					>
						Follow
					</Button>
				</div>
			</div>
			<Separator className="mt-4" />
			<div className="flex w-full flex-1 overflow-auto">
				<div className="grid min-h-min w-full grid-cols-3 gap-1 bg-white">
					{userDiaries.map((diary) => (
						<div key={diary.id} className="relative ">
							<Image
								src={diary.imageUrl}
								alt={`Diary ${diary.id}`}
								width={500}
								height={500}
								priority={true}
								// fill={true}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
