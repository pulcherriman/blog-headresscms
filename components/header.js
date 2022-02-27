import styles from '../styles/home.module.css'

export default function Header() {
	return (
		<header>
			<h1 className={styles.title}>
			plcherrim&apos;s blog
			</h1>

			<p className={styles.description}>
			plcherrim のブログ
			</p>
		</header>
	)
}