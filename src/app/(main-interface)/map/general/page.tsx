'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import GoogleMapReact from 'google-map-react';

import { Form, FormItem, FormField, FormControl } from '@/components/ui/form';
import { Input } from "@/components/ui/input"

interface Coordinate {
	lat: number | undefined;
	lng: number | undefined;
}

function HomePage() {
	const [bound, setBound] = React.useState<Array<Coordinate>>([
		{
			lat: 10.99835602,
			lng: 77.01502627,
		},
		{
			lat: 10.99835602,
			lng: 77.01502627,
		},
	]);
	const form = useForm();
	console.log(bound);
	return (
		<div style={{ width: '100vw', height: 'calc(100vh - 140px)' }}>
			<Form {...form}>
				<form>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder="shadcn" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
				</form>
			</Form>
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyCZR4VCUOau8mVfA7CmTg9rMM6BpJF8f9o' }}
				defaultCenter={{
					lat: 10.99835602,
					lng: 77.01502627,
				}}
				defaultZoom={9}
				onDragEnd={(map: google.maps.Map) => {
					let ne = map.getBounds()?.getNorthEast();
					let sw = map.getBounds()?.getSouthWest();
					setBound([
						{ lat: ne?.lat(), lng: ne?.lng() },
						{ lat: sw?.lat(), lng: sw?.lng() },
					]);
				}}
			></GoogleMapReact>
		</div>
	);
}

export default HomePage;
