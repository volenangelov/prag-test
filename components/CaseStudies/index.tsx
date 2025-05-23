import React from 'react';
import { Container, Prose } from '@/components/craft';
import Link from 'next/link';
import Image from 'next/image';
import { getLatestProjects } from "@/lib/wordpress";

async function CaseStudies() {
    // Get only the latest 2 projects with complete media data
    const projects = await getLatestProjects(2);

    return (
        <div className="case-studies pb-20 border-b border-gray-300 bg-gray-50 dark:bg-dark">
            <Container className="max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {projects.map((project: any) => (
                        <div key={project.id} className="flex flex-col">
                            <Link href={`/projects/${project.slug}`} className="group">

                                {project.featured_media_url ? (
                                    <div className="mb-8 overflow-hidden rounded-lg">
                                        <Image
                                            src={project.featured_media_url}
                                            alt={project.title.rendered || 'Project image'}
                                            width={1200}
                                            height={675}
                                            className="w-full h-auto rounded-lg"
                                            style={{ height: 'auto' }}
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-auto mb-4 bg-gray-200 rounded-lg"></div>
                                )}

                                <h3 className="text-xl md:text-3xl font-semibold mb-2 group-hover:underline">
                                    {project.title.rendered}
                                </h3>
                            </Link>

                            {project.excerpt && (
                                <div
                                    className="mt-4"
                                    dangerouslySetInnerHTML={{ __html: project.excerpt.rendered }}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10 md:mt-20">
                    <Link href="/projects" className="border-b pb-2 border-dark dark:border-white text-xl">
                        View all case studies
                    </Link>
                </div>
            </Container>
        </div>
    );
}

export default CaseStudies;