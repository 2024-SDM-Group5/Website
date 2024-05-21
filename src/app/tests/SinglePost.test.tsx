import { SessionProvider } from 'next-auth/react';

import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';

import SinglePost from '@/components/SinglePost';
import * as userHook from '@/hook/useUser';
import axios from '@/lib/axios';

jest.mock('@/hook/useUser', () => ({
	useUser: jest.fn(),
}));

jest.mock('@/lib/axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
	jest.resetAllMocks();

	(userHook.useUser as jest.Mock).mockReturnValue(123);
	mockedAxios.get.mockResolvedValue({
		data: {
			id: 1,
			userId: 123,
			username: 'testuser',
			avatarUrl: '/path/to/avatar.jpg',
			photos: ['/path/to/photo.jpg'],
			content: 'Test content',
			replies: [
				{
					id: 2,
					username: 'replyUser',
					content: 'A reply',
					authorId: 123,
					createdAt: 1591026000000,
					avatarUrl: '/path/to/reply-avatar.jpg',
				},
			],
			favCount: 1,
			hasFavorited: false,
			hasCollected: false,
		},
	});

	mockedAxios.post.mockResolvedValue({
		data: {
			id: 3,
			username: 'newUser',
			content: 'New comment',
			authorId: 123,
			createdAt: Date.now(),
			avatarUrl: '/path/to/new-avatar.jpg',
		},
	});
	mockedAxios.delete.mockResolvedValue({ status: 204 });
});

const sessionMock = {
	expires: '2024-01-01T00:00:00.000Z',
	data: {
		idToken: 'mock-token',
	},
	status: 'authenticated',
};

describe('SinglePost Component', () => {
	it('renders without crashing and shows heart icon', async () => {
		render(
			<SessionProvider session={sessionMock}>
				<SinglePost diaryId={1} />
			</SessionProvider>,
		);

		const heartIcon = await screen.findByTestId('heart-icon');
		expect(heartIcon).toBeInTheDocument();
	});
	it('handles optimistic updates on toggleFavorite correctly', async () => {
		mockedAxios.post.mockImplementationOnce(() =>
			Promise.resolve({
				data: {
					/* response data */
				},
			}),
		);

		render(
			<SessionProvider session={sessionMock}>
				<SinglePost diaryId={1} />
			</SessionProvider>,
		);

		const favButton = await screen.findByTestId('favorite-button');
		fireEvent.click(favButton);

		expect(screen.getByText('1')).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByText('2')).toBeInTheDocument();
		});
	});
	it('calls delete API when delete button is clicked', async () => {
		render(
			<SessionProvider session={sessionMock}>
				<SinglePost diaryId={1} />
			</SessionProvider>,
		);

		const deleteButton = await screen.findByRole('button', { name: /delete/i });
		fireEvent.click(deleteButton);

		expect(axios.delete).toHaveBeenCalled();
	});

	it('adds a new comment to the list when a comment is posted', async () => {
		render(
			<SessionProvider session={sessionMock}>
				<SinglePost diaryId={1} />
			</SessionProvider>,
		);

		const inputField = await screen.findByPlaceholderText(/Write a comment.../i);
		fireEvent.change(inputField, { target: { value: 'New comment' } });
		fireEvent.click(screen.getByText(/Post/i));

		await waitFor(() => {
			expect(axios.post).toHaveBeenCalled();
		});
	});

	it('tests toggleFavorite when already favorited', async () => {
		mockedAxios.get.mockResolvedValueOnce({
			data: {
				id: 1,
				userId: 123,
				username: 'testuser',
				avatarUrl: '/path/to/avatar.jpg',
				photos: ['/path/to/photo.jpg'],
				content: 'Test content',
				replies: [
					{
						id: 2,
						username: 'replyUser',
						content: 'A reply',
						authorId: 123,
						createdAt: 1591026000000,
						avatarUrl: '/path/to/reply-avatar.jpg',
					},
				],
				favCount: 1,
				hasFavorited: true,
				hasCollected: false,
			},
		});

		render(
			<SessionProvider session={sessionMock}>
				<SinglePost diaryId={1} />
			</SessionProvider>,
		);

		const favButton = await screen.findByTestId('favorite-button');
		fireEvent.click(favButton);

		await waitFor(() => {
			expect(mockedAxios).toHaveBeenCalledWith(
				expect.objectContaining({
					method: 'DELETE',
					url: expect.stringContaining('/api/v1/diaries/'),
				}),
			);
		});
	});
});
