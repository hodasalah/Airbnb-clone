import {Nunito} from 'next/font/google';
import getCurrentUser from './actions/getCurrentUser';
import ClientOnly from './components/ClientOnly';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import RentModal from './components/modals/RentModal';

import SearchModal from './components/modals/SearchModal';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import ToasterProvider from './providers/ToasterProvider';
const nunito = Nunito({subsets: ['latin']});

export const metadata = {
	title: 'Airbnb is your application',
	description: 'This is a clone  airbnb website with Nextjs and typescript',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();
	return (
		<html lang='en'>
			<body className={nunito.className}>
				<ClientOnly>
					<ToasterProvider />
					<SearchModal />
					<RentModal />
					<LoginModal />
					<RegisterModal />
					<Navbar currentUser={currentUser} />
				</ClientOnly>
				<div className='pb-20 pt-28'>{children}</div>
			</body>
		</html>
	);
}
