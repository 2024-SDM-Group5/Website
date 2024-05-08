import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, message } from 'antd';
import axios from 'axios';

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle, 
	DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import i18next from '@/lib/i18n';

interface NewDiaryDialogProps {
	idToken: string;
	close: () => void;
	restaurantId: string;
	restaurantName: string;
}

export function NewDiaryDialog({
	idToken,
	close,
	restaurantId,
	restaurantName,
}: NewDiaryDialogProps) {
	const [item, setItem] = useState('');
	const [content, setContent] = useState('');
	const [avatar, setAvatar] = useState<File | null>(null);
	const [open, setOpen] = useState(false);
	const { t, i18n } = useTranslation('translation', { i18n: i18next });
	const [isFormValid, setIsFormValid] = useState(false);
	const handleDiscard = () => {
		setOpen(false);
		setAvatar(null);
		setContent('');
	};

	const handleSaveChanges = async () => {
		if (!isFormValid) return;
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
				console.error('Failed to upload image:', error);
			}
		}

		const response = await axios.post(
			`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/diaries`,
			{ content, restaurantId, photos: [avatarUrl], items: [item] },
			{
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
			},
		);
		message.success('日記新增成功');
		setOpen(false);
		setAvatar(null);
		setContent('');
	};
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setAvatar(event.target.files[0]);
		} else {
			setAvatar(null);
		}
	};
	const date = new Date();
	let date_str = `${date.getFullYear()}/${date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}/${date.getDate() > 10 ? date.getDate() : '0' + date.getDate()}`;
	const validateForm = () => {
		setIsFormValid(item.trim() !== '' && content.trim() !== '' && avatar !== null);
	};

	useEffect(() => {
		validateForm();
	}, [item, content, avatar]);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					type="primary"
					size="large"
					style={{ color: '#000000', backgroundColor: '#EDDEA4' }}
					onClick={close}
				>
					{t('新增日記')}
				</Button>
			</DialogTrigger>
			<DialogContent className="w-[75%] bg-white ">
				<DialogHeader>
					<DialogTitle>New Diary</DialogTitle>
				</DialogHeader>
				<div className="text-md grid gap-4 py-4">
					<p>
						{t('餐廳')}： {restaurantName}
					</p>
					<p>
						{t('日期')}： {date_str}
					</p>

					<div className="grid grid-cols-4 items-center">
						<Label htmlFor="name" className="text-md">
							{t('品項')}：
						</Label>
						<Input
							id="item"
							onChange={(e) => setItem(e.target.value)}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-md">
							{t('內容')}：
						</Label>
						<Input
							id="content"
							onChange={(e) => setContent(e.target.value)}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="avatar" className="text-md">
							{t('圖片')}：
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
							disabled={!isFormValid}
							className="ml-2 w-2/5 bg-[#ffcc84] px-3 py-1 text-sm text-black"
						>
							{t('儲存')}{' '}
						</Button>
						<Button
							onClick={handleDiscard}
							className="w-2/5 bg-[#f7a072] px-3 py-1 text-sm text-black"
						>
							{t('取消')}
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
