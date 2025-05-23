// projects/page.tsx (server component)
import { getAllProjects, getAllCategories } from "@/lib/wordpress";
import { Container } from "@/components/craft";
import { Metadata } from "next";
import Text from "@/components/Text";
import Partners from "@/components/Partners";
import ProjectsGrid from "@/components/ProjectsGrid";


export const metadata: Metadata = {
    title: "Projects",
    description: "Browse all projects",
};

export default async function Projects() {
    const projects = await getAllProjects();
    const categories = await getAllCategories();

    console.log(projects);

    return (
        <>
            <div className="pt-16 md:pt-28 pb-16 md:pb-24 bg-dark mt-[75px] border-b-2 border-pink  dark:border-gray-600">
                <Container className="max-w-6xl">
                    <div>
                        <p className="text-2xl md:text-4xl text-center mb-6 text-white">Case studies</p>
                        <p className="text-center text-white">We are passionate about crafting exceptional web solutions that elevate your online presence. Our dedicated team of skilled web developers embraces the latest technologies and industry best practices to deliver bespoke websites tailored to your unique needs. From eye-catching designs to robust functionality, we take pride in transforming ideas into interactive and dynamic online experiences. Explore our portfolio below to witness the diverse range of projects we've undertaken, showcasing our commitment to excellence in web development.</p>
                    </div>
                </Container>
            </div>

            <ProjectsGrid initialProjects={projects} categories={categories} />

            <Partners />
        </>
    );
}