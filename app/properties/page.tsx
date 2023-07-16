import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import getListings from '../actions/getListings';
import PropertiesClient from './PropertiesClient';

const Properties = async () => {
	const currentUser = await getCurrentUser();
	const listings = await getListings({userId: currentUser?.id});

	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState title='Unauthorized' subtitle='Please Login first' />
			</ClientOnly>
		);
	}

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title='No properties found'
					subtitle='Looks like you have no properties.'
				/>
			</ClientOnly>
		);
	}
	return (
		<ClientOnly>
			<PropertiesClient listings={listings} currentUser={currentUser} />
		</ClientOnly>
	);
};
export default Properties;
