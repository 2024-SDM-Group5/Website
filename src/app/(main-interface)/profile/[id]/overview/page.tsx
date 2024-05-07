'use client';

import { useState, useEffect } from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import axios from 'axios';

import { ProfileEditDialog } from '@/components/ProfileEditDialog';
import SinglePost from '@/components/SinglePost';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/hook/useUser';
import i18next from '@/lib/i18n';
import {useTranslation} from "react-i18next"

interface UserDetail {
	id: number;
	displayName: string;
	avatarUrl: string;
	following: number;
	followed: number;
	mapId: number;
	postCount: number;
	isFollowing: boolean;
}

interface Diary {
	id: number;
	imageUrl: string;
}

function UserProfile() {
	const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
	const [userDiaries, setUserDiaries] = useState<Diary[]>([]);
	const [selectedDiaryId, setSelectedDiaryId] = useState<number | null>(null);
	const {t, i18n} = useTranslation("translation", { i18n: i18next });
	const params = useParams<{ id: string }>();
	const session = useSession();
	const userId = useUser(session.data?.idToken);
	let prefix = '/website';
	if (process.env.NEXT_PUBLIC_NODE_ENV == 'development') {
		prefix = '';
	}
	const handleFollowUnfollow = async () => {
		const method = userDetail?.isFollowing ? 'delete' : 'post';
		const url = `https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/users/${params.id}/follow`;

		try {
			await axios({
				method,
				url,
				headers: {
					Authorization: `Bearer ${session.data?.idToken}`,
				},
			});
			setUserDetail((prev) => ({
				...prev!,
				isFollowing: !prev?.isFollowing,
			}));
		} catch (error) {
			console.error('Failed to update follow status:', error);
		}
	};

	const handleBack = () => {
		setSelectedDiaryId(null);
	};

	useEffect(() => {
		const fetchUserDetail = async () => {
			const url =
				params.id === userId?.toString()
					? 'https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/users/me'
					: `https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/users/${params.id}`;
			try {
				const response = await axios.get(url, {
					headers:
						params.id === userId?.toString()
							? {
									Authorization: `Bearer ${session.data?.idToken}`,
								}
							: {},
				});
				setUserDetail(response.data);
			} catch (error) {
				console.error('Failed to fetch user details:', error);
			}
		};

		const fetchUserDiaries = async () => {
			try {
				const response = await axios.get(
					`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/users/${params.id}/diaries`,
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

		if (params.id) {
			fetchUserDetail();
			fetchUserDiaries();
		}
	}, [params.id, userId, session.data?.idToken]);
	if (!userDetail) return <div>Loading...</div>;
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
			<div className="p-4 pt-8">
				<div className="flex items-center justify-center ">
					<div className="mr-10 flex  flex-col items-center justify-center  ">
						<Image
							src={userDetail.avatarUrl || ''}
							alt="User Avatar"
							width={80}
							height={80}
							priority={true}
							className="aspect-square rounded-full object-cover"
						/>
						<div className="text-xl">{userDetail.displayName}</div>
					</div>

					<div className="ml-4 flex space-x-4">
						<div>
							{userDetail.postCount} {t('貼文')}
						</div>
						<div>
							{userDetail.following} {t('追蹤中')}
						</div>
						<div>
							{userDetail.followed} {t('追蹤者')}
						</div>
					</div>
				</div>

				<div className="mt-2 flex w-full justify-around">
					{params.id === userId?.toString() && (
						<ProfileEditDialog idToken={session.data?.idToken} userId={userId} />
					)}
					<Link href={`${prefix}/map/${userDetail.mapId}/general`} className="w-[32%]">
						<Button className="text-md w-full bg-[#ffcc84] px-3 py-1 text-sm text-black">
							{t('查看地圖')}
						</Button>
					</Link>
					{params.id !== userId?.toString() && (
						<Button
							className="text-md w-[32%] bg-[#ffcc84] px-3 py-1 text-sm text-black"
							onClick={handleFollowUnfollow}
						>
							{userDetail.isFollowing ? t('解除追蹤') : t('追蹤')}
						</Button>
					)}
					{params.id !== userId?.toString()  && (i18n.language == 'zh-tw' ? (
						<Button
							className="text-md w-[32%] bg-[#ffcc84] px-3 py-1 text-sm text-black"
							onClick={() => i18n.changeLanguage('en')}
						>
							En
						</Button>
					) : (
						<Button
							className="text-md w-[32%] bg-[#ffcc84] px-3 py-1 text-sm text-black"
							onClick={() => i18n.changeLanguage('zh-tw')}
						>
							Zh
						</Button>
					))}
					</div>
			</div>
			<Separator className="mt-4" />
			<div className="flex w-full flex-1 overflow-auto">
				<div className="grid min-h-min w-full grid-cols-3 gap-1 bg-white">
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
								priority={true}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default UserProfile;
