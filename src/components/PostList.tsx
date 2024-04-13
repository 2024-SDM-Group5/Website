import SinglePost from './SinglePost';
import { SinglePostType } from './SinglePost';

const PostList = ({ posts }: { posts: SinglePostType[] }) => (
	<div className="h-[100vh] overflow-hidden overflow-y-scroll">
		{posts.map((post) => (
			<SinglePost
				key={post.id}
				authorAvatarUrl={post.authorAvatarUrl}
				authorName={post.authorName}
				imageUrl={post.imageUrl}
				favCount={post.favCount}
				replies={post.replies}
			/>
		))}
	</div>
);
export default PostList;
