import React from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface ActiveLinkProps extends LinkProps {
	children: React.ReactElement;
	activeClassName: string;
}

const ActiveLink = ({
	children,
	activeClassName,
	...rest
}: ActiveLinkProps) => {
	const { asPath } = useRouter();

	const className = asPath === rest.href ? activeClassName : '';

	return <Link {...rest}>{React.cloneElement(children, { className })}</Link>;
};

export default ActiveLink;
