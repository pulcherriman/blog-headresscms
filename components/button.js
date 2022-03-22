import { css } from '@emotion/react';
import styled from '@emotion/styled'

export default function Button({ onClick, href, children }) {
	return (
		<div>
			<ButtonStyles onClick={onClick} href={href || "#"}>
				{children}
			</ButtonStyles>
		</div>
	)
}

const ButtonStyles = styled.a`
	background-color: white;
	border: 1px solid #ccc;
	padding: .25em .5em;
	border-radius: .5em;
	text-decoration: none;
	&:link, &:visited, &:hover, &:active {
		color: inherit;
	}
	&:hover {
		background-color: #eee;
	}
`;