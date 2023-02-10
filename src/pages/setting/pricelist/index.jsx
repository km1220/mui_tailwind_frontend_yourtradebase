import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function PriceListPage() {
	const navigate = useNavigate();
	return (
		<>
			<div>
				<Button onClick={() => navigate('/setting/price_list/new')}>Add a price list item</Button>
				<ul>
					<li>1</li>
					<li>2</li>
					<li>3</li>
					<li>4</li>
				</ul>
			</div>
		</>
	)
}
