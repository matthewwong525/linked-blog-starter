import React from "react";
import Footer from "./footer";
import Header from "./header";
import clsx from "clsx";

type Props = {
    children: React.ReactNode;
    padSides?: boolean;
};

const Layout = ({ children, padSides = false }: Props) => {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <Header />
            <main
                className={clsx("grow", {
                    "px-16": padSides,
                })}
            >
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
