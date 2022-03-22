export default function Loading() {
	return (
		<section>
			<div className="loader-outer">
			<div className="loader">Loading...</div>
				
			</div>
			<style jsx>
				{`
					.loader-outer {
						font-size: 8px;
						height: 3em;
						margin: 2em 0 1.5em;
					}
					.loader,
					.loader:before,
					.loader:after {
						background: skyblue;
						-webkit-animation: load1 1s infinite ease-in-out;
						animation: load1 1s infinite ease-in-out;
						width: 1em;
						height: 3em;
					}
					.loader {
						color: skyblue;
						text-indent: -9999em;
						margin: 1em auto;
						position: relative;
						-webkit-transform: translateZ(0);
						-ms-transform: translateZ(0);
						transform: translateZ(0);
						-webkit-animation-delay: -0.16s;
						animation-delay: -0.16s;
					}
					.loader:before,
					.loader:after {
						position: absolute;
						top: 0;
						content: '';
					}
					.loader:before {
						left: -1.5em;
						-webkit-animation-delay: -0.32s;
						animation-delay: -0.32s;
					}
					.loader:after {
						left: 1.5em;
					}
					@-webkit-keyframes load1 {
						0%,
						80%,
						100% {
							box-shadow: 0 0;
							height: 3em;
						}
						40% {
							box-shadow: 0 -1em;
							height: 4em;
						}
					}
					@keyframes load1 {
						0%,
						80%,
						100% {
							box-shadow: 0 0;
							height: 3em;
						}
						40% {
							box-shadow: 0 -1em;
							height: 4em;
						}
					}
				`}
			</style>
		</section>
	)
}