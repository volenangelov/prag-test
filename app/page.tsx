// Craft Imports
import { Section, Container, Prose } from "@/components/craft";
import Balancer from "react-wrap-balancer";
// Next.js Imports
import Link from "next/link";
import Hero from "@/components/Hero";
import Text from "@/components/Text";
import Partners from "@/components/Partners";
import CaseStudies from "@/components/CaseStudies";
import Services from "@/components/Services";

// Hardcoded content for now
const acfData = {
    heading: 'We specialize in the strategic design of digital products and brands.',
    content: `<p>Our emphasis lies in crafting visually compelling experiences that not only serve functional purposes but also bring delight to users through engaging interactions.</p>`
};

const acfData2 = {
    heading: 'Explore Our Services',
    content: `<p>We provide a full range of web development and digital solutions to clients in Leeds, the UK and worldwide. </p><p>Get direct access to a reliable web development and digital marketing team for your next project.</p>`
};

export default function Home() {
    return (
        <>
            <Hero />

            <div className="py-12 md:pt-24 pb-6">
                <Container className="max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-3xl font-semibold text-center md:text-left">
                                Partnering With Ambitious Brands to Build Intuitive, High-Performing Websites
                            </p>
                        </div>
                        <p className="text-lg text-left leading-[1.5] text-center md:text-right">
                            Specialising in custom web solutions, we partner with forward-thinking brands to design, build, and scale websites that are intuitive, high-performing, and uniquely aligned with your business goals. Our collaborative approach ensures every project is as strategic as it is beautifully executed.
                        </p>
                    </div>
                </Container>
            </div>

            <Text
                width="2xl"
                heading={acfData2.heading}
                content={acfData2.content}
                className="pt-8 pb-8 md:pb-0"
            />

            <Services />

            <Text
                heading={acfData.heading}
                content={acfData.content}
                className="py-12 md:pt-20 md:pb-6 rounded-t-3xl bg-gray-50 dark:bg-dark"
            />
            <CaseStudies />
            <Partners />
        </>
    );
}