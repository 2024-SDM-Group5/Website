'use client';

import { useSession } from 'next-auth/react';

import { UserCircle2 } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function UserAvatar() {
	const { data: session } = useSession();

	return (
		<div>
			{session?.user?.image ? (
				<Avatar className="mx-auto h-8 w-8">
					<AvatarImage src={session.user.image} alt="user avatar" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			) : (
				<UserCircle2 className="mx-auto h-8 w-8" />
			)}
			<p className="w-full text-center text-xs">{session?.user?.name}</p>
		</div>
	);
}

export default UserAvatar;
