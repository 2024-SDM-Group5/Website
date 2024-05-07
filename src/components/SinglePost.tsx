'use client';

import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

import { HeartIcon, HeartFilledIcon, StarIcon, StarFilledIcon } from '@radix-ui/react-icons';
import axios from 'axios';

import { useUser } from '@/hook/useUser';

export interface SinglePostProps {
	diaryId: number;
}

export interface Comment {
	id: number;
	diaryId: number;
	content: string;
}

export interface DiaryDetail {
	id: number;
	userId: number;
	username: string;
	avatarUrl: string;
	photos: string[];
	content: string;
	replies: {
		id: number;
		username: string;
		content: string;
		authorId: number;
		createdAt: number;
		avatarUrl: string;
	}[];
	favCount: number;
	hasFavorited: boolean;
	hasCollected: boolean;
}

function SinglePost({ diaryId }: SinglePostProps) {
	const [newComment, setNewComment] = useState('');
	const session = useSession();
	const [diaryDetail, setDiaryDetail] = useState<DiaryDetail | null>(null);
	const userId = useUser(session.data?.idToken);
	let prefix = '/website';
	if (process.env.NEXT_PUBLIC_NODE_ENV == 'development') {
		prefix = '';
	}
	const toggleFavorite = async () => {
		const method = diaryDetail?.hasFavorited ? 'DELETE' : 'POST';
		try {
			await axios({
				method: method,
				url: `https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/diaries/${diaryId}/favorite`,
				headers: { Authorization: `Bearer ${session?.data?.idToken}` },
			});
			setDiaryDetail((prev) => ({
				...prev!,
				hasFavorited: !prev?.hasFavorited,
			}));
		} catch (error) {
			console.error('Failed to toggle favorite:', error);
		}
	};
	const handlePostComment = async () => {
		const commentData = {
			content: newComment,
			diaryId: diaryId,
		};

		try {
			await axios.post('https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/comments', commentData, {
				headers: { Authorization: `Bearer ${session.data?.idToken}` },
			});
		} catch (error) {
			console.error('Failed to post comment:', error);
		}
	};

	const handleDeleteComment = async (commentId: number) => {
		try {
			await axios.delete(
				`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/comments/${commentId}`,
				{
					headers: { Authorization: `Bearer ${session.data?.idToken}` },
				},
			);
		} catch (error) {
			console.error('Failed to delete comment:', error);
		}
	};
	const toggleCollect = async () => {
		const method = diaryDetail?.hasCollected ? 'DELETE' : 'POST';
		try {
			await axios({
				method,
				url: `https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/diaries/${diaryId}/collect`,
				headers: { Authorization: `Bearer ${session?.data?.idToken}` },
			});
			setDiaryDetail((prev) => ({
				...prev!,
				hasCollected: !prev?.hasCollected,
			}));
		} catch (error) {
			console.error('Failed to toggle collect:', error);
		}
	};
	useEffect(() => {
		const fetchDiaryDetail = async () => {
			if (diaryId) {
				try {
					const response = await axios.get(
						`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/diaries/${diaryId}`,
						{
							headers: { Authorization: `Bearer ${session.data?.idToken}` },
						},
					);
					setDiaryDetail(response.data);
				} catch (error) {
					console.error('Failed to fetch diary details:', error);
				}
			}
		};
		fetchDiaryDetail();
	}, [diaryId]);

	return (
		<div>
			{diaryDetail ? (
				<div className="flex w-full flex-col items-center justify-center">
					<div className="flex w-full items-center justify-start pb-4 pl-4 pt-4">
						<Link href={`${prefix}/profile/${diaryDetail.userId}/overview`}>
							<Image
								src={diaryDetail.avatarUrl}
								alt="Author"
								width={60}
								height={60}
								className="aspect-square rounded-full object-cover"
								priority={true}
							/>
							<span className="pl-1 pt-2">{diaryDetail.username}</span>
						</Link>
					</div>
					<Image
						src={diaryDetail.photos[0]}
						alt="Diary"
						width={800}
						height={800}
						className="w-full"
						priority={true}
					/>
					<div className="flex w-full flex-col items-start p-4">
						<div className="ml-4 flex items-center justify-center pb-4">
							<button onClick={toggleFavorite} className="flex text-xl ">
								{diaryDetail.hasFavorited ? (
									<HeartFilledIcon width="24" height="24" />
								) : (
									<HeartIcon width="24" height="24" />
								)}
							</button>

							<button
								onClick={toggleCollect}
								className="flex items-center pl-4 text-xl"
							>
								{diaryDetail.hasCollected ? (
									<StarFilledIcon width="24" height="24" />
								) : (
									<StarIcon width="24" height="24" />
								)}
							</button>
						</div>
						{diaryDetail.replies.map((reply) => (
							<>
								{reply.authorId === userId ? (
									<div
										key={reply.id}
										className="flex w-full justify-between pt-4 px-4"
									>
										<Link href={`${prefix}/profile/${reply.authorId}/overview`} >
											{reply.username}: {reply.content}
										</Link>
										<div>
											<button
												onClick={() => handleDeleteComment(reply.id)}
												className="rounded bg-[#f7a072] px-4 py-2 text-black"
											>
												Delete
											</button>
										</div>
									</div>
								) : (
									<div key={reply.id} className="w-full pt-4 text-left pl-2">
										<span>
											{reply.username}: {reply.content}
										</span>
									</div>
								)}
							</>
						))}
						<div className="flex w-full justify-between pt-2 px-4">
							<input
								type="text"
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
								placeholder="Write a comment..."
								className="rounded border px-2 py-1"
							/>
							<button
								onClick={handlePostComment}
								className="rounded bg-[#ffcc84] px-4 py-2 text-black"
							>
								Post
							</button>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
export default SinglePost;
