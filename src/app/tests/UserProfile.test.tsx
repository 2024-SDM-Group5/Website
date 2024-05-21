import { SessionProvider } from 'next-auth/react';

import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import UserProfile from '@/app/(main-interface)/profile/[id]/overview/page';
import * as userHook from '@/hook/useUser';
import axios from '@/lib/axios';

jest.mock('@/lib/axios');
jest.mock('@/hook/useUser');
jest.mock('react-i18next', () => ({
	useTranslation: () => {
		return {
			t: (str: string) => str,
			i18n: {
				changeLanguage: () => new Promise(() => {}),
			},
		};
	},
	initReactI18next: {
		type: '3rdParty',
		init: jest.fn(),
	},
}));
jest.mock('next/navigation', () => ({
	useParams: () => ({
		id: '123',
	}),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedUseUser = userHook.useUser as jest.Mock;

const sessionMock = {
	expires: '2024-01-01T00:00:00.000Z',
	idToken: 'mock-token',
	status: 'authenticated',
};

describe('UserProfile Component', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		mockedUseUser.mockReturnValue(321);
		mockedAxios.get.mockImplementation((url) => {
			if (url.includes('/diaries')) {
				return Promise.resolve({
					data: [
						{ id: 1, imageUrl: '/path/to/diary1.jpg' },
						{ id: 2, imageUrl: '/path/to/diary2.jpg' },
					],
				});
			} else if (url.includes('/users/me') || url.includes('/users/123')) {
				return Promise.resolve({
					data: {
						id: 123,
						displayName: 'Test User',
						avatarUrl: '/path/to/avatar.jpg',
						following: 5,
						followed: 3,
						mapId: 10,
						postCount: 2,
						isFollowing: false,
					},
				});
			}
			throw new Error('not found');
		});
		mockedAxios.post.mockImplementation((url) => {
			if (url.includes('/follow')) {
				return Promise.resolve({ status: 200 });
			}
			return Promise.reject(new Error('URL not mocked'));
		});

		mockedAxios.delete.mockImplementation((url) => {
			if (url.includes('/follow')) {
				return Promise.resolve({ status: 200 });
			}
			return Promise.reject(new Error('URL not mocked'));
		});
	});

	it('tests if UserProfile can be rendered', () => {
		render(
			<SessionProvider session={sessionMock}>
				<UserProfile />
			</SessionProvider>,
		);
	});

	it('displays user details and diaries after data fetch', async () => {
		render(
			<SessionProvider session={sessionMock}>
				<UserProfile />
			</SessionProvider>,
		);
		await waitFor(() => {
			expect(screen.getByText('Test User')).toBeInTheDocument();
			expect(screen.getByText('5 追蹤中')).toBeInTheDocument();
			expect(screen.getAllByRole('img').length).toBeGreaterThan(1);
		});

		expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('api/v1/users/123'));
	});

	it('allows a user to follow and unfollow', async () => {
		render(
			<SessionProvider session={sessionMock}>
				<UserProfile />
			</SessionProvider>,
		);

		await waitFor(() => {
			expect(screen.getByText('Test User')).toBeInTheDocument();
		});

		const followButton = screen.getByText('追蹤');
		fireEvent.click(followButton);

		await waitFor(() => {
			expect(mockedAxios).toHaveBeenCalledWith({
				method: 'post',
				url: '/api/v1/users/123/follow',
				headers: { Authorization: `Bearer ${sessionMock.idToken}` },
			});
		});

		mockedAxios.get.mockResolvedValueOnce({
			data: {
				...mockedAxios.get.mock.results[0].value.data,
				isFollowing: true,
			},
		});

		render(
			<SessionProvider session={sessionMock}>
				<UserProfile />
			</SessionProvider>,
		);

		const unfollowButton = screen.getByText('解除追蹤');
		fireEvent.click(unfollowButton);

		await waitFor(() => {
			expect(mockedAxios).toHaveBeenCalledWith({
				method: 'delete',
				url: '/api/v1/users/123/follow',
				headers: { Authorization: `Bearer ${sessionMock.idToken}` },
			});
		});
	});
});
