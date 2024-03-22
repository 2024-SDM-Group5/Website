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
	avatarUrl: '',
	following: 15,
	followed: 20,
	mapId: 67890,
	postCount: 15,
};

const mockDiary: Diary[] = [
	{
		id: 1,
		imageUrl: '',
	},
	{
		id: 2,
		imageUrl: '',
	},
	{
		id: 3,
		imageUrl: '',
	},
	{
		id: 4,
		imageUrl: '',
	},
	{
		id: 5,
		imageUrl: '',
	},
	{
		id: 6,
		imageUrl: '',
	},
	{
		id: 7,
		imageUrl: '',
	},
	{
		id: 8,
		imageUrl: '',
	},
	{
		id: 9,
		imageUrl: '',
	},
	{
		id: 10,
		imageUrl: '',
	},
	{
		id: 11,
		imageUrl: '',
	},
	{
		id: 12,
		imageUrl: '',
	},
	{
		id: 13,
		imageUrl: '',
	},
	{
		id: 14,
		imageUrl: '',
	},
	{
		id: 15,
		imageUrl: '',
	},
	{
		id: 16,
		imageUrl: '',
	},
	{
		id: 17,
		imageUrl: '',
	},
	{
		id: 18,
		imageUrl: '',
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
			<Separator className="m-1" />
			<div className="flex w-full flex-1 overflow-auto">
				<div className="grid min-h-min w-full grid-cols-3 gap-1 bg-white">
					{userDiaries.map((diary) => (
						<div key={diary.id} className="relative ">
							<Image
								// src={diary.imageUrl}
								src=""
								alt={`Diary ${diary.id}`}
								width={500}
								height={500}
								// fill={true}
								layout="responsive"
								className="rounded-md bg-[#D9D9D9] "
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default UserArchive;
