import React from 'react';

import { SessionProvider } from 'next-auth/react';

import { initialize } from '@googlemaps/jest-mocks';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';

import MapSearchBar from '@/components/MapSearchBar';
import * as userHook from '@/hook/useUser';

jest.mock('@/hook/useUser', () => ({
	useUser: jest.fn(),
}));

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
	jest.resetAllMocks();
	initialize();
	(userHook.useUser as jest.Mock).mockReturnValue(123);
	google.maps.event.addListener = jest.fn(() => {
		return {
			remove: jest.fn(),
		};
	});
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

describe('MapSearchBar Component', () => {
	it('renders without crashing with map id 0', async () => {
		const effect = jest.spyOn(React, 'useEffect');
		render(
			<SessionProvider session={sessionMock}>
				<MapSearchBar
					map_id="0"
					map={new google.maps.Map(document.createElement('div'))}
					setDrawer={jest.fn()}
				/>
			</SessionProvider>,
		);

		const input = await screen.findByTestId('input');
		expect(input).toBeInTheDocument();
		expect(effect).toHaveBeenCalled();
		await waitFor(() => {
			expect(mockedAxios.get).toHaveBeenCalledWith(
				expect.stringContaining('api/v1/restaurants'),
			);
		});
	});
	it('renders without crashing with map id 123', async () => {
		const effect = jest.spyOn(React, 'useEffect');
		render(
			<SessionProvider session={sessionMock}>
				<MapSearchBar
					map_id="123"
					map={new google.maps.Map(document.createElement('div'))}
					setDrawer={jest.fn()}
				/>
			</SessionProvider>,
		);

		const input = await screen.findByTestId('input');
		expect(input).toBeInTheDocument();
		expect(effect).toHaveBeenCalled();
	});
});
