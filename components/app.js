export default function App({ children }) {
	return (
	  <main>
		{children}
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

			/* icon設定 */
			@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
			.material-icons {
				vertical-align: -0.125em;
			}
		`}</style>
	  </main>
	)
  }