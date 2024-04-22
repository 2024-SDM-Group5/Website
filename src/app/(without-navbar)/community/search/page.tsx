'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ChevronLeftIcon } from '@radix-ui/react-icons';
import axios from 'axios';

import SinglePost from '@/components/SinglePost';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const tabs = [
	{ value: 'diary', name: '日記' },
	{ value: 'account', name: '帳號' },
];
interface Diary {
	id: number;
	imageUrl: string;
	restaurantName: string;
}
interface User {
	id: number;
	displayName: string;
	avatarUrl: string;
}

export default function Page() {
	const [userDiaries, setUserDiaries] = useState<Diary[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const router = useRouter();
	const [users, setUsers] = useState<User[]>([]);
	const [selectedDiaryId, setSelectedDiaryId] = useState<number | null>(null);
	const handleBackClick = () => {
		router.push('/website/community/overview');
	};
	const handleBack = () => {
		setSelectedDiaryId(null);
	};

	const handleUserClick = (userId: number) => {
		router.push(`/profile/${userId}/overview`);
	};
	useEffect(() => {
		const fetchUserDiaries = async () => {
			try {
				const response = await axios.get(
					`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/diaries`,
					{
						params: { q: searchQuery },
					},
				);
				setUserDiaries(response.data);
			} catch (error) {
				if (axios.isAxiosError(error) && error.response) {
					console.error(`Error fetching diaries: ${error.response.status}`);
				} else {
					console.error('Failed to fetch user diaries:', error);
				}
			}
		};

		if (searchQuery) {
			fetchUserDiaries();
		}
	}, [searchQuery]);

	useEffect(() => {
		const fetchUsers = async () => {
			if (searchQuery) {
				try {
					const response = await axios.get(
						`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/users`,
						{
							params: { q: searchQuery },
						},
					);
					setUsers(response.data);
				} catch (error) {
					if (axios.isAxiosError(error) && error.response) {
						console.error(`Error fetching users: ${error.response.status}`);
					} else {
						console.error('Failed to fetch users:', error);
					}
				}
			}
		};

		fetchUsers();
	}, [searchQuery]);

	if (selectedDiaryId) {
		return (
			<div className="w-full">
				<button onClick={handleBack} className="m-4">
					Back
				</button>
				<SinglePost diaryId={selectedDiaryId} />
			</div>
		);
	}
	return (
		<div className="flex w-full flex-1 flex-col">
			<div className="flex items-center space-x-2">
				<ChevronLeftIcon className="h-5 w-5 cursor-pointer" onClick={handleBackClick} />
				<Input
					placeholder="Search..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>

			<Tabs defaultValue="diary" className="w-full ">
				<TabsList className="w-full rounded-none bg-transparent p-0">
					{tabs.map((tab) => (
						<TabsTrigger
							key={tab.value}
							value={tab.value}
							className="border-b-gray relative flex-1 rounded-none border-b-4 text-neutral-500 data-[state=active]:border-b-[#FF990A] data-[state=active]:text-[#FF990A]"
						>
							{tab.name}
						</TabsTrigger>
					))}
				</TabsList>

				<TabsContent value="diary">
					<div className="flex w-full flex-1 flex-col ">
						<div className="flex w-full flex-1 overflow-auto">
							<div className="grid min-h-min w-full grid-cols-3 gap-1 bg-white ">
								{userDiaries.map((diary) => (
									<div
										key={diary.id}
										className="relative"
										onClick={() => setSelectedDiaryId(diary.id)}
									>
										<Image
											src={diary.imageUrl}
											alt={`Diary ${diary.id}`}
											width={500}
											height={500}
											layout="responsive"
											className="rounded-md bg-[#D9D9D9]"
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="account">
					<div className="m-8 flex h-full flex-col">
						{users.map((user) => (
							<div
								key={user.id}
								className="mt-4 flex items-center"
								onClick={() => handleUserClick(user.id)}
							>
								<Image
									src={user.avatarUrl}
									alt={`User ${user.id}`}
									width={50}
									height={50}
									className="rounded-full"
								/>
								<p className="ml-2">{user.displayName}</p>
							</div>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
