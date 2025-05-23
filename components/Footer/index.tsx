import React, { FC } from 'react';
import { Container } from "@/components/craft";
import Link from "next/link";
import { footerMenu1, footerMenu2 } from "@/menu.config";
import { ThemeToggle } from '../theme/theme-toggle';

interface FooterProps {

}

const Footer: FC<FooterProps> = ({ }) => {
    return (
        <Container className="pt-10 md:py-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t pt-10 md:pt-20">
                <div className="">
                    <Link
                        href="mailto:hello@pragmaticdigital.co.uk"
                        className="border-b border-gray-100 text-lg pb-1 font-semibold inline-flex hover:border-black transition-colors duration-300"
                    >
                        hello@pragmaticdigital.co.uk
                    </Link>
                    <p
                        className="text-md font-light text-gray-700 dark:text-white mt-8">
                        Compass House, East Street, <br />Leeds, LS9 8EE
                    </p>
                    <div className="mt-5">
                        <ThemeToggle />
                    </div>
                </div>
                <div className="flex justify-start sm:justify-end items-start gap-10 lg:gap-16">
                    <div className="flex flex-col gap-4 text-sm">
                        {Object.entries(footerMenu1).map(([key, href]) => (
                            <Link
                                className="hover:underline underline-offset-4 text-md"
                                key={href}
                                href={href}
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4 text-sm">
                        {Object.entries(footerMenu2).map(([key, href]) => (
                            <Link
                                className="hover:underline underline-offset-4 text-md"
                                key={href}
                                href={href}
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="pt-10">
                <p className="text-md font-light">
                    &copy; Pragmatic Digital {new Date().getFullYear()}
                </p>
            </div>
        </Container>
    );
};

export default Footer;