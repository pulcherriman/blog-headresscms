import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const cardStyles = css`

`;

export const Card = styled.a`
	margin-bottom: 1em;
	position: relative;
	display: inline-block;
	padding: 1em 2em;
	border: 2px solid #ccc;
	border-radius: 8px;
	background-color: white;
	text-align: left;
	transition: all .3s;

	&::before,
	&::after {
		position: absolute;
		top: -2px;
		right: -2px;
		bottom: -2px;
		left: -2px;
		z-index: 2;
		content: '';
	}

	&::before {
		border-top: 3px solid #00cec9;
		border-bottom: 3px solid #00cec9;
		border-radius: 8px;

		transform: scale(0, 1);
		transition: all .2s;
	}

	&::after {
		border-right: 3px solid #00cec9;
		border-left: 3px solid #00cec9;
		border-radius: 8px;
		transform: scale(1, 0);
		transition: all .3s;
	}

	&:hover::after,
	&:hover::before {
		opacity: 1;
		transform: scale(1);
	}
`;

export const CardTitle = styled.div`
	font-size: 1.2em;
`;

export const CardContent = styled.div`
	color: #444;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	text-indent: 1em;
`;

