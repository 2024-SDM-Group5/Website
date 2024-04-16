import { useState } from 'react';

import { Button } from 'antd';

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

interface NewDiaryDialogProps {
	idToken: string;
	close: () => void;
}

export function NewDiaryDialog({ idToken, close }: NewDiaryDialogProps) {
	const [name, setName] = useState('');
	const [avatar, setAvatar] = useState<File | null>(null);
	const [open, setOpen] = useState(false);

	const handleDiscard = () => {
		setOpen(false);
		// TODO:
	};

	const handleSaveChanges = async () => {
		setOpen(false);
		// const formData = new FormData();
		// formData.append('displayName', name);
		// if (avatar) {
		//   formData.append('avatarUrl', avatar);
		// }

		// try {
		//   const response = await fetch('/api/v1/users/update', {
		//     method: 'PUT',
		//     headers: {
		//       'Authorization': `idToken: ${idToken}`,
		//     },
		//     body: formData,
		//   });

		//   if (response.ok) {
		//     //
		//   } else {
		//     // Handle non-200 responses
		//   }
		// } catch (error) {
		//   // Handle network errors
		// }
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
					type="primary"
					size="large"
					style={{ color: '#000000', backgroundColor: '#EDDEA4' }}
					onClick={close}
				>
					新增日記
				</Button>
			</DialogTrigger>
			<DialogContent className="w-[75%] bg-white ">
				<DialogHeader>
					<DialogTitle>New Diary</DialogTitle>
				</DialogHeader>
				<div className="text-md grid gap-4 py-4">
					<p>餐廳： 某間餐廳</p>
					<p>日期： 2024/2/29</p>

					<div className="grid grid-cols-4 items-center">
						<Label htmlFor="name" className="text-md">
							品項：
						</Label>
						<Input
							id="name2"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-md">
							內容：
						</Label>
						<Input
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="avatar" className="text-md">
							圖片：
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
							Save{' '}
						</Button>
						<Button
							onClick={handleDiscard}
							className="w-2/5 bg-[#f7a072] px-3 py-1 text-sm text-black"
						>
							Discard
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
