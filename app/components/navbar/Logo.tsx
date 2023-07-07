'use client';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
const Logo = () => {
	const router = useRouter();
	return (
		<Image
			alt='airbnb logo'
			width={100}
			height={100}
			src='/images/logo-2.png'
			className='hidden md:block cursor-pointer'
			priority
		/>
	);
};

export default Logo;
