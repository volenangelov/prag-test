// projects/ProjectsGrid.tsx (client component)
"use client"

import { useState } from 'react';
import { Container } from "@/components/craft";
import Link from "next/link";
import Image from 'next/image';
import type { Project, Category, ProjectsGridProps } from '@/lib/wordpress.d'; 


export default function ProjectsGrid({ initialProjects, categories }: ProjectsGridProps) {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    
    // Filter projects based on selected category
    const filteredProjects = selectedCategoryId 
        ? initialProjects.filter(project => project.categories.includes(selectedCategoryId))
        : initialProjects;
    
    return (
        <Container className="max-w-6xl !pt-20 !pb-20">
            
            <div className="mb-12 flex flex-wrap gap-2 justify-center">
                <button
                    onClick={() => setSelectedCategoryId(null)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategoryId === null 
                            ? 'bg-pink border border-pink text-white' 
                            : 'border border-dark text-gray-800 hover:bg-pink hover:text-white hover:border-pink dark:text-white dark:border-white'
                    }`}
                >
                    All
                </button>
                
                {categories.map((category: Category) => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategoryId(category.id)}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedCategoryId === category.id 
                                ? 'bg-pink border border-pink text-white' 
                                : 'border border-dark text-gray-800 hover:bg-pink hover:text-white hover:border-pink dark:text-white dark:border-white'
                        }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            
            {/* No projects message */}
            {filteredProjects.length === 0 && (
                <div className="text-center py-8">
                    <h3 className="text-2xl font-bold mb-2">No case studies found</h3>
                    <p className="text-gray-600 mb-6">
                        {selectedCategoryId 
                            ? `We don't have any case studies in this category yet.` 
                            : `We don't have any case studies to display yet.`
                        }
                    </p>
                    {selectedCategoryId && (
                        <button
                            onClick={() => setSelectedCategoryId(null)}
                            className="px-5 py-2 rounded-full text-sm font-medium bg-pink text-white hover:bg-pink-dark transition-colors"
                        >
                            View all case studies
                        </button>
                    )}
                </div>
            )}
            
            {/* Projects grid */}
            {filteredProjects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredProjects.map((project: Project) => (
                        <div key={project.id} className="relative group">
                            <Link
                                href={`/projects/${project.slug}`}
                                className="absolute inset-0 z-10"
                                aria-label={`View ${project.title.rendered} project`}
                            >
                                <span className="sr-only">View project</span>
                            </Link>

                            {/* Card content */}
                            <div className="relative">
                                {project.featured_media_url && (
                                    <div>
                                        <Image
                                            src={project.featured_media_url}
                                            alt={project.title.rendered}
                                            className="object-cover w-full rounded-lg"
                                            width={project.featured_media_width || 600}
                                            height={project.featured_media_height || 600}
                                        />
                                    </div>
                                )}
                                <div className="bg-dark w-[90%] rounded-lg mx-auto -mt-12 relative z-[2] px-10 pt-10 pb-8 dark:border">
                                    <h3 className="text-3xl text-white font-bold mb-3 pointer-events-none">
                                        {project.title.rendered}
                                    </h3>
                                    <div
                                        className="text-white mb-4 pointer-events-none"
                                        dangerouslySetInnerHTML={{ __html: project.excerpt.rendered }}
                                    />
                                    {project.categories && project.categoryNames && (
                                        <div className="flex flex-wrap gap-2">
                                            {project.categoryNames.map((category: string, index: number) => (
                                                <span 
                                                    key={`cat-${project.id}-${index}`} 
                                                    className="px-5 py-1.5 border-white block text-xs text-white rounded-full bg-pink"
                                                >
                                                    {category}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Container>
    );
}