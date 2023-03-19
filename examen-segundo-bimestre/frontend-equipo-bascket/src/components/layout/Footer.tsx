import Link from "next/link";
import Image from "next/image";

export const Header = () => {
    return (
        <header>
            <div className="container">
                <div>
                    <Link href="/">
                        <a>
                            <Image src="../../public/nba-banner.png" alt="logo"/>
                        </a>
                    </Link>

                    <nav>
                        <Link href="/player">Players</Link>
                        <Link href="/team">Teams</Link>
                    </nav>
                </div>

            </div>
        </header>
    )
}