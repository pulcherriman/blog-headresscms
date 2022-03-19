import styles from '../styles/home.module.css'
import Link from 'next/link';


export default function Header() {
	return (
		<header>
			<h1 className={styles.title}>
			<Link href="/posts">blog</Link>
			</h1>

			<p className={styles.description}>
			plcherrim のブログ
			</p>
		</header>
	)
}