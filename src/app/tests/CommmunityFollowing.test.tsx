import { SessionProvider } from 'next-auth/react';

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';

import CommunityFollowing from '@/app/(main-interface)/community/following/page';

jest.mock('axios');
jest.mock('next/navigation', () => ({
	useParams: () => ({ id: '123' }),
}));
jest.mock('@/components/SinglePost', () => {
	return {
		__esModule: true,
		default: ({ diaryId }: { diaryId: number }) => (
			<div>Mocked Single Post Component for diaryId {diaryId}</div>
		),
	};
});

const mockedAxios = axios as jest.Mocked<typeof axios>;

const sessionMock = {
	expires: '2024-01-01T00:00:00.000Z',
	idToken: 'mock-token',
	status: 'authenticated',
};

describe('CommunityFollowing Component', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		mockedAxios.get.mockResolvedValue({
			data: [
				{ id: 1, imageUrl: '/path/to/diary1.jpg' },
				{ id: 2, imageUrl: '/path/to/diary2.jpg' },
			],
		});
	});

	it('renders CommunityFollowing and displays diaries', async () => {
		render(
			<SessionProvider session={sessionMock}>
				<CommunityFollowing />
			</SessionProvider>,
		);

		await waitFor(() => {
			expect(
				screen.getByText(/Mocked Single Post Component for diaryId 1/i),
			).toBeInTheDocument();
			expect(
				screen.getByText(/Mocked Single Post Component for diaryId 2/i),
			).toBeInTheDocument();

			expect(mockedAxios.get).toHaveBeenCalledWith(
				'https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/diaries',
				{
					headers: { Authorization: `Bearer mock-token` },
					params: { following: true },
				},
			);
		});
	});
});
