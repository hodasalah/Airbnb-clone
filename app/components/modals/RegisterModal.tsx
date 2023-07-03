'use client';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import axios from 'axios';
import {useState} from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
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
	const bodyContent = <div className='flex flex-col gap-4'>
    <Heading title="Welcome to Airbnb" subtitle="Create an account"/>
    <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
    <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
    <Input id="password" label="Password" type="password" disabled={isLoading} register={register} errors={errors} required />
  </div>;
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		axios
			.post('/api/register', data)
			.then(() => {
				registerModal.onClose();
			})
			.catch((error) => {
				console.log(error);
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
		/>
	);
};
export default RegisterModal;
