import Image from 'next/image';

interface SinglePostProps {
	authorAvatarUrl: string;
	authorName: string;
	imageUrl: string;
	favCount: number;
	replies: { id: number; username: string; content: string }[];
}

const SinglePost = ({
	authorAvatarUrl,
	authorName,
	imageUrl,
	favCount,
	replies,
}: SinglePostProps) => {
	return (
		<div className="flex w-full flex-col items-center justify-center">
			<div className="mb-4 ml-4 flex w-full items-center justify-start">
				<Image
					src={authorAvatarUrl}
					alt="Author"
					width={80}
					height={80}
					className="rounded-full"
				/>
				<span className="ml-4">{authorName}</span>
			</div>
			<Image src={imageUrl} alt="Diary" width={800} height={800} className="w-full" />
			<div className="mb-4 ml-4 flex w-full flex-col items-start justify-center">
				<span className="text-xl">❤️ {favCount}</span>
				{replies.map((reply) => (
					<div key={reply.id}>
						{reply.username}: {reply.content}
					</div>
				))}
			</div>
		</div>
	);
};

export default SinglePost;
