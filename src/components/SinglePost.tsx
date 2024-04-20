'use client';

import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

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
}

function SinglePost({ diaryId }: SinglePostProps) {
	const [newComment, setNewComment] = useState('');
	const session = useSession();
	const [diaryDetail, setDiaryDetail] = useState<DiaryDetail | null>(null);
	const userId = useUser(session.data?.idToken);

	const handlePostComment = async () => {
		const commentData = {
			content: newComment,
			diaryId: diaryId,
		};

		try {
			await axios.post('/api/v1/comments', commentData, {
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
					<div className="mb-4 pl-4 flex w-full items-center justify-start">
						<Image
							src={diaryDetail.avatarUrl}
							alt="Author"
							width={60}
							height={60}
							className="rounded-full"
						/>
						<span className="ml-4">{diaryDetail.username}</span>
					</div>
					<Image
						src={diaryDetail.photos[0]}
						alt="Diary"
						width={800}
						height={800}
						className="w-full"
					/>
					<div className="m-4 mb-4 flex w-full flex-col items-start">
						<span className="text-xl">❤️ {diaryDetail.favCount}</span>
						{diaryDetail.replies.map((reply) => (
							<div key={reply.id} className="mt-2 flex w-full justify-around ">
								<span>
									{reply.username}: {reply.content}
								</span>
								{reply.authorId === userId && (
									<div>
										<button
											onClick={() => handleDeleteComment(reply.id)}
											className="rounded bg-red-500 px-4 py-2 text-white"
										>
											Delete
										</button>
									</div>
								)}
							</div>
						))}
						<div className="mt-2 flex w-full justify-around ">
							<input
								type="text"
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
								placeholder="Write a comment..."
								className="rounded border px-2 py-1"
							/>
							<button
								onClick={handlePostComment}
								className="rounded bg-blue-500 px-4 py-2 text-white"
							>
								Post
							</button>
						</div>
					</div>
				</div>
			) : (
				<div>Loading or diary detail not available...</div>
			)}
		</div>
	);
}
export default SinglePost;
