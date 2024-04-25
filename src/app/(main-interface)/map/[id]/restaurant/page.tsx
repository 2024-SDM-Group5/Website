'use client';

import { useParams } from 'next/navigation';

import RestaurantList from '@/components/RestaurantList';

function RestaurantOverview() {
	const params = useParams<{ id: string }>();
	return <RestaurantList id={params.id} type={null} />;
}

export default RestaurantOverview;
