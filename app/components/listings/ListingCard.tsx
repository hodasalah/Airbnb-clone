'use client';
import useCountries from '@/app/hooks/useCountries';
import { SafeUser , SafeListing } from '@/app/types';
import { Listing, Reservation } from '@prisma/client';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import Button from '../Button';
import HeartButton from '../HeartButton';

interface ListingCardProps {
	data:  SafeListing ;
	reservation?: Reservation;
	currentUser?: SafeUser | null;
	actionLabel?: string;
	actionId?: string;
	disabled?: boolean;
	onAction?: (id: string) => void;
}
const ListingCard: React.FC<ListingCardProps> = ({
	data,
	reservation,
	currentUser,
	actionLabel,
	actionId = '',
	disabled,
	onAction,
}) => {
	const router = useRouter();
	const {getByValue} = useCountries();
	const location = getByValue(data?.locationValue);

	const handleCancel = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();
			if (disabled) {
				return;
			}
			onAction?.(actionId);
		},
		[onAction, actionId, disabled],
	);

	const price = useMemo(() => {
		if (reservation) {
			return reservation.totalPrice;
		}
		return data.price;
	}, [reservation, data.price]);

	const reservationDate = useMemo(() => {
		if (!reservation) {
			return null;
		}
		const start = new Date(reservation.startDate);
		const end = new Date(reservation.endDate);
		return `${format(start, 'PP')} - ${format(end, 'PP')}`;
	}, [reservation]);

	return (
		<div
			className='col-span-1 cursor-pointer group'
			onClick={() => router.push(`/listings/${data.id}`)}
		>
			<div className='aspect-square w-full relative overflow-hidden rounded-xl'>
				<Image
					alt='listing'
					src={data.imageSrc}
					fill
					className='object-cover h-full w-full group-hover:scale-110 transition'
				/>
				<div className='absolute top-3 right-3 '>
					<HeartButton listingId={data.id} currentUser={currentUser} />
				</div>
        </div>
				<div className='font-semibold text-lg'>
					{location?.region} , {location?.label}
				</div>
				<div className='font-light text-neutral-500'>
					{reservationDate || data.category}
				</div>
				<div className='flex flex-row items-center gap-1'>
					<div className='font-semibold'>{price}</div>
					{!reservation && <div className='font-light'>night</div>}
				</div>
				{onAction && actionLabel && (
					<Button
						disabled={disabled}
						small
						label={actionLabel}
						onClick={handleCancel}
					/>
				)}
			
		</div>
	);
};

export default ListingCard;
