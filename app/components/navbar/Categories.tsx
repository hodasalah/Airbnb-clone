'use client';
import {usePathname, useSearchParams} from 'next/navigation';
import CategoryBox from '../CategoryBox';
import Container from '../Container';

import {BsSnow} from 'react-icons/bs';
import {FaSkiing} from 'react-icons/fa';
import {
	GiBarn,
	GiBoatFishing,
	GiCactus,
	GiCastle,
	GiCaveEntrance,
	GiForestCamp,
	GiIsland,
	GiWindmill,
} from 'react-icons/gi';
import {IoDiamond} from 'react-icons/io5';
import {MdOutlineVilla} from 'react-icons/md';
import {TbBeach, TbMountain, TbPool} from 'react-icons/tb';

export const categories = [
	{
		label: 'Beach',
		icon: TbBeach,
		description: 'This Property is close to the Beach',
	},
	{
		label: 'WindMills',
		icon: GiWindmill,
		description: 'This Property has windmills',
	},
	{
		label: 'Modern',
		icon: MdOutlineVilla,
		description: 'This Property is modern',
	},
	{
		label: 'CountrySide',
		icon: TbMountain,
		description: 'This Property is in the country side',
	},
	{
		label: 'Pools',
		icon: TbPool,
		description: 'This Property has a pool',
	},
	{
		label: 'Island',
		icon: GiIsland,
		description: 'This Property is on Island',
	},
	{
		label: 'Lake',
		icon: GiBoatFishing,
		description: 'This Property is close to a lake',
	},
	{
		label: 'Skiing',
		icon: FaSkiing,
		description: 'This Property is modern',
	},
	{
		label: 'Castles',
		icon: GiCastle,
		description: 'This Property is  a castle',
	},
	{
		label: 'Camping',
		icon: GiForestCamp,
		description: 'This Property has camping activities',
	},
	{
		label: 'Arctic',
		icon: BsSnow,
		description: 'This Property with arctic',
	},
	{
		label: 'Cave',
		icon: GiCaveEntrance,
		description: 'This Property is a cave',
	},
	{
		label: 'Desert',
		icon: GiCactus,
		description: 'This Property is in desert',
	},
	{
		label: 'Barns',
		icon: GiBarn,
		description: 'This Property in the barn',
	},
	{
		label: 'Lux',
		icon: IoDiamond,
		description: 'This Property is luxurious',
	},
];
const Categories = () => {
	const params = useSearchParams();
	const category = params?.get('category');
	const pathname = usePathname();
	const isMainPage = pathname === '/';
	// if (isMainPage) {
	// 	return null;
	// }
	return (
		<Container>
			<div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
			{categories.map((item) => (
					<CategoryBox
						key={item.label}
						label={item.label}
						icon={item.icon}
						selected={category === item.label}
					/>
				))}			</div>
		</Container>
	);
};
export default Categories;
