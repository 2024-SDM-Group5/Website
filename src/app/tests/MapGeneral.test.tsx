import React from 'react';

import { SessionProvider } from 'next-auth/react';
import { useSearchParams, useParams } from 'next/navigation';

import { initialize, PinElement, mockInstances } from '@googlemaps/jest-mocks';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, act, createEvent } from '@testing-library/react';

import MapGeneral from '@/app/(main-interface)/map/[id]/general/page';
import * as userHook from '@/hook/useUser';
import axios from '@/lib/axios';

jest.mock('@/hook/useUser', () => ({
	useUser: jest.fn(),
}));

jest.mock('next/navigation');
jest.mock('@/lib/axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
beforeAll(() => {
	jest.resetAllMocks();
	initialize();
	google.maps.event.addListener = jest.fn(() => {
		return {
			remove: jest.fn(),
		};
	});
	const mockGeolocation = {
		getCurrentPosition: jest.fn().mockImplementationOnce((success) => {
			success({
				coords: {
					latitude: 51.1,
					longitude: 45.3,
				},
			});
		}),
	};
	global.navigator.geolocation = mockGeolocation;

	(userHook.useUser as jest.Mock).mockReturnValue(123);
	mockedAxios.get.mockResolvedValue({
		data: {
			restaurants: [
				{
					name: 'Once Restaurant',
					address: '123',
					location: {
						lat: 23,
						lng: 120,
					},
					telephone: '000000000',
					rating: 5,
					placeId: '55555',
					viewCount: 66,
					favCount: 66,
				},
				{
					name: 'Twice Restaurant',
					address: '123',
					location: {
						lat: 23,
						lng: 120.1,
					},
					telephone: '000000001',
					rating: 5,
					placeId: '666666',
					viewCount: 77,
					favCount: 77,
				},
			],
		},
	});
});

const sessionMock = {
	expires: '2024-01-01T00:00:00.000Z',
	data: {
		idToken: 'mock-token',
	},
	status: 'authenticated',
};

describe('MapGeneral Component', () => {
	it('renders without crashing with navigator', async () => {
		useSearchParams.mockReturnValue({
			get: () => undefined,
		});
		useParams.mockReturnValue({
			id: '0',
		});
		const effect = jest.spyOn(React, 'useEffect');
		let container = render(
			<SessionProvider session={sessionMock}>
				<MapGeneral />
			</SessionProvider>,
		);
		expect(google.maps.event.addListener).toHaveBeenCalled();
		expect(global.navigator.geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
		act(() => {
			for (let call of google.maps.event.addListener.mock.calls) {
				if (call[1] === 'tilesloaded') call[2]();
			}
		});
		await waitFor(() => {
			expect(mockedAxios.get).toHaveBeenCalledWith(
				expect.stringContaining('api/v1/restaurants?sw='),
			);
			expect(effect).toHaveBeenCalled();
		});
		let map = await screen.getByTestId('map');
		let marker0 = await screen.getByTestId('marker0');
		let marker1 = await screen.getByTestId('marker1');

		expect(map).toBeInTheDocument();
		expect(marker0).toBeInTheDocument();
		expect(marker1).toBeInTheDocument();
	});
	it('renders without crashing with given center', async () => {
		useSearchParams.mockReturnValue({
			get: () => "51.1,45.3"
		});
		useParams.mockReturnValue({
			id: '0',
		});
		const effect = jest.spyOn(React, 'useEffect');
		let container = render(
			<SessionProvider session={sessionMock}>
				<MapGeneral />
			</SessionProvider>,
		);
		expect(google.maps.event.addListener).toHaveBeenCalled();
		act(() => {
			for (let call of google.maps.event.addListener.mock.calls) {
				if (call[1] === 'tilesloaded') call[2]();
			}
		});
		await waitFor(() => {
			expect(mockedAxios.get).toHaveBeenCalledWith(
				expect.stringContaining('api/v1/restaurants?sw='),
			);
			expect(effect).toHaveBeenCalled();
		});
		let map = await screen.getByTestId('map');
		let marker0 = await screen.getByTestId('marker0');
		let marker1 = await screen.getByTestId('marker1');

		expect(map).toBeInTheDocument();
		expect(marker0).toBeInTheDocument();
		expect(marker1).toBeInTheDocument();
	});
});
