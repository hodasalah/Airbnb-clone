'use client';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import axios from 'axios';
import {useState} from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import {FcGoogle} from 'react-icons/fc';
import {AiFillGithub} from "react-icons/ai"
import Button from '../Button';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Modal from './Modal';
const RegisterModal = () => {
	const [isLoading, setIsLoading] = useState(false);
	const registerModal = useRegisterModal();
	const {
		register,
		formState: {errors},
		handleSubmit,
	} = useForm<FieldValues>({
		defaultValue: {
			name: '',
			email: '',
			password: '',
		},
	});
	const bodyContent = (
		<div className='flex flex-col gap-4'>
			<Heading title='Welcome to Airbnb' subtitle='Create an account' />
			<Input
				id='email'
				label='Email'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id='name'
				label='Name'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id='password'
				label='Password'
				type='password'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);
	const footerContent = (
		<div className='flex flex-col gap-4 mt-3'>
			<hr />
			<Button outline label='Continue With Google' icon={FcGoogle} />
			<Button outline label='Continue With Github' icon={AiFillGithub} />
			<div className="text-neutral-500 text-center font-light mt-4 ">
				<div className="flex flex-row items-center justify-center gap-3">
					<div>Already have an account</div>
					<div className="text-rose-600 cursor-pointer hover:underline" onClick={registerModal.onClose}>Login</div>
				</div>
			</div>
		</div>
	);
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		axios
			.post('/api/register', data)
			.then(() => {
				registerModal.onClose();
			})
			.catch((error) => {
				toast.error('Something went wrong');
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title='Register'
			actionLabel='Continue'
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};
export default RegisterModal;
