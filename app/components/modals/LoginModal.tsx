'use client';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {AiFillGithub} from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import Button from '../Button';
import Heading from '../Heading';
import Input from '../inputs/Input';
import useLoginModal from './../../hooks/useLoginModal';
import Modal from './Modal';

const LoginModal = () => {
	const [isLoading, setIsLoading] = useState(false);
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const router = useRouter();
	const {
		register,
		formState: {errors},
		handleSubmit,
	} = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const bodyContent = (
		<div className='flex flex-col gap-4'>
			<Heading title='Welcome back' subtitle='Login to your  account' />
			<Input
				id='email'
				label='Email'
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
			<Button onClick={()=>signIn("google")} outline label='Continue With Google' icon={FcGoogle} />
			<Button
				outline
				label='Continue With Github'
				onClick={() => signIn('github')}
				icon={AiFillGithub}
			/>
			<div className='text-neutral-500 text-center font-light mt-4 '>
				<div className='flex flex-row items-center justify-center gap-3'>
					<div>Already have an account</div>
					<div
						className='text-rose-600 cursor-pointer hover:underline'
						onClick={registerModal.onClose}
					>
						Login
					</div>
				</div>
			</div>
		 </div>
	);
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		signIn('credentials', {
			...data,
			redirect: false,
		}).then((res) => {
			setIsLoading(false);
			if (res?.ok) {
				toast.success('logged in successfully');
				loginModal.onClose();
				router.refresh();
			}
			if (res?.error) {
				toast.error('something went wrong');
			}
		});
	};
	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title='Login'
			actionLabel='Continue'
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};
export default LoginModal;
