import SinglePost from './SinglePost';
import type { SinglePostProps } from './SinglePost';

const PostList = ({ posts }: { posts: SinglePostProps[] }) => (
	<div className="h-[100vh] overflow-hidden overflow-y-scroll">
		{posts.map((post) => (
			<SinglePost
				key={post.diaryId}
				diaryId={post.diaryId}
			/>
		))}
	</div>
);
export default PostList;
