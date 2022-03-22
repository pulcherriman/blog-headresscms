import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Icon from './icon';

export function Card({ title, information, content }) {
	return (
		<CardStatic>
			<CardTitle>{title}</CardTitle>
			<CardInformation>{information}</CardInformation>
			{title && (<hr></hr>)}
			<CardContent>{content}</CardContent>
		</CardStatic>
	);
};

export function CardLink({ href, title, information, content }) {
	return (
		<CardReactive href={href}>
			<CardTitle>{title}</CardTitle>
			<CardInformation>
				<Icon name="schedule" />{information}
			</CardInformation>
			{title && (<hr></hr>)}
			<CardContent>{content}</CardContent>
		</CardReactive>
	);
};

const CardBase = css`
	margin-bottom: 1em;
	position: relative;
	display: inline-block;
	padding: 1em 2em;
	border: 2px solid #ccc;
	border-radius: 8px;
	background-color: white;
	text-align: left;
	transition: all .3s;
	hr{
		border-color: #ccc;
		border-width: 1px 0 0 0;
	}
`;

const CardStatic = styled.div`
	${CardBase}
`;

const CardReactive = styled.a`
	${CardBase}
	
	text-decoration: none;
	&:link, &:visited, &:hover, &:active {
		color: black;
	}

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
		border-top: 3px solid #5cb85c;
		border-bottom: 3px solid #5cb85c;
		border-radius: 8px;

		transform: scale(0, 1);
		transition: all .2s;
	}

	&::after {
		border-right: 3px solid #5cb85c;
		border-left: 3px solid #5cb85c;
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

const CardTitle = styled.span`
	font-size: 1.2em;
`;

const CardInformation = styled.span`
	padding-left: 3em;
	font-size: 0.8em;
	color: #999;
`;

const CardContent = styled.div`
	color: #444;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	text-indent: 1em;
`;

