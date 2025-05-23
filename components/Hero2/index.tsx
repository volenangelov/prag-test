"use client";
import { Container } from '@/components/craft';
import React, { FC } from 'react';
import careersImage from "@/public/leeds_dock.jpg";
import ReadMoreButton from "@/components/ReadMoreButton";
import Image from 'next/image';

interface Hero2Props {

}

const Hero2: FC<Hero2Props> = ({ }) => {
    return (
        <div
            className="bg-dark hero flex py-16 md:py-32 items-center mt-[75px]"
        >
            <Container className="w-full z-[3]">
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] items-center gap-12">
                    <div className="flex flex-col space-y-4">
                        <h1 className="text-6xl md:text-6xl leading-[1] font-bold text-white">Careers</h1>
                        <p className="text-lg text-white">We're looking for passionate people who want to make an impact.</p>
                        <ReadMoreButton forceDark={true} />
                    </div>
                    <div>
                        <Image
                            className="min-w-64 md:min-w-96 w-64 md:w-96 min-x-64 md:min-h-96 h-64 md:h-96 object-cover rounded-full"
                            src={careersImage}
                            alt=""
                            width="600"
                            height="600"
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Hero2;