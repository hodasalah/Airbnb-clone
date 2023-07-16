import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import ReservationsClient from './ReservationsClient';


const Reservations = async() => {
  const currentUser = await getCurrentUser();
	const reservations = await getReservations({authorId: currentUser?.id});
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
				<EmptyState title='No Reservations found' subtitle="Looks Like you don't have reservations on your properties"/>
			</ClientOnly>
		);
	}
  
  
  return (<ClientOnly>
    <ReservationsClient 
      reservations={reservations}
      currentUser={currentUser}
    />
    
  </ClientOnly> );
}
 
export default Reservations;