// pages/projects/[slug].tsx
import { getAllProjects, getProjectBySlug, getFeaturedMediaById } from "@/lib/wordpress";
import { Section, Container, Prose } from "@/components/craft";
import { siteConfig } from "@/site.config";
import blobDark from "@/public/blob_inverted.svg";
import type { Metadata } from "next";
import BackButton from "@/components/back";
import Image from 'next/image';

// Revalidate pages every 30 seconds
export const revalidate = 30;

export async function generateStaticParams() {
    try {
        const projects = await getAllProjects();
        return projects.map((project) => ({
            params: { slug: project.slug },
        }));
    } catch (error) {
        console.error('generateStaticParams error:', error);
        return []; // Empty paths with fallback
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    try {
        const { slug } = await params; // Await params to get slug
        const project = await getProjectBySlug(slug);
        if (!project) {
            return {};
        }

        const ogUrl = new URL(`${siteConfig.site_domain}/api/og`);
        ogUrl.searchParams.append("title", project.title.rendered);
        const description = project.excerpt?.rendered
            ? project.excerpt.rendered.replace(/<[^>]*>/g, "").trim()
            : project.content.rendered.replace(/<[^>]*>/g, "").trim().slice(0, 200) + "...";
        ogUrl.searchParams.append("description", description);

        return {
            title: project.title.rendered,
            description: description,
            openGraph: {
                title: project.title.rendered,
                description: description,
                type: "article",
                url: `${siteConfig.site_domain}/projects/${project.slug}`,
                images: [
                    {
                        url: ogUrl.toString(),
                        width: 1200,
                        height: 630,
                        alt: project.title.rendered,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: project.title.rendered,
                description: description,
                images: [ogUrl.toString()],
            },
        };
    } catch (error) {
        console.error(`generateMetadata error for slug:`, error);
        return {};
    }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params; // Await params to get slug
        const project = await getProjectBySlug(slug);
        if (!project) {
            return { notFound: true };
        }

        const featuredMedia = project.featured_media
            ? await getFeaturedMediaById(project.featured_media)
            : null;

        return (
            <>
                <div
                    className="pt-32 pb-28 md:pb-40 bg-dark flex items-center justify-start"
                    style={{
                        backgroundImage: `url(${blobDark.src})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right",
                    }}
                >
                    <div className="w-full">
                        <Container className="h-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[3fr_2fr] gap-6 lg:gap-12 h-full">
                                <div className="flex justify-between flex-col gap-6 md:gap-0">
                                    <div>
                                        <p className="text-white text-lg tracking-widest">PROJECT NAME</p>
                                        <h2 className="text-white text-4xl md:text-6xl font-bold mt-2 md:my-4">
                                            {project.title.rendered}
                                        </h2>
                                    </div>
                                    <div>
                                        <div className="flex flex-col lg:flex-row items-start gap-6 justify-between pb-4">
                                            {project.acf?.website && (
                                                <div className="flex flex-col gap-1">
                                                    <p className="text-white font-light text-md tracking-wider">WEBSITE</p>
                                                    <p className="text-white text-lg font-semibold uppercase">
                                                        <a href={project.acf?.website.url} target="_blank">{project.acf?.website.title}</a>
                                                    </p>
                                                </div>
                                            )}
                                            {project.acf?.role && (
                                                <div className="flex flex-col gap-1">
                                                    <p className="text-white font-light text-md tracking-wider">ROLE</p>
                                                    <p className="text-white text-lg font-semibold uppercase">{project.acf?.role}</p>
                                                </div>
                                            )}
                                            {project.acf?.platform && (
                                                <div className="flex flex-col gap-1">
                                                    <p className="text-white font-light text-md tracking-wider">PLATFORM</p>
                                                    <p className="text-white text-lg font-semibold uppercase">{project.acf?.platform}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center md:justify-end self-start">
                                    <div className="lg:max-w-[346px] bg-black p-6 rounded-lg flex flex-col space-y-8 w-full lg:w-auto">
                                        {project.acf?.industry && (
                                            <div className="grid grid-cols-2 gap-6">
                                                <p className="text-pink tracking-wider">INDUSTRY</p>
                                                <p className="text-white font-semibold">{project.acf?.industry}</p>
                                            </div>
                                        )}
                                        {project.acf?.location && (
                                            <div className="grid grid-cols-2 gap-6">
                                                <p className="text-pink tracking-wider">LOCATION</p>
                                                <p className="text-white font-semibold">{project.acf?.location}</p>
                                            </div>
                                        )}
                                        {project.acf?.involvements && (
                                            <div className="grid grid-cols-2 gap-6">
                                                <p className="text-pink tracking-wider">INVOLVEMENT</p>
                                                <p className="text-white font-semibold">
                                                    {project.acf.involvements.map((item: { involvement: string }, index: number) => (
                                                        <span key={index}>
                                                            {item.involvement}
                                                            {index !== project.acf.involvements.length - 1 && <br />}
                                                        </span>
                                                    ))}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
                {featuredMedia?.source_url && (
                    <div className="-mt-24">
                        <Container className="!pt-0 !pb-0">
                            <div className="md:h-[500px] overflow-hidden flex items-center justify-center rounded-lg bg-accent/25">
                                <Image
                                    className="w-full h-full object-cover"
                                    src={featuredMedia.source_url}
                                    alt={project.title.rendered}
                                    width="600"
                                    height="600"
                                />
                            </div>
                        </Container>
                    </div>
                )}
                <div className="py-8 single-project-content">
                    <Container className="max-w-4xl">
                        <div>
                            <div className="text-dark dark:text-white" dangerouslySetInnerHTML={{ __html: project.content.rendered }} />
                        </div>
                    </Container>
                </div>
            </>
        );
    } catch (error) {
        console.error(`Page error for slug:`, error);
        return { notFound: true };
    }
}