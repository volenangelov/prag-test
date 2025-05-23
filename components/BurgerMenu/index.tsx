"use client"
import React, { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import PdLight from "@/public/pd-logo-light.svg";
import { burgerMenu } from "@/menu.config";

interface BurgerMenuProps {
    isOpen: boolean;
    onClose: () => void;
    menuItems: Record<string, string>;
}

type SubMenuContent = string[] | { type: 'paragraph', text: string };

const BurgerMenu: FC<BurgerMenuProps> = ({ isOpen, onClose, menuItems }) => {
    const firstMenuItemKey = Object.keys(burgerMenu)[0]?.toLowerCase() ?? null;
    const [activeMenuItem, setActiveMenuItem] = useState<string | null>(firstMenuItemKey);
    const [isVisible, setIsVisible] = useState(false);
    const [isRendered, setIsRendered] = useState(false);

    // Handle mounting/unmounting with animation
    useEffect(() => {
        if (isOpen) {
            // First render the component
            setIsRendered(true);
            // Then set it to visible to trigger the transition
            // We use requestAnimationFrame to ensure the browser has time to apply the initial styles
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsVisible(true);
                });
            });
        } else {
            // First make it invisible to trigger the fade-out
            setIsVisible(false);
            // Then remove it from the DOM after the transition completes
            const timer = setTimeout(() => {
                setIsRendered(false);
            }, 300); // Match this with your transition duration
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // If not rendered at all, don't include in the DOM
    if (!isRendered) {
        return null;
    }

    const subMenuItems: Record<string, SubMenuContent> = {
        services: ['Marketing', 'Web Development', 'Mobile Apps', 'UI/UX Design', 'SEO'],
        about: ['Our Team', 'History', 'Values', 'Mission', 'Vision'],
        partners: {
            type: 'paragraph',
            text: "Are you a marketing, development or design agency? Outsource your digital needs to a reliable development team in Leeds."
        },
        contact: {
            type: 'paragraph',
            text: "Find out how we can integrate with your team to deliver quality and robust digital solutions."
        },
        blog: {
            type: 'paragraph',
            text: "Thoughts, opinions and helpful guides covering all things digital."
        },
        careers: {
            type: 'paragraph',
            text: "Join our dynamic team and shape the future of digital innovation. Explore exciting career opportunities where your creativity and passion can thrive."
        },
        "case studies": {
            type: 'paragraph',
            text: 'Our case studies showcase our best work across various industries. We take pride in delivering exceptional results for our clients, helping them achieve their business goals through innovative digital solutions and strategic thinking.'
        }
    };

    const handleMouseEnter = (key: string) => {
        setActiveMenuItem(key.toLowerCase());
    };

    const handleMouseLeave = () => {
        setActiveMenuItem(null);
    };

    const isParagraph = (content: SubMenuContent): content is { type: 'paragraph', text: string } => {
        return typeof content === 'object' && 'type' in content && content.type === 'paragraph';
    };

    return (
        <div
            className={`fixed inset-0 z-50 bg-black bg-opacity-100 p-4 md:pt-6 shadow-xl overflow-hidden transition-opacity duration-300 ease-in-out ${
                isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            <div className="bg-pink h-full relative">
                <div className="absolute w-full flex justify-between p-4">
                    <div>
                        <Image
                            src={PdLight}
                            alt="Logo"
                            loading="eager"
                            width={42}
                            height={26.44}
                        />
                    </div>
                    <div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex h-full items-center justify-center">
                    <div className="w-full max-w-4xl flex flex-row-reverse justify-center items-center gap-20">
                        <ul className="mt-0 md:-mt-2 flex flex-col gap-4 md:gap-6 text-3xl text-white w-full md:w-1/2">
                            {Object.entries(burgerMenu).map(([key, href]) => (
                                <li
                                    key={href}
                                    className="relative text-center md:text-left"
                                    onMouseEnter={() => handleMouseEnter(key)}
                                >
                                    <Link
                                        href={href}
                                        className={`transition-all text-4xl md:text-6xl font-bold text-left ${
                                            activeMenuItem === key.toLowerCase()
                                                ? 'text-white'
                                                : 'text-pink-200 hover:text-white'
                                        }`}
                                        onClick={onClose}
                                    >
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Submenu container */}
                        <div className="w-1/2 flex items-center hidden md:block">
                            {activeMenuItem && subMenuItems[activeMenuItem] ? (
                                <div
                                    className="transition-all duration-300 ease-in-out w-full opacity-100"
                                    onMouseEnter={() => handleMouseEnter(activeMenuItem)}
                                >
                                    {(() => {
                                        const subContent = subMenuItems[activeMenuItem];
                                        return isParagraph(subContent) ? (
                                            // Render paragraph content
                                            <div className="text-left pr-6">
                                                <p className="text-white text-lg leading-relaxed max-w-full break-words">
                                                    {subContent.text}
                                                </p>
                                            </div>
                                        ) : (
                                            // Render list of links
                                            <ul className="flex flex-col justify-center gap-3 text-lg">
                                                {subContent.map((subItem, index) => (
                                                    <li key={index}>
                                                        <Link
                                                            href="#"
                                                            className="transition-all whitespace-nowrap text-pink-200 hover:text-white font-bold text-2xl text-left"
                                                            onClick={onClose}
                                                        >
                                                            {subItem}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        );
                                    })()}
                                </div>
                            ) : (
                                <div className="w-full opacity-0" />
                            )}
                        </div>
                    </div>
                </div>

                <div
                    className="absolute inset-0 -z-10"
                    onMouseLeave={handleMouseLeave}
                ></div>
            </div>
        </div>
    );
};

export default BurgerMenu;