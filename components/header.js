import { css } from '@emotion/react';
import styled from '@emotion/styled'
import Link from 'next/link';

export default function Header() {
	return (
		<HeaderStyles>
			<Link href="/" passHref><a css={HeaderTextStyle}>ぷるまんのブログ（工事中）</a></Link>
		</HeaderStyles>
	)
}

const HeaderStyles = styled.header`
	display: flex;
	flex: 1 1;
	padding: 1rem 0;
	margin-bottom: 1rem;
	border-bottom: 1px solid #eaeaea;
	justify-content: center;
	align-items: center;
`;

const HeaderTextStyle = css`
	font-size: 1.5rem;
	font-weight: 700;
	font-family: "ヒラギノ丸ゴ Pro W4","ヒラギノ丸ゴ Pro","Hiragino Maru Gothic Pro","ヒラギノ角ゴ Pro W3","Hiragino Kaku Gothic Pro","HG丸ｺﾞｼｯｸM-PRO","HGMaruGothicMPRO";
`;

