'use client';

import { useState, useEffect } from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import axios from 'axios';

import SinglePost from '@/components/SinglePost';

interface Diary {
	id: number;
	imageUrl: string;
}

function UserArchive() {
	const [userArchives, setUserArchives] = useState<Diary[]>([]);
	const params = useParams<{ id: string }>();
	const session = useSession();
	const [selectedDiaryId, setSelectedDiaryId] = useState<number | null>(null);
	const handleBack = () => {
		setSelectedDiaryId(null);
	};

	useEffect(() => {
		const fetchUserArchives = async () => {
			try {
				const response = await axios.get(
					`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/collections/diary`,
					{
						headers: { Authorization: `Bearer ${session.data?.idToken}` },
					},
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
		<div className="flex w-full flex-1 flex-col ">
			<div className="flex w-full flex-1 overflow-auto">
				<div className="grid auto-rows-min w-full grid-cols-3 gap-1 ">
					{userArchives.map((diary) => (
						<div
							key={diary.id}
							className="relative "
							onClick={() => setSelectedDiaryId(diary.id)}
						>
							<Image
								src={diary.imageUrl}
								alt={`Diary ${diary.id}`}
								width={500}
								height={500}
								priority={true}
								className="aspect-square object-cover"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default UserArchive;
