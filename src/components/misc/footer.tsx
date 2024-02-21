import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

const Footer = () => {
    const { asPath } = useRouter();
    const isHome = asPath === "/";

    return (
        <footer className="flex justify-center gap-4 mx-8 border-t p-4 items-center">
            <Link
                href="/"
                aria-disabled={isHome}
                className={clsx({
                    underline: !isHome,
                })}
            >
                abby farhat
            </Link>
            |<span>{new Date().getFullYear()}</span>
        </footer>
    );
};

export default Footer;
