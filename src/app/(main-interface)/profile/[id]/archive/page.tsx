'use client';

import { useState, useEffect } from 'react';

// import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import type { DiaryDetail } from '../overview/page';
import axios from 'axios';

import SinglePost from '@/components/SinglePost';

// import { useUser } from '@/hook/useUser';

interface Diary {
	id: number;
	imageUrl: string;
}

function UserArchive() {
	const [userArchives, setUserArchives] = useState<Diary[]>([]);
	const params = useParams<{ id: string }>();
	// const session = useSession();
	const [selectedDiaryId, setSelectedDiaryId] = useState<number | null>(null);
	const [selectedDiaryDetail, setSelectedDiaryDetail] = useState<DiaryDetail | null>(null);
	const handleBack = () => {
		setSelectedDiaryId(null);
		setSelectedDiaryDetail(null);
	};

	useEffect(() => {
		const fetchDiaryDetail = async () => {
			if (selectedDiaryId) {
				try {
					const response = await axios.get(
						`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/diaries/${selectedDiaryId}`,
					);
					setSelectedDiaryDetail(response.data);
					console.log('SelectedDiaryDetail: ', response.data);
				} catch (error) {
					console.error('Failed to fetch diary details:', error);
				}
			}
		};
		fetchDiaryDetail();
	}, [selectedDiaryId]);

	useEffect(() => {
		const fetchUserArchives = async () => {
			try {
				const response = await axios.get(
					`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/users/${params.id}/collections`,
				);
				setUserArchives(response.data);
			} catch (error) {
				if (axios.isAxiosError(error)) {
					if (error.response && error.response.status === 404) {
						console.error('User not found:', error.response.data);
					} else if (error.response && error.response.status === 500) {
						console.error('System error:', error.response.data);
					} else {
						console.error('Error fetching user archives:', error.message);
					}
				} else {
					console.error('Non-Axios error:', error);
				}
			}
		};

		fetchUserArchives();
	}, [params.id]);

	if (selectedDiaryId && selectedDiaryDetail) {
		return (
			<div className="w-full">
				<button onClick={handleBack} className="m-4">
					Back
				</button>
				<SinglePost
					avatarUrl={selectedDiaryDetail.avatarUrl}
					authorName={selectedDiaryDetail.username}
					imageUrl={selectedDiaryDetail.photos[0]}
					favCount={selectedDiaryDetail.favCount}
					replies={selectedDiaryDetail.replies}
					content={selectedDiaryDetail.content}
				/>
			</div>
		);
	}
	return (
		<div className="flex w-full flex-1 flex-col">
			<div className="flex w-full flex-1 overflow-auto">
				<div className="grid min-h-min w-full grid-cols-3 gap-1 bg-white">
					{userArchives.map((diary) => (
						<div key={diary.id} className="relative ">
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

export default UserArchive;
