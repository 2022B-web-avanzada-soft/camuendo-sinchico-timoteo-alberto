import Link from "next/link";
import styles from "../../styles/Header.module.css";
export const Header = () => {
    return (
        <header>
            <div className={styles.headerLayout}>
                <div>
                    <img src="/ball.svg" alt=""/>
                </div>
                <nav className={styles.links}>
                    <Link className={styles.link} href="/team">Teams</Link>
                    <Link className={styles.link} href="/player">Players</Link>
                </nav>
            </div>
        </header>
    )
}