import React, {FC} from 'react';
import {Backdrop, CircularProgress} from '@mui/material';

export const BackdropLoader: FC = () => {
	return (
		<Backdrop
			sx={{
				color: 'primary.lighter',
				zIndex: 10000,
			}}
			open={true}
		>
			<CircularProgress thickness={7} />
		</Backdrop>
	);
};
