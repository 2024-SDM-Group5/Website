import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import axios from 'axios';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProfileEditDialogProps {
	idToken: string;
	userId: number | null;
}

export function ProfileEditDialog({ idToken, userId }: ProfileEditDialogProps) {
	const [name, setName] = useState('');
	const [avatar, setAvatar] = useState<File | null>(null);
	const [open, setOpen] = useState(false);
	const { t } = useTranslation();

	const handleDiscard = () => {
		setOpen(false);
		setName('');
		setAvatar(null);
	};

	const handleSaveChanges = async () => {
		let avatarUrl = '';
		if (avatar) {
			const avatarFormData = new FormData();
			avatarFormData.append('avatar', avatar);

			try {
				const avatarResponse = await axios.post(
					'https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/users/avatar',
					avatarFormData,
					{
						headers: {
							Authorization: `Bearer ${idToken}`,
						},
					},
				);
				avatarUrl = avatarResponse.data.avatarUrl;
			} catch (error) {
				console.error('Failed to upload avatar:', error);
				setOpen(false);
				return;
			}
		}

		const profileData = {
			displayName: name,
			avatarUrl: avatarUrl,
		};

		try {
			const profileResponse = await axios.put(
				`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/users/${userId}`,
				profileData,
				{
					headers: {
						Authorization: `Bearer ${idToken}`,
					},
				},
			);

			if (profileResponse.data.success) {
				console.log('Profile updated:', profileResponse.data.message);
			} else {
				console.error('Profile update failed:', profileResponse.data.message);
			}
		} catch (error) {
			console.error('Failed to update profile:', error);
		} finally {
			setOpen(false);
			setName('');
			setAvatar(null);
		}
	};
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setAvatar(event.target.files[0]);
		} else {
			setAvatar(null);
		}
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="text-md w-[48%] bg-[#ffcc84] px-3 py-1 text-sm text-black"
				>
					{t("編輯檔案")}
				</Button>
			</DialogTrigger>
			<DialogContent className="w-[75%] bg-white">
				<DialogHeader>
					<DialogTitle>{t("編輯檔案")}</DialogTitle>
					<DialogDescription>Make changes to your profile here.</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							{t("姓名")}:
						</Label>
						<Input
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="avatar" className="text-right">
							{t("頭像")}:
						</Label>
						<input
							type="file"
							id="avatar"
							onChange={handleFileChange}
							className="col-span-3"
						/>
					</div>
				</div>
				<DialogFooter>
					<div className="flex w-full flex-row-reverse">
						<Button
							onClick={handleSaveChanges}
							className="ml-2 w-2/5 bg-[#ffcc84] px-3 py-1 text-sm text-black"
						>
							{t("儲存")}{' '}
						</Button>
						<Button
							onClick={handleDiscard}
							className="w-2/5 bg-[#f7a072] px-3 py-1 text-sm text-black"
						>
							{t("取消")}
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
