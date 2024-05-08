import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

import { InfoCircledIcon } from '@radix-ui/react-icons';
import { HomeIcon, StarIcon, StarFilledIcon } from '@radix-ui/react-icons';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import i18next from '@/lib/i18n';

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
	const { t, i18n } = useTranslation('translation', { i18n: i18next });
	let prefix = '/website';
	if (process.env.NEXT_PUBLIC_NODE_ENV == 'development') {
		prefix = '';
	}
	const toggleCollect = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
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
				if (
					!response.data.center ||
					response.data.center.lat === null ||
					response.data.center.lng === null
				) {
					response.data.center = { lat: 25.0299042, lng: 121.503305 };
				}
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
				<Button variant="link" className="h-full ">
					<InfoCircledIcon width="28" height="28" />
				</Button>
			</HoverCardTrigger>
			<HoverCardContent className="mr-8 mt-4 flex w-full bg-white p-4 shadow-lg">
				<div className="flex w-4/5 flex-col">
					<div className="flex">
						<Image
							src={mapDetails.iconUrl || `/images/map.jpg`}
							alt="Map Icon"
							width="200"
							height="200"
							priority={true}
						/>
						<div className="ml-4">
							<h4 className="text-xl font-semibold">{mapDetails.name}</h4>
							<div className="mt-2 flex">
								<Link href={`${prefix}/profile/${mapDetails.authorId}/overview`}>
									<HomeIcon width="24" height="24" />
								</Link>
								<p className="ml-2">
									{t('作者')}:{mapDetails.author}
								</p>
							</div>
							<div className="mt-2 flex">
								<button onClick={toggleCollect}>
									{mapDetails.hasCollected ? (
										<StarFilledIcon width="24" height="24" />
									) : (
										<StarIcon width="24" height="24" />
									)}
								</button>
								<p className="ml-2">
									{mapDetails.collectCount} {t('收藏')}
								</p>
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
