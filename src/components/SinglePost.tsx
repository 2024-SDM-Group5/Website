'use client';

import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

import axios from 'axios';

import { useUser } from '@/hook/useUser';

export interface SinglePostType {
	id: number;
	authorAvatarUrl: string;
	authorName: string;
	imageUrl: string;
	favCount: number;
	replies: { id: number; username: string; content: string }[];
}

export interface SinglePostProps {
	diaryId: number;
}

export interface Comment {
	id: number;
	content: string;
}

export interface DiaryDetail {
	id: number;
	username: string;
	avatarUrl: string;
	photos: string[];
	content: string;
	replies: [{ id: number; username: string; content: string }];
	favCount: number;
	hasFavorited: boolean;
}

function SinglePost({ diaryId }: SinglePostProps) {
	const [newComment, setNewComment] = useState('');
	const [editingComment, setEditingComment] = useState<Comment | null>(null);
	const session = useSession();
	const [diaryDetail, setDiaryDetail] = useState<DiaryDetail | null>(null);
	const userId = useUser(session.data?.idToken);

	const handlePostComment = async () => {
		const postData = {
			userId: userId,
			content: newComment,
			postId: diaryId,
		};

		try {
			const response = await axios.post('/api/v1/comments', postData, {
				headers: { Authorization: `Bearer ${session.data?.idToken}` },
			});
			console.log('Comment posted:', response.data);
		} catch (error) {
			console.error('Failed to post comment:', error);
		}
	};

	const handleEditComment = async () => {
		if (!editingComment) return;
		const putData = {
			...editingComment,
			content: newComment, // New content from state
		};

		try {
			const response = await axios.put(`/api/v1/comments/${editingComment.id}`, putData, {
				headers: { Authorization: `Bearer ${session.data?.idToken}` },
			});
			console.log('Comment edited:', response.data);
		} catch (error) {
			console.error('Failed to edit comment:', error);
		}
	};

	const handleDeleteComment = async (commentId: number) => {
		try {
			const response = await axios.delete(`/api/v1/comments/${commentId}`, {
				headers: { Authorization: `Bearer ${session.data?.idToken}` },
			});
			console.log('Comment deleted:', response.data);
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
					<div className="mb-4 ml-4 flex w-full items-center justify-start">
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
					<div className="mb-4 ml-4 flex w-full flex-col items-start justify-center">
						<span className="text-xl">❤️ {diaryDetail.favCount}</span>
						{diaryDetail.replies.map((reply) => (
							<div key={reply.id}>
								{reply.username}: {reply.content}
							</div>
						))}
						<input
							type="text"
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							placeholder="Write a comment..."
							className="mt-2 rounded border px-2 py-1"
						/>
						<button
							onClick={handlePostComment}
							className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
						>
							Post Comment
						</button>
					</div>
				</div>
			) : (
				<div>Loading or diary detail not available...</div>
			)}
		</div>
	);
}
export default SinglePost;
