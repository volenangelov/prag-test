"use client";
import React, { FC, useEffect, useRef } from 'react';
import Image from "next/image";
import Slider from "react-slick";

interface Partner {
    id: string | number;
    featured_media_url?: string;
    title: {
        rendered: string;
    };
}

interface PartnersSliderProps {
    partners: Partner[];
}

const PartnersSlider: FC<PartnersSliderProps> = ({ partners }) => {
    const sliderRef = useRef<Slider>(null);

    const carouselSettings = {
        infinite: true,
        dots: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        touchThreshold: 100,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 5000,
        cssEase: 'linear',
        pauseOnHover: false,
        rtl: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    speed: 3000,
                    cssEase: 'linear',
                    rtl: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    speed: 3000,
                    cssEase: 'linear',
                    rtl: false
                }
            }
        ]
    };

    useEffect(() => {
        let resizeTimer: NodeJS.Timeout;

        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (sliderRef.current) {
                    // Force restart autoplay in correct direction
                    sliderRef.current.slickPause();
                    setTimeout(() => {
                        sliderRef.current?.slickPlay();
                    }, 100);
                }
            }, 250);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimer);
        };
    }, []);

    return (
        <Slider ref={sliderRef} {...carouselSettings}>
            {partners.map((partner) => (
                <div key={partner.id} className="px-2">
                    <div className="flex justify-center items-center h-28">
                        {partner.featured_media_url ? (
                            <Image
                                src={partner.featured_media_url}
                                alt={partner.title.rendered || "Partner logo"}
                                width={130}
                                height={130}
                                className="max-w-full max-h-full object-contain"
                                style={{ objectFit: "contain" }}
                                loading="eager"
                            />
                        ) : (
                            <p className="text-sm text-center px-2">{partner.title.rendered}</p>
                        )}
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default PartnersSlider;