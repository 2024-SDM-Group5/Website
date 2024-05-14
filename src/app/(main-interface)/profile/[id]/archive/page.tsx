'use client';

import { useState, useEffect } from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import SinglePost from '@/components/SinglePost';
import axios from '@/lib/axios';

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
					`/api/v1/collections/diary`,
					{
						headers: { Authorization: `Bearer ${session.data?.idToken}` },
					},
				);
				setUserArchives(response.data);
			} catch (error) {
				console.error('Error fetching user archives:', error);
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
				<div className="grid w-full auto-rows-min grid-cols-3 gap-1 ">
					{userArchives.map((diary) => (
						<div
							key={diary.id}
							className="relative "
							onClick={() => setSelectedDiaryId(diary.id)}
						>
							<Image
								src={diary.imageUrl || '/images/1.jpg'}
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
