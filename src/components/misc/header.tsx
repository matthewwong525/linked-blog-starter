import Link from "next/link";
import { useEffect, useState } from "react";
import Search from "./search";
import clsx from "clsx";
import { useRouter } from "next/router";

const Header = () => {
    const { asPath } = useRouter();
    const isHome = asPath === "/";

    const [top, setTop] = useState(true);
    const [searching, setSearching] = useState(false);
    // detect whether user has scrolled the page down by 10px
    useEffect(() => {
        const scrollHandler = () => {
            window.pageYOffset > 10 ? setTop(false) : setTop(true);
        };
        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    }, [top]);

    return (
        <header
            className={clsx("w-full z-30", {
                "bg-white backdrop-blur-sm shadow-lg": !top,
            })}
        >
            <p
                className={clsx({
                    "text-[5rem] p-16": isHome,
                    "text-4xl": !isHome,
                })}
            >
                abby farhat
            </p>
        </header>
    );
};

export default Header;
