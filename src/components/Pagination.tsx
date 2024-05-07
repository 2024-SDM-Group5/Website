import { Dispatch, SetStateAction } from 'react';

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

const MyPagination = ({
	idx,
	total,
	setIdx,
}: {
	idx: number;
	total: number;
	setIdx: Dispatch<SetStateAction<number>>;
}) => {
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem
					onClick={(e) => {
						if (idx !== 0) setIdx((prev) => prev - 1);
					}}
					tabIndex={idx === 0 ? -1 : undefined}
					aria-disabled={idx === 0 ? true : false}
					className={idx === 0 ? 'pointer-event-none opacity-50' : ''}
				>
					<PaginationPrevious href="#" />
				</PaginationItem>
				{idx > 0 && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}
				<PaginationItem>
					<PaginationLink isActive href="#">
						{idx + 1}
					</PaginationLink>
				</PaginationItem>
				{Math.floor(total / 10) > idx && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}
				<PaginationItem
					onClick={(e) => {
						if (idx !== Math.floor(total / 10)) setIdx((prev) => prev + 1);
					}}
					tabIndex={idx === Math.floor(total / 10) ? -1 : undefined}
					aria-disabled={idx === Math.floor(total / 10) ? true : false}
					className={
						idx === Math.floor(total / 10) ? 'pointer-event-none opacity-50' : ''
					}
				>
					<PaginationNext href="#" />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
export default MyPagination;
