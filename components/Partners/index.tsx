import React from 'react';
import { getAllPartners } from "@/lib/wordpress";
import { Container } from '../craft';
import PartnersSlider from '../PartnersSlider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface PartnersProps { }

const Partners = async ({ }: PartnersProps) => {
    const partners = await getAllPartners();

    return (
        <div className="bg-dark partners pt-16 pb-12">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-2 items-center">
                    <p className="text-3xl md:text-4xl leading-[1.3] text-center md:text-left text-white">
                        Valued by our<br /> exceptional partners
                    </p>
                    <p className="text-center md:text-right max-w-lg mx-auto md:ml-auto text-white">
                        We&rsquo;ve been privileged to craft meaningful experiences for industry leaders and visionary startup ventures.
                    </p>
                </div>
                <div className="mt-6 md:mt-12">
                    <PartnersSlider partners={partners} />
                </div>
            </Container>
        </div>
    );
};

export default Partners;