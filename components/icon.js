import { css } from '@emotion/react';
import styled from '@emotion/styled'

export default function Icon({ name, size }) {
	return (
		<span className="material-icons" css={css`
			font-size: ${size || '1em'};
		`}>
			{ name }
		</span>
	);
};

