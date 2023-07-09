'use client';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useRentModal from '@/app/hooks/useRentModal';

import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from '../inputs/CountrySelect';
import {categories} from '../navbar/Categories';

import dynamic from 'next/dynamic';
import {useMemo, useState} from 'react';
import {FieldValues, useForm} from 'react-hook-form';
import Modal from './Modal';

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}
const RentModal = () => {
	const [isLoading, setIsLoading] = useState(false);
	const registerModal = useRegisterModal();
	const [step, setStep] = useState(STEPS.CATEGORY);
	const loginModal = useLoginModal();
	const rentModal = useRentModal();
	const Map = useMemo(() => dynamic(() => import('../Map'), {ssr: false}));
	const onBack = () => {
		setStep((value) => value - 1);
	};
	const onNext = () => {
		setStep((value) => value + 1);
	};

	const actionLabel = useMemo(() => {
		if (step === STEPS.PRICE) {
			return 'Create';
		}
		return 'Next';
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) {
			return undefined;
		}
		return 'Back';
	}, [step]);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: {errors},
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			category: '',
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: '',
			title: '',
			description: '',
		},
	});
	const category = watch('category');
	const location = watch('location');
	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};
	let bodyContent = (
		<div className='flex flex-col gap-8'>
			<Heading
				title='Which of These best describes your place?'
				subtitle='Pick a category'
			/>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
				{categories.map((item) => (
					<div key={item.label} className='col-span-1'>
						<CategoryInput
							onClick={(category) => setCustomValue('category', category)}
							selected={category === item.label}
							label={item.label}
							icon={item.icon}
						/>
					</div>
				))}
			</div>
		</div>
	);
	if (step === STEPS.LOCATION) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading
					title='Where is your place located?'
					subtitle='Help Geusts find you'
				/>
				<CountrySelect onChange={(value) => setCustomValue('location', value)} />
				<Map center={location?.latlng} />
			</div>
		);
	}
	return (
		<Modal
			disabled={isLoading}
			isOpen={rentModal.isOpen}
			title='Airbnb your home'
			actionLabel={actionLabel}
			onClose={rentModal.onClose}
			onSubmit={onNext}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			body={bodyContent}
		/>
	);
};
export default RentModal;
