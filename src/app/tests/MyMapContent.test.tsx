import React from 'react';

import { SessionProvider } from 'next-auth/react';

import { initialize } from '@googlemaps/jest-mocks';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, act, createEvent } from '@testing-library/react';
import { APIProvider } from '@vis.gl/react-google-maps';

import MapContent from '@/components/MyMapContent';
import * as userHook from '@/hook/useUser';
import axios from '@/lib/axios';

jest.mock('@/hook/useUser', () => ({
	useUser: jest.fn(),
}));
jest.mock('@/lib/axios');
jest.mock('@/components/MapInfoEditCard', () => {
	return {
		__esModule: true,
		default: ({ mapId }: { mapId: number }) => <div>Mocked Info Edit Card {mapId}</div>,
	};
});
const mockedAxios = axios as jest.Mocked<typeof axios>;
beforeAll(() => {
	jest.resetAllMocks();
	initialize();
	
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

describe('MyMapContent Component', () => {
	it('renders without crashing and successfully request with bound', async () => {
		const effect = jest.spyOn(React, 'useEffect');
		let container = render(
			<SessionProvider session={sessionMock}>
				<APIProvider
					apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY as string}
					libraries={['geometry']}
				>
					<MapContent id="0" center={{ lat: 23, lng: 120 }} />
				</APIProvider>
			</SessionProvider>,
		);
		screen.debug()
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
		let marker0 = await screen.getByTestId('marker0');
		let marker1 = await screen.getByTestId('marker1');

		expect(marker0).toBeInTheDocument();
		expect(marker1).toBeInTheDocument();
	});
	it('dragend callback', async () => {
		const effect = jest.spyOn(React, 'useEffect');
		let container = render(
			<SessionProvider session={sessionMock}>
				<APIProvider
					apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY as string}
					libraries={['geometry']}
				>
					<MapContent id="0" center={{ lat: 23, lng: 120 }} />
				</APIProvider>
			</SessionProvider>,
		);
		expect(google.maps.event.addListener).toHaveBeenCalled();
		act(() => {
			for (let call of google.maps.event.addListener.mock.calls) {
				if (call[1] === 'dragend') call[2]();
			}
		});
		await waitFor(() => {
			expect(mockedAxios.get).toHaveBeenCalledWith(
				expect.stringContaining('api/v1/restaurants?sw='),
			);
			expect(effect).toHaveBeenCalled();
		});
	});
	it('zoom_changed callback', async () => {
		const effect = jest.spyOn(React, 'useEffect');
		let container = render(
			<SessionProvider session={sessionMock}>
				<APIProvider
					apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY as string}
					libraries={['geometry']}
				>
					<MapContent id="0" center={{ lat: 23, lng: 120 }} />
				</APIProvider>
			</SessionProvider>,
		);
		expect(google.maps.event.addListener).toHaveBeenCalled();
		act(() => {
			for (let call of google.maps.event.addListener.mock.calls) {
				if (call[1] === 'zoom_changed') call[2]();
			}
		});
		await waitFor(() => {
			expect(mockedAxios.get).toHaveBeenCalledWith(
				expect.stringContaining('api/v1/restaurants?sw='),
			);
			expect(effect).toHaveBeenCalled();
		});
	});
});
