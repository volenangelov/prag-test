// projects/page.tsx (server component)
import { getAllServices } from "@/lib/wordpress";
import { Container } from "@/components/craft";
import { Metadata } from "next";
import ServicesGrid from "@/components/ServicesGrid";


export const metadata: Metadata = {
    title: "Services",
    description: "Browse all services",
};

export default async function Services() {
    const services = await getAllServices();
    // const categories = await getAllCategories();

    return (
        <div>
            <div className="pt-16 md:pt-28 pb-16 md:pb-24 bg-dark mt-[75px] border-b-2 border-pink  dark:border-gray-600">
                <Container>
                    <div>
                        <p className="text-2xl md:text-4xl text-center mb-6 text-white">Solutions tailored to your business</p>
                        <p className="text-center text-white">We provide a full range of web  development and difgital solutions to clients in Leeds, the UK and worldwide. <br />
                        Get direct access to a reliable web development and digital marketing team for your next project.</p>
                    </div>
                </Container>
            </div>

            <ServicesGrid services={services} />
        </div>
    );
}