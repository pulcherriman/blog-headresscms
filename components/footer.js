import { css } from '@emotion/react';
import styled from '@emotion/styled'

export default function Footer() {
	return (
		<FooterStyles>
			Copyright © 2022 plcherrim All Rights Reserved.
		</FooterStyles>
	)
}

const FooterStyles = styled.footer`
	display: flex;
	flex: 1 1;
	padding: 1rem 0;
	margin-top: 1rem;
	border-top: 1px solid #eaeaea;
	justify-content: center;
	align-items: center;
`;