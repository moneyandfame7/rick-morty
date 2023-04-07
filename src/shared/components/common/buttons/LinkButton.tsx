import React, {FC, PropsWithChildren} from 'react';
import {useNavigate} from 'react-router-dom';

import {StyledOutlineButton} from './OutlinedButton';
import {StyledPrimaryButton} from './PrimaryButton';

type ButtonVariant = 'outlined' | 'primary';
type ButtonSize = 'small' | 'medium' | 'large';

interface LinkButtonProps {
	variant?: ButtonVariant;
	to: string;
	onClick?: () => void;
	size?: ButtonSize;
}

export const LinkButton: FC<LinkButtonProps & PropsWithChildren> = ({
	variant = 'primary',
	to,
	onClick,
	children,
	size = 'medium',
}) => {
	const navigate = useNavigate();
	const navigateTo = () => {
		if (onClick) {
			onClick();
		}
		navigate({pathname: to});
	};
	switch (variant) {
		case 'primary':
			return (
				<StyledPrimaryButton onClick={navigateTo} size={size}>
					{children}
				</StyledPrimaryButton>
			);
		case 'outlined':
			return (
				<StyledOutlineButton onClick={navigateTo} size={size}>
					{children}
				</StyledOutlineButton>
			);
		default:
			return (
				<StyledPrimaryButton onClick={navigateTo} size={size}>
					{children}
				</StyledPrimaryButton>
			);
	}
};
