import React from 'react';

import { SessionProvider } from 'next-auth/react';
import { useSearchParams, useParams } from 'next/navigation';

import { initialize } from '@googlemaps/jest-mocks';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, act, createEvent } from '@testing-library/react';

import MyMapGeneral from '@/app/(main-interface)/mymap/map/page';
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
	mockedAxios.get.mockImplementation((url) => {
		if (url.includes('/api/v1/users/me')) {
			return {
				data: {
					mapId: 0,
				},
			};
		}
		return {
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
		};
	});
});

const sessionMock = {
	expires: '2024-01-01T00:00:00.000Z',
	idToken: 'mock-token',
	status: 'authenticated',
};

describe('MyMapGeneral Component', () => {
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
				<MyMapGeneral />
			</SessionProvider>,
		);
		await waitFor(() => {
			expect(global.navigator.geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
			expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/users/me', {
				headers: {
					Authorization: 'Bearer mock-token',
				},
			});
			expect(effect).toHaveBeenCalled();
		});
	});
	it('renders without crashing with given center', async () => {
		useSearchParams.mockReturnValue({
			get: () => '51.1,45.3',
		});
		useParams.mockReturnValue({
			id: '0',
		});
		const effect = jest.spyOn(React, 'useEffect');
		let container = render(
			<SessionProvider session={sessionMock}>
				<MyMapGeneral />
			</SessionProvider>,
		);
		await waitFor(() => {
			expect(global.navigator.geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
			expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/users/me', {
				headers: {
					Authorization: 'Bearer mock-token',
				},
			});
			expect(effect).toHaveBeenCalled();
		});
	});
});
