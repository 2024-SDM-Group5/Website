import { SessionProvider } from 'next-auth/react';

import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import UserArchive from '@/app/(main-interface)/profile/[id]/archive/page';
import axios from '@/lib/axios';

jest.mock('@/lib/axios');
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

describe('UserArchive Component', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		mockedAxios.get.mockResolvedValue({
			data: [
				{ id: 1, imageUrl: '/path/to/diary1.jpg' },
				{ id: 2, imageUrl: '/path/to/diary2.jpg' },
			],
		});
	});

	it('renders UserArchive and displays diaries', async () => {
		render(
			<SessionProvider session={sessionMock}>
				<UserArchive />
			</SessionProvider>,
		);

		await waitFor(() => {
			expect(screen.getByAltText('Diary 1')).toBeInTheDocument();
			expect(screen.getByAltText('Diary 2')).toBeInTheDocument();

			expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/collections/diary', {
				headers: { Authorization: `Bearer mock-token` },
			});
		});
	});
	it('handles diary selection and navigation', async () => {
		render(
			<SessionProvider session={sessionMock}>
				<UserArchive />
			</SessionProvider>,
		);

		await waitFor(() => {
			expect(screen.getByAltText('Diary 1')).toBeInTheDocument();
		});

		fireEvent.click(screen.getByAltText('Diary 1'));

		await waitFor(() => {
			expect(
				screen.getByText(/Mocked Single Post Component for diaryId 1/),
			).toBeInTheDocument();
		});
	});
});
