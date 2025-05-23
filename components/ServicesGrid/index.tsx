import React, { FC } from "react";
import { Container } from "../craft";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import imageTest from "@/public/service_image.png";
import { MdOutlineArrowRightAlt } from "react-icons/md";

// Define the Service type based on your WordPress API response
interface Service {
    id: number;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    slug: string;
    featuredImage?: {
        sourceUrl: string;
        altText?: string;
    };
    // Add other fields that your WordPress API returns
    featured_media_url: string;
}

interface ServicesGridProps {
    services: Service[];
}

const ServicesGrid: FC<ServicesGridProps> = ({ services }) => {
    return (
        <div className="services pb-20 pt-8 md:pt-16">
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6 md:gap-y-12">
                    {services &&
                        services.map((service) => (
                            <Link
                                href={`/services/${service.slug}`}
                                key={service.id}
                                className="bg-white dark:bg-dark shadow-lg p-6 rounded-xl relative overflow-hidden group hover:border-0 transition-all duration-300 hover:-translate-y-1 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-pink before:transition-all before:duration-500 before:ease-out hover:before:w-full dark:border"
                            >
                                <div className="">
                                    <div className="flex flex-col h-full">
                                        <Image
                                            src={service.featured_media_url}
                                            alt="Service Image"
                                            width={45}
                                            height={45}
                                            className="dark:filter dark:invert"
                                        />
                                        <p className="text-xl md:text-2xl text-dark font-semibold mb-4 mt-4 dark:text-white">
                                            {service.title.rendered}
                                        </p>
                                        <div className="mb-4 text-gray-500 dark:text-gray-100">
                                            {service.excerpt.rendered.replace(/<[^>]*>/g, "").trim()}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </Container>
        </div>
    );
};

export default ServicesGrid;
