import { getFeaturedMediaById, getAllJobs, getJobBySlug } from "@/lib/wordpress";
import { Section, Container, Prose } from "@/components/craft";
import { siteConfig } from "@/site.config";
import Image from "next/image";

import type { Metadata } from "next";
import BackButton from "@/components/back";
import ApplyButton from "@/components/apply";

// Revalidate pages every hour
export const revalidate = 30;

export async function generateStaticParams() {
    const jobs = await getAllJobs();

    return jobs.map((job) => ({
        slug: job.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const page = await getJobBySlug(slug);

    if (!page) {
        return {};
    }

    const ogUrl = new URL(`${siteConfig.site_domain}/api/og`);
    ogUrl.searchParams.append("title", page.title.rendered);
    // Strip HTML tags for description and limit length
    const description = page.excerpt?.rendered
        ? page.excerpt.rendered.replace(/<[^>]*>/g, "").trim()
        : page.content.rendered
              .replace(/<[^>]*>/g, "")
              .trim()
              .slice(0, 200) + "...";
    ogUrl.searchParams.append("description", description);

    return {
        title: page.title.rendered,
        description: description,
        openGraph: {
            title: page.title.rendered,
            description: description,
            type: "article",
            url: `${siteConfig.site_domain}/pages/${page.slug}`,
            images: [
                {
                    url: ogUrl.toString(),
                    width: 1200,
                    height: 630,
                    alt: page.title.rendered,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: page.title.rendered,
            description: description,
            images: [ogUrl.toString()],
        },
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = await getJobBySlug(slug);

    const featuredMedia = page.featured_media ? await getFeaturedMediaById(page.featured_media) : null;
    console.log("page", page);

    return (
        <Section>
            <Container>
                {featuredMedia && (
                    <Image
                        src={featuredMedia.source_url}
                        alt={page.title.rendered}
                        width={featuredMedia.media_details.width}
                        height={featuredMedia.media_details.height}
                        className="w-full h-[400px] object-cover rounded-lg"
                    />
                )}
                <Prose>
                    <div className="flex justify-between mt-10">
                        <BackButton />
                        <ApplyButton />
                    </div>
                    <h2 className="mt-10">{page.title.rendered}</h2>
                    {/* <h5>Salary: {page.acf?.salary}</h5> */}
                    <h5>Hours: {page.acf?.type}</h5>
                    <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
                </Prose>
            </Container>
        </Section>
    );
}
