"use client";
import { Container } from '@/components/craft';
import React, { FC } from 'react';
import blob from "@/public/blob.svg";
import blobDark from "@/public/blob_inverted.svg";
import { useThemeAware } from '../../app/hooks/useThemeAware';
import ContactForm from '../ContactForm';
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

interface ContactBlockProps { }

const ContactBlock: FC<ContactBlockProps> = () => {
    const blobSvgUrl = useThemeAware({
        light: blob.src,
        dark: blobDark.src
    });

    return (
        <div
            className="hero !pt-24 lg:pt-0 flex items-center justify-start"
            // style={{
            //     backgroundImage: blobSvgUrl ? `url(${blobSvgUrl})` : 'none',
            //     backgroundSize: 'contain',
            //     backgroundRepeat: 'no-repeat',
            //     backgroundPosition: 'right',
            // }}
        >
            <Container className="w-full">
                <div className="max-w-3xl">
                    <div>
                        <p className="text-lg tracking-widest">Contact us</p>
                        <p className="text-3xl font-bold my-4">Find out how we can integrate with your team to deliver quality and robust digital solutions.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
                    <div className="bg-dark shadow-lg rounded-lg ">
                        <ContactForm
                            formId={25}
                            siteUrl="http://pragmatic-digital.local"
                        />
                    </div>
                    <div className="bg-pink w-full h-full min-h-96 rounded-lg overflow-hidden shadow-lg">
                        <div className="px-8 py-6 flex flex-col space-y-1">
                            <div className="flex items-center gap-3">
                                <FaPhoneAlt color="white" />
                                <p className="text-white text-lg font-semibold"><a href="tel:01135349949">01135349949</a></p>
                            </div>
                            <div className="flex items-center gap-3">
                                <MdEmail color="white" />
                                <p className="text-white text-lg font-semibold"><a href="mailto:hello@pragmaticdigital.co.uk">hello@pragmaticdigital.co.uk</a></p>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaLocationDot color="white" />
                                <p className="text-white text-lg font-semibold">Compass House East Street, Leeds, LS9 8EE</p>
                            </div>
                        </div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2356.8590960185884!2d-1.5317684231879907!3d53.791995341285435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48795d2ba52e56bb%3A0xb3acf3a7d9d85643!2sPragmatic%20Digital%20Ltd!5e0!3m2!1sen!2suk!4v1747237298122!5m2!1sen!2suk"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Pragmatic Digital Office Location"
                            className="w-full h-full min-h-96"
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ContactBlock;