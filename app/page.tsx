import Container from '@/app/components/Container';
import EmptyState from '@/app/components/EmptyState';
import ListingCard from '@/app/components/listings/ListingCard';

import getCurrentUser from '@/app/actions/getCurrentUser';
import getListings, {IListingsParams} from '@/app/actions/getListings';
import getReservations from '@/app/actions/getReservations';
import ClientOnly from './components/ClientOnly';

interface HomeProps {
	searchParams: IListingsParams;
}

const Home = async ({searchParams}: HomeProps) => {
	const listings = await getListings(searchParams);
	const currentUser = await getCurrentUser();
	const reservations = await getReservations({userId: currentUser?.id});

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState showReset />
			</ClientOnly>
		);
	}
	if (reservations?.length === 0) {
		return (
			<ClientOnly>
				<EmptyState showReset />
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<Container>
				<div
					className='
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            gap-8
          '
				>
					{listings.map((listing: any) => (
						<ListingCard currentUser={currentUser} key={listing.id} data={listing} />
					))}
				</div>
			</Container>
		</ClientOnly>
	);
};

export default Home;
