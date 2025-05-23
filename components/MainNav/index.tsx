"use client"
import React, { FC, useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { mainMenu } from "@/menu.config";
import PdLight from "@/public/pd-logo-light.svg";
import PdDark from "@/public/pd-logo-dark.svg";
import { NavProps } from "@/lib/types";
import { ThemeToggle } from '../theme/theme-toggle';
import { useTheme } from 'next-themes';
import BurgerMenu from '../BurgerMenu';
import BurgerIcon from '../BurgerIcon';
import { usePathname } from 'next/navigation';

const Nav: FC<NavProps> = ({ className, children, id }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, resolvedTheme } = useTheme();
    const pathname = usePathname();

    // Check if current page should force dark mode
    const shouldForceDarkMode = pathname.startsWith('/projects/');
    // You can also be more specific:
    // const shouldForceDarkMode = pathname === '/projects/ejaarent' || pathname.startsWith('/projects/');

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 1);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Use shouldForceDarkMode to override theme logic
    const isDarkMode = shouldForceDarkMode || (theme === 'dark' || resolvedTheme === 'dark');
    const logoSrc = isDarkMode ? PdLight : PdDark;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        // Prevent scrolling when menu is open
        document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = '';
    };

    return (
        <>
            <nav
                className={cn(
                    "fixed w-full z-40 top-0",
                    // Apply dark mode styling when shouldForceDarkMode is true
                    shouldForceDarkMode
                        ? "bg-dark border-gray-700"
                        : isScrolled
                            ? "bg-background"
                            : "bg-transparent",
                    "border-b transition-colors duration-500 ease-in-out",
                    // Force dark text colors when in forced dark mode
                    shouldForceDarkMode && "text-white",
                    className
                )}
                id={id}
            >
                <div
                    id="nav-container"
                    className="max-w-7xl mx-auto py-4 px-6 sm:px-8 flex justify-between items-center"
                >
                    <Link
                        className="hover:opacity-75 transition-all flex gap-4 items-center"
                        href="/"
                        onClick={closeMenu}
                    >
                        {mounted && (
                            <Image
                                src={logoSrc}
                                alt="Logo"
                                loading="eager"
                                width={42}
                                height={26.44}
                            />
                        )}
                    </Link>
                    {children}
                    <div className="flex items-center gap-10">
                        <div className="mx-2 hidden md:flex gap-10">
                            {Object.entries(mainMenu).map(([key, href]) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={cn(
                                        "text-lg",
                                        shouldForceDarkMode && "text-white hover:text-gray-300"
                                    )}
                                    onClick={closeMenu}
                                >
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </Link>
                            ))}
                        </div>
                        <button
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                            className="focus:outline-none md:flex"
                        >
                            {mounted && <BurgerIcon forceDarkMode={shouldForceDarkMode} />}
                        </button>
                        {/* <ThemeToggle /> */}
                    </div>
                </div>
            </nav>
            <BurgerMenu isOpen={isMenuOpen} onClose={closeMenu} menuItems={mainMenu} />
        </>
    );
};

export default Nav;