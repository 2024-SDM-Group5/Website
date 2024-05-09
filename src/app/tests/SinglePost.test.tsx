import { render, screen } from '@testing-library/react';
import SinglePost from '@/components/SinglePost';  // Adjust the import path as necessary
import { SessionProvider } from 'next-auth/react';
import '@testing-library/jest-dom';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.get.mockResolvedValue({
  data: {
    id: 1,
    userId: 123,
    username: "testuser",
    avatarUrl: "/path/to/avatar.jpg",
    photos: ["/path/to/photo.jpg"],
    content: "Test content",
    replies: [],
    favCount: 5,
    hasFavorited: false,
    hasCollected: false
  }
});

const sessionMock = {
	expires: "2024-01-01T00:00:00.000Z", 
	data: {
	  idToken: 'mock-token'
	},
	status: 'authenticated'
  };
  
describe('SinglePost Component', () => {
	it('renders without crashing and shows heart icon', async () => {
		render(
		  <SessionProvider session={sessionMock}>
			<SinglePost diaryId={1} />
		  </SessionProvider>
		);
	  
		const heartIcon = await screen.findByTestId('heart-icon');
		expect(heartIcon).toBeInTheDocument();
	  });
	  
});
