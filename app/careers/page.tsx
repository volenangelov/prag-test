import { getAllJobs } from "@/lib/wordpress";
import { Section, Container, Prose } from "@/components/craft";
import { Metadata } from "next";
import Link from "next/link";
import Jobs from "@/components/Jobs";
import Perks from "@/components/Perks";
import Hero2 from "@/components/Hero2";

export const metadata: Metadata = {
    title: "All Jobs",
    description: "Browse all jobs",
    alternates: {
        canonical: "/posts/pages",
    },
};

export default async function Careers() {
    const jobs = await getAllJobs();

    return (
        <>
            <Hero2 />
            <Jobs jobs={jobs} />
            <Perks />
        </>
    );
}
