import { SessionProvider } from 'next-auth/react';

import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';

import CommunityOverview from '@/app/(main-interface)/community/overview/page';
import { ProfileEditDialog } from '@/components/ProfileEditDialog';

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

describe('CommunityOverview Component', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		mockedAxios.get.mockResolvedValue({
			data: [
				{ id: 1, imageUrl: '/path/to/diary1.jpg' },
				{ id: 2, imageUrl: '/path/to/diary2.jpg' },
			],
		});
	});

	it('renders CommunityOverview and displays diaries', async () => {
		render(
			<SessionProvider session={sessionMock}>
				<CommunityOverview />
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
			);
		});
	});

	it('opens the dialog, accepts input, and submits changes', async () => {
		mockedAxios.post.mockResolvedValue({ data: { avatarUrl: 'path/to/avatar.jpg' } });
		mockedAxios.put.mockResolvedValue({ data: { success: true, message: 'Profile updated' } });

		render(
			<SessionProvider session={sessionMock}>
				<ProfileEditDialog idToken="mock-token" userId={123} />
			</SessionProvider>,
		);

		const editButton = screen.getByText(/編輯檔案/);
		fireEvent.click(editButton);
		expect(screen.getByText(/Make changes to your profile here./)).toBeInTheDocument();

		const nameInput = screen.getByLabelText(/姓名/);
		fireEvent.change(nameInput, { target: { value: 'New Name' } });
		expect(nameInput.value).toBe('New Name');

		const file = new File(['(⌐□_□)'], 'avatar.png', { type: 'image/png' });
		const fileInput = screen.getByLabelText(/頭像/);
		fireEvent.change(fileInput, { target: { files: [file] } });
		const saveButton = screen.getByText(/儲存/);
		fireEvent.click(saveButton);

		await waitFor(() => {
			expect(mockedAxios.post).toHaveBeenCalledWith(
				'https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/users/avatar',
				expect.any(FormData),
				{
					headers: {
						Authorization: 'Bearer mock-token',
					},
				},
			);
			expect(mockedAxios.put).toHaveBeenCalledWith(
				'https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/users/123',
				expect.objectContaining({
					displayName: 'New Name',
					avatarUrl: 'path/to/avatar.jpg',
				}),
				{
					headers: {
						Authorization: 'Bearer mock-token',
					},
				},
			);
		});

		expect(screen.queryByText(/Make changes to your profile here./)).not.toBeInTheDocument();
	});
});
