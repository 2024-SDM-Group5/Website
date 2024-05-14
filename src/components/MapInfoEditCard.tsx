import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

import { Pencil1Icon } from '@radix-ui/react-icons';
import { message } from 'antd';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';
import axios from '@/lib/axios';
import i18next from '@/lib/i18n';

function MapInfoEditCard({ mapId }: { mapId: string }) {
	const [mapDetails, setMapDetails] = useState({
		name: '',
		description: '',
		iconUrl: '',
	});
	const [file, setFile] = useState<File | null>(null);
	const { t, i18n } = useTranslation('translation', { i18n: i18next });
	const { data: session } = useSession();
	const [open, setOpen] = useState(false);
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setMapDetails((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files ? event.target.files[0] : null;

		if (file) {
			if (file.size > 10485760) {
				message.error(t('檔案大小不能超過 10MB'));
				return;
			}

			setFile(file);
		} else {
			setFile(null);
		}
	};

	const uploadImage = async () => {
		if (!file) return '';
		const avatarFormData = new FormData();
		avatarFormData.append('avatar', file);
		try {
			const response = await axios.post(
				'/api/v1/users/avatar',
				avatarFormData,
				{
					headers: {
						Authorization: `Bearer ${session?.idToken}`,
					},
				},
			);
			return response.data.avatarUrl;
		} catch (error) {
			console.error('Failed to upload image:', error);
			return '';
		}
	};

	const handleSubmit = async () => {
		const iconUrl = await uploadImage();
		if (!iconUrl) return;

		try {
			const response = await axios({
				method: 'PUT',
				url: `/api/v1/maps/${mapId}`,
				headers: { Authorization: `Bearer ${session?.idToken}` },
				data: {
					...mapDetails,
					iconUrl: iconUrl,
				},
			});
			setOpen(false);
		} catch (error) {
			console.error('Failed to save map details:', error);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="link" className="h-full">
					<Pencil1Icon width="28" height="28" />
				</Button>
			</DialogTrigger>
			<DialogContent className="w-[75%] bg-white ">
				<DialogHeader className="flex items-center justify-center text-center">
					<DialogTitle className="w-[75%] text-left">{t('編輯地圖')}</DialogTitle>
				</DialogHeader>
				<div className="text-md grid gap-2 py-4">
					<div>
						<label htmlFor="name" className="block">
							{t('地圖名稱')}:
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={mapDetails.name}
							onChange={handleInputChange}
							className="block w-[70%]"
						/>
					</div>
					<div>
						<label htmlFor="description" className="block w-full">
							{t('描述')}:
						</label>
						<textarea
							id="description"
							name="description"
							value={mapDetails.description}
							onChange={handleInputChange}
							className="block w-[70%]"
						/>
					</div>
					<div>
						<label htmlFor="file">{t('上傳圖片')}:</label>
						<input
							type="file"
							id="file"
							onChange={handleFileChange}
							accept=".jpg, .jpeg, .png"
						/>
						{file && (
							<Image
								src={URL.createObjectURL(file)}
								alt="Map Icon Preview"
								width="200"
								height="200"
							/>
						)}
					</div>
				</div>
				<DialogFooter>
					<Button
						onClick={handleSubmit}
						className="ml-2 w-2/5 bg-[#ffcc84] px-3 py-1 text-sm text-black"
					>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default MapInfoEditCard;
