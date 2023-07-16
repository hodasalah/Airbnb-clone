import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import TripsClient from './TripsClient';

const Trips = async () => {
	const currentUser = await getCurrentUser();
	const reservations = await getReservations({userId: currentUser?.id});

	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState title='Unauthorized' subtitle='Please Login first' />
			</ClientOnly>
		);
	}

	if (reservations.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title='No trips Found'
					subtitle='Looks like you have not any trips'
				/>
			</ClientOnly>
		);
	}
	return (
		<ClientOnly>
			<TripsClient reservations={reservations} currentUser={currentUser} />
		</ClientOnly>
	);
};
export default Trips;
