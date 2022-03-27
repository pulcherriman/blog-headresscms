export default function App({ children }) {
	return (
		<main>
			<style jsx global>{`
				body {
					margin: 0;
					padding: 25px 50px;
					background-color: #f5f5f5;
					font-size: 13px;
					font-family: "Helvetica Neue",
						Arial,
						"Hiragino Kaku Gothic ProN",
						"Hiragino Sans",
						Meiryo,
						sans-serif;
				}
				button {
					cursor:pointer;
				}
				a {
					color: inherit;
					text-decoration: none;
				}
				main {
					max-width: 1200px;
					margin: 0 auto;
				}

				/* icon設定 */
				@font-face {
					font-family: 'Material Icons';
					font-style: normal;
					font-weight: 400;
					src: url(https://fonts.gstatic.com/s/materialicons/v126/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2');
				}

				.material-icons {
					font-family: 'Material Icons';
					font-weight: normal;
					font-style: normal;
					font-size: 24px;
					line-height: 1;
					letter-spacing: normal;
					text-transform: none;
					display: inline-block;
					white-space: nowrap;
					word-wrap: normal;
					direction: ltr;
					-webkit-font-feature-settings: 'liga';
					-webkit-font-smoothing: antialiased;
					vertical-align: -0.125em;
				}
			`}</style>
			{children}
		</main>
	)
}