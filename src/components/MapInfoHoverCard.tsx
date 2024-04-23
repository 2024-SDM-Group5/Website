import { useState, useEffect } from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

import { InfoCircledIcon } from '@radix-ui/react-icons';
import { HomeIcon, StarIcon, StarFilledIcon } from '@radix-ui/react-icons';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface MapDetailType {
	id: number;
	name: string;
	iconUrl: string;
	author: string;
	authorId: number;
	viewCount: number;
	collectCount: number;
	hasCollected: boolean;
	center: { lat: number; lng: number };
	description: string;
	restaurants: string[];
}

function MapInfoHoverCard({ mapId }: { mapId: string }) {
	const [mapDetails, setMapDetails] = useState<MapDetailType | null>(null);
	const session = useSession();
	const toggleCollect = async () => {
		const method = mapDetails?.hasCollected ? 'DELETE' : 'POST';
		try {
			await axios({
				method,
				url: `https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/maps/${mapId}/collect`,
				headers: { Authorization: `Bearer ${session?.data?.idToken}` },
			});
			setMapDetails((prev) => ({
				...prev!,
				hasCollected: !prev?.hasCollected,
			}));
		} catch (error) {
			console.error('Failed to toggle collect:', error);
		}
	};
	useEffect(() => {
		async function fetchMapDetails() {
			try {
				const response = await axios.get(
					`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/maps/${mapId}`,
				);
				setMapDetails(response.data);
			} catch (error) {
				console.error('Failed to fetch map details:', error);
			}
		}

		fetchMapDetails();
	}, [mapId]);

	if (!mapDetails) return <div>Loading...</div>;

	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Button variant="link" className="h-full">
					<InfoCircledIcon width="28" height="28" />
				</Button>
			</HoverCardTrigger>
			<HoverCardContent className="w-150 mr-8 mt-4 bg-white p-4 shadow-lg">
				<div className="flex flex-col">
					<div className="flex">
						<Image
							src={mapDetails.iconUrl}
							alt="Map Icon"
							width="100"
							height="100"
							priority={true}
						/>
						<div className="ml-4">
							<h4 className="text-xl font-semibold">{mapDetails.name}</h4>
							<div className="mt-2 flex">
								<Link href={`/profile/${mapDetails.authorId}/overview`}>
									<HomeIcon width="24" height="24" />
								</Link>
								<p className="ml-2">作者： {mapDetails.author}</p>
							</div>
							<div className="mt-2 flex">
								<button onClick={toggleCollect}>
									{mapDetails.hasCollected ? (
										<StarFilledIcon width="24" height="24" />
									) : (
										<StarIcon width="24" height="24" />
									)}
								</button>
								<p className="ml-2">{mapDetails.collectCount} 收藏</p>
							</div>
						</div>
					</div>
					<p className="mt-4 text-sm">{mapDetails.description}</p>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}

export default MapInfoHoverCard;
