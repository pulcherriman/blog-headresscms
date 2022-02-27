import styles from '../styles/Home.module.css'
import { Head } from "next/document";


export default function Header() {
	return (
		<header>
			<h1 className={styles.title}>
			plcherrim's blog
			</h1>

			<p className={styles.description}>
			plcherrim のブログ
			</p>
		</header>
	)
}