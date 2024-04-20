import SinglePost from './SinglePost';
import type { SinglePostProps } from './SinglePost';

const PostList = ({ posts }: { posts: SinglePostProps[] }) => (
	<div className="h-full w-full overflow-auto">
		{posts.map((post) => (
			<SinglePost key={post.diaryId} diaryId={post.diaryId} />
		))}
	</div>
);
export default PostList;
