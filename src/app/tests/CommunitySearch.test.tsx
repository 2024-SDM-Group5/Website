import { SessionProvider } from 'next-auth/react';

import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';

import Page from '@/app/(without-navbar)/community/search/page';

jest.mock('axios');
jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn(),
	}),
}));

const sessionMock = {
	expires: '2024-01-01T00:00:00.000Z',
	idToken: 'mock-token',
	status: 'authenticated',
};
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Page Component', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		mockedAxios.get.mockImplementation((url) => {
			if (url.includes('/diaries')) {
				return Promise.resolve({ data: [{ id: 1, imageUrl: '/path/to/diary1.jpg' }] });
			} else if (url.includes('/users')) {
				return Promise.resolve({
					data: [{ id: 1, displayName: 'User One', avatarUrl: '/path/to/avatar1.jpg' }],
				});
			}
			return Promise.reject(new Error('not found'));
		});
	});

	it('renders and fetches diaries based on search query', async () => {
		render(
			<SessionProvider session={sessionMock}>
				<Page />
			</SessionProvider>,
		);

		const searchInput = screen.getByPlaceholderText('Search...');
		fireEvent.change(searchInput, { target: { value: 'test query' } });

		await waitFor(() => {
			expect(screen.getByAltText(/Diary 1/i)).toBeInTheDocument();
			expect(mockedAxios.get).toHaveBeenCalledWith(
				expect.stringContaining('diaries'),
				expect.objectContaining({
					params: { q: 'test query' },
				}),
			);
		});
	});

	it('fetches user accounts based on search query after selecting the account tab', async () => {
		render(
			<SessionProvider session={sessionMock}>
				<Page />
			</SessionProvider>,
		);

		const accountTab = screen.getByText('帳號');

		fireEvent.mouseDown(accountTab);

		await waitFor(() => {
			expect(accountTab).toHaveAttribute('data-state', 'active');
		});

		const searchInput = screen.getByPlaceholderText('Search...');
		fireEvent.change(searchInput, { target: { value: 'test query' } });

		await waitFor(() => {
			expect(screen.getByText(/User One/i)).toBeInTheDocument();
			expect(mockedAxios.get).toHaveBeenCalledWith(
				expect.stringContaining('users'),
				expect.objectContaining({
					params: { q: 'test query' },
				}),
			);
		});
	});
});
