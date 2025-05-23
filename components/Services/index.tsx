"use client";
import React, { FC, useState, useEffect } from 'react';
import { Container } from '../craft';
import Image from "next/image";
import Link from 'next/link';
import { FiArrowRight } from "react-icons/fi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import imageTest from "@/public/service_image.png";

interface ServicesProps { }

interface Service {
    id: number;
    title: string;
    description: string;
    fullDescription: string;
}

const Services: FC<ServicesProps> = ({ }) => {
    const [activeService, setActiveService] = useState(0);
    const [progress, setProgress] = useState(0);

    const services: Service[] = [
        {
            id: 1,
            title: "Web Application Development",
            description: "Modern web applications built with cutting-edge technologies.",
            fullDescription: "Our web applications combine stunning design with powerful functionality. Using the latest frameworks and technologies, we create fast, responsive, and secure applications that deliver exceptional user experiences and meet your business objectives."
        },
        {
            id: 2,
            title: "CMS Development",
            description: "We build CMS solutions with performance and scalability in mind.",
            fullDescription: "Due to their open source nature, Content Management Systems (CMS) provide brilliant platforms that save time in development whilst remaining flexible for customisation. Our expert team creates robust, user-friendly content management solutions tailored to your specific needs."
        },
        {
            id: 3,
            title: "E-commerce Solutions",
            description: "Custom e-commerce platforms designed for growth and conversion.",
            fullDescription: "We develop comprehensive e-commerce solutions that drive sales and enhance user experience. From payment integration to inventory management, our platforms are built to scale with your business and maximize conversion rates across all devices."
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prevProgress => {
                if (prevProgress >= 100) {
                    return 100;
                }
                return prevProgress + (100 / 100);
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            const timeout = setTimeout(() => {
                setActiveService(prev => (prev + 1) % services.length);
                setProgress(0);
            }, 100);

            return () => clearTimeout(timeout);
        }
    }, [progress, services.length]);

    const handleServiceClick = (index: number) => {
        setActiveService(index);
        setProgress(0);
    };

    return (
        <div className="services pb-20 border-b">
            <div>
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        <div className="flex flex-col gap-8">
                            {services.map((service, index) => (
                                <div key={service.id}>
                                    <div
                                        className={`group items-start gap-2 cursor-pointer transition-all duration-300 rounded-lg ${activeService === index
                                            ? ''
                                            : ''
                                            }`}
                                        onClick={() => handleServiceClick(index)}
                                    >
                                        <div className="flex gap-4">
                                            <div>
                                                <p className="text-xl font-semibold">{service.id}.</p>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xl font-semibold">{service.title}</p>

                                                <div className="content text-gray-500 dark:text-gray-300 pt-2 max-w-sm">
                                                    {service.description}
                                                </div>
                                            </div>
                                            <div className={`self-center transition-all duration-500 ease-out ${
                                                activeService === index
                                                    ? 'opacity-100 transform translate-x-0'
                                                    : 'opacity-0 transform -translate-x-4 pointer-events-none'
                                            }`}>
                                                <FiArrowRight size="20" />
                                            </div>
                                        </div>

                                        <div className="w-full mt-4">
                                            {activeService === index && (
                                                <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-[2px]">
                                                    <div
                                                        className="bg-pink dark:bg-pink h-[2px] rounded-full transition-all duration-100 ease-linear"
                                                        style={{ width: `${progress}%` }}
                                                    ></div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 gap-24">
                            <div className="pb-16">
                                <p className="text-3xl mb-4 font-semibold">
                                    {services[activeService].title}
                                </p>
                                <p className="text-gray-500 dark:text-gray-300">
                                    {services[activeService].fullDescription}
                                </p>
                                <div className="mt-6">
                                    <Link
                                        href="/"
                                        className="hover:border-b hover:border-dark pb-2 inline-flex items-center gap-2 text-lg font-semibold text-dark dark:text-white"
                                    >
                                        Learn more <FiArrowRight />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            <div>
                <Container>
                    <div className="flex justify-center">
                        <Link
                            href="/"
                            className="no-underline border-b pb-2 border-dark dark:border-white text-xl dark:hover:text-blue-400 transition-colors"
                        >
                            View all services
                        </Link>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Services;