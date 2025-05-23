// pages/services/[slug].tsx
import { getAllServices, getServiceBySlug, getFeaturedMediaById } from "@/lib/wordpress";
import { Section, Container, Prose } from "@/components/craft";
import { siteConfig } from "@/site.config";
import blobDark from "@/public/blob_inverted.svg";
import type { Metadata } from "next";
import BackButton from "@/components/back";
import Image from "next/image";
import Link from "next/link";

// Revalidate pages every 30 seconds
export const revalidate = 30;

export async function generateStaticParams() {
    try {
        const services = await getAllServices();
        return services.map((service) => ({
            params: { slug: service.slug },
        }));
    } catch (error) {
        console.error("generateStaticParams error:", error);
        return []; // Empty paths with fallback
    }
}

// export async function generateMetadata({
//     params,
// }: {
//     params: Promise<{ slug: string }>;
// }): Promise<Metadata> {
//     try {
//         const { slug } = await params; // Await params to get slug
//         const project = await getProjectBySlug(slug);
//         if (!project) {
//             return {};
//         }

//         const ogUrl = new URL(`${siteConfig.site_domain}/api/og`);
//         ogUrl.searchParams.append("title", project.title.rendered);
//         const description = project.excerpt?.rendered
//             ? project.excerpt.rendered.replace(/<[^>]*>/g, "").trim()
//             : project.content.rendered.replace(/<[^>]*>/g, "").trim().slice(0, 200) + "...";
//         ogUrl.searchParams.append("description", description);

//         return {
//             title: project.title.rendered,
//             description: description,
//             openGraph: {
//                 title: project.title.rendered,
//                 description: description,
//                 type: "article",
//                 url: `${siteConfig.site_domain}/projects/${project.slug}`,
//                 images: [
//                     {
//                         url: ogUrl.toString(),
//                         width: 1200,
//                         height: 630,
//                         alt: project.title.rendered,
//                     },
//                 ],
//             },
//             twitter: {
//                 card: "summary_large_image",
//                 title: project.title.rendered,
//                 description: description,
//                 images: [ogUrl.toString()],
//             },
//         };
//     } catch (error) {
//         console.error(`generateMetadata error for slug:`, error);
//         return {};
//     }
// }

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params; // Await params to get slug
        const service = await getServiceBySlug(slug);
        if (!service) {
            return "Not found";
        }

        const featuredMedia = service.featured_media ? await getFeaturedMediaById(service.featured_media) : null;
        console.log("service", service);

        return (
            <>
                <div className="w-full h-[300px] bg-dark mt-[75px] flex flex-col items-center justify-center gap-4">
                    <h1 className="text-white text-5xl">{service.title.rendered}</h1>
                    <div
                        dangerouslySetInnerHTML={{ __html: service.excerpt.rendered }}
                        className="text-white text-center"
                    />
                    {featuredMedia?.source_url && (
                        <div className="bg-pink p-3 rounded-full mt-4">
                            <Image
                                width="30"
                                height="30"
                                src={featuredMedia.source_url}
                                alt={service.title.rendered}
                                className="Filter invert"
                            />
                        </div>
                    )}
                </div>
                <div className="container grid grid-cols-2 py-8">
                    <div className="single-project-content">
                        <Container className="max-w-4xl">
                            <div>
                                <div
                                    className="text-dark dark:text-white"
                                    dangerouslySetInnerHTML={{ __html: service.content.rendered }}
                                />
                            </div>
                        </Container>
                    </div>
                    <div className="p-6 flex flex-col gap-4 items-center">
                        {service.acf?.image_column.map((image: any, index: any) => {
                            return (
                                <div key={index}>
                                    <Image width={500} height={400} src={image.image.url} alt={image.image.title} />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="relative container w-[60%] mx-auto">
                    {service.acf?.project.image.url && (
                        <div>
                            <Image
                                src={service.acf.project.image.url}
                                alt={service.acf.project.image.alt}
                                className="object-cover w-full rounded-lg"
                                width={400}
                                height={400}
                            />
                        </div>
                    )}
                    <div className="bg-dark w-[80%] rounded-lg mx-auto -mt-20 relative z-[2] px-10 pt-10 pb-8 dark:border">
                        <h3 className="text-3xl text-white font-bold mb-3 pointer-events-none">
                            {service.acf?.project.heading}
                        </h3>
                        <p className="text-white mb-10">{service.acf?.project.text}</p>
                        {service.acf?.project.link && (
                            <Link className="bg-pink text-white py-2 px-4 rounded-lg" href={service.acf?.project.link.url}>
                                {service.acf?.project.link.title}
                            </Link>
                        )}
                    </div>
                </div>
            </>
        );
    } catch (error) {
        console.error(`Page error for slug:`, error);
        return { notFound: true };
    }
}
