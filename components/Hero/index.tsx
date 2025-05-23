"use client";
import { Container } from '@/components/craft';
import React, { FC } from 'react';
import blob from "@/public/blob.svg";
import blobDark from "@/public/blob_inverted.svg";
import ReadMoreButton from "@/components/ReadMoreButton";
import { useThemeAware } from '../../app/hooks/useThemeAware';

interface HeroProps { }

const Hero: FC<HeroProps> = () => {
    const blobSvgUrl = useThemeAware({
        light: blob.src,
        dark: blobDark.src
    });

    return (
        <div
            className="hero h-dvh flex items-center justify-start bg-cover md:bg-contain"
            style={{
                backgroundImage: blobSvgUrl ? `url(${blobSvgUrl})` : 'none',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
            }}
        >
            <Container className="w-full z-[3]">
                <div className="flex flex-col space-y-4">
                    <p className="text-4xl leading-[1] font-semibold">We are</p>
                    <h1 className="text-6xl md:text-[90px] leading-[1] font-bold">Pragmatic Digital</h1>
                    <p className="text-lg">A digital web development agency in Leeds.</p>
                    <ReadMoreButton />
                </div>
            </Container>
        </div>
    );
};

export default Hero;