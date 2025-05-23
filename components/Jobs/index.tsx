import { getAllJobs } from "@/lib/wordpress";
import { Section, Container, Prose } from "@/components/craft";
import { Metadata } from "next";
import Link from "next/link";
import { FC } from "react";
import { FaArrowRight } from "react-icons/fa6";

interface JobsProps {
    jobs: any;
}

const Jobs: FC<JobsProps> = ({ jobs }) => {
    return (
        <>
            <Container className="max-w-6xl pt-24 md:pt-32 pb-24 md:pb-32">
                <p className="text-3xl text-center mb-8">Current vacancies</p>

                {jobs && jobs.length > 0 ? (
                    <>
                        <div className="grid-cols-3 py-6 px-3 hidden md:grid">
                            <p className="!m-0 text-sm text-gray-400">POSITION</p>
                            <p className="!m-0 text-sm text-gray-400">LOCATION</p>
                            <p className="!m-0 text-sm text-gray-400">TYPE</p>
                        </div>
                        {jobs.map((page: any) => (
                            <Link
                                href={`/careers/${page.slug}`}
                                key={page.id}
                                className="group block mt-0 hover:bg-gray-50 dark:hover:bg-dark transition-colors"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-dotted py-4 px-0 md:px-3">
                                    <div className="sm:col-span-1">
                                        <p>{page.title.rendered}</p>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <p>{page.acf?.location}</p>
                                    </div>
                                    <div className="flex items-center justify-between gap-2 sm:col-span-1">
                                        <p>{page.acf?.type}</p>
                                        <div className="bg-dark rounded-full min-w-7 w-7 min-h-7 h-7 flex items-center justify-center">
                                            <FaArrowRight
                                                color="white"
                                                size="12"
                                                className="transform transition-transform duration-300 -rotate-45 group-hover:rotate-45"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                            No current vacancies available
                        </p>
                        <p className="text-gray-500 dark:text-gray-500">
                            We're not actively hiring at the moment, but feel free to check back soon or{" "}
                            <Link
                                href="/contact"
                                className="text-black dark:text-black hover:underline"
                            >
                                get in touch
                            </Link>{" "}
                            if you're interested in future opportunities.
                        </p>
                    </div>
                )}
            </Container>
        </>
    );
};

export default Jobs;