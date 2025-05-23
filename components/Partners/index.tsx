import React from 'react';
import { getAllPartners } from "@/lib/wordpress";
import { Container } from '../craft';
import Image from "next/image";

interface PartnersProps {

}

const Partners = async ({ }: PartnersProps) => {

    const partners = await getAllPartners();

    return (
        <div className="bg-dark partners pt-16 pb-12">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-2 items-center">
                    <p className="text-3xl md:text-4xl leading-[1.3] text-center md:text-left text-white">Valued by our<br /> exceptional partners </p>
                    <p className="text-center md:text-right max-w-lg mx-auto md:ml-auto text-white">
                        We&rsquo;ve been privileged to craft meaningful experiences for industry leaders and visionary startup ventures.
                    </p>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-6 md:mt-12">

                    {partners.map((partner: any) => (
                        <div
                            key={partner.id}
                            className="flex justify-center items-center h-28"
                        >
                            {partner.featured_media_url ? (
                                <Image
                                    src={partner.featured_media_url}
                                    alt={partner.title.rendered || "Partner logo"}
                                    width={150}
                                    height={150}
                                    className="max-w-full max-h-full object-contain"
                                    style={{
                                        objectFit: "contain"
                                    }}
                                    loading="eager"
                                />
                            ) : (
                                <p className="text-sm text-center px-2">{partner.title.rendered}</p>
                            )}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Partners;