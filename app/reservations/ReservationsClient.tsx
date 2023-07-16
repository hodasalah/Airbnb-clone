'use client';

import {useRouter} from 'next/navigation';
import {useState,useCallback} from 'react';
import {SafeReservation, SafeUser} from '../types';
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import axios from "axios";
import {toast} from "react-hot-toast"
import ListingCard from '../components/listings/ListingCard';

interface ReservationsClientProps {
	reservations: SafeReservation[];
	currentUser: SafeUser | null;
}
const ReservationsClient: React.FC<ReservationsClientProps> = ({
	reservations,
	currentUser,
}) => {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState('');
  const onCancel= useCallback((id:string)=>{
setDeletingId(id)
axios.delete(`/api/reservations/${id}`)
.then(()=>{
  toast.success("Reservation cancelled");
  router.refresh();
})
.catch((err)=>{
toast.error(err?.response?.data?.error || "something went wrong");

})
.finally(()=>{
  setDeletingId("")
})
  },[router])

	return(
  <Container>
    <Heading title="Reservations" subtitle="Bookings on Your Properties" />
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {reservations.map(reservation=>(
        <ListingCard 
        key={reservation.id} 
        data={reservation.listing} 
        reservation={reservation} 
        actionId={reservation.id} 
        actionLabel="Cancel Guest Reservation" 
        onAction={onCancel}
        disabled={deletingId === reservation.id}
        currentUser={currentUser}
        />
      ))}
    </div>

  </Container>);
};
export default ReservationsClient;
