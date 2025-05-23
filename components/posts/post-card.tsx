import Image from "next/image";
import Link from "next/link";
import { Post } from "@/lib/wordpress.d";
import { cn } from "@/lib/utils";
import {
    getFeaturedMediaById,
    getAuthorById,
    getCategoryById,
} from "@/lib/wordpress";

export async function PostCard({ post }: { post: Post }) {
    const media = post.featured_media
        ? await getFeaturedMediaById(post.featured_media)
        : null;

    const author = post.author ? await getAuthorById(post.author) : null;

    const date = new Date(post.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const categories = post.categories?.length
        ? await Promise.all(post.categories.map(getCategoryById))
        : [];

    return (
        <Link
            href={`/posts/${post.slug}`}
            className={cn(
                "bg-accent/30 rounded-lg group flex h-full",
                "hover:bg-accent/75 transition-all bg-gray-100 dark:bg-dark dark:border"
            )}
        >
            <div className="flex flex-col w-full relative">
                <div className="h-48 w-full overflow-hidden rounded-md flex items-center justify-center bg-muted">
                    {media?.source_url ? (
                        <Image
                            className="h-full w-full object-cover"
                            src={media.source_url}
                            alt={post.title?.rendered || "Post thumbnail"}
                            width={400}
                            height={200}
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                            No image available
                        </div>
                    )}
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: post.title?.rendered || "Untitled Post",
                        }}
                        className="text-xl text-primary font-medium decoration-muted-foreground underline-offset-4 decoration-dotted transition-all"
                    ></div>

                    {post.excerpt?.rendered && post.excerpt.rendered.trim() !== '' && (
                        <div
                            className="text-sm mb-4"
                            dangerouslySetInnerHTML={{
                                __html: post.excerpt.rendered
                                    .split(" ")
                                    .slice(0, 12)
                                    .join(" ")
                                    .trim() + "...",
                            }}
                        ></div>
                    )}

                    <div className="mt-auto">
                        <hr />
                        <div className="flex justify-between items-center text-xs mt-4">
                            <p>
                                {categories.length > 0
                                    ? categories.map((cat, index) => (
                                          <span key={cat.id}>
                                              {cat.name}
                                              {index < categories.length - 1 && ", "}
                                          </span>
                                      ))
                                    : "Uncategorized"}
                            </p>
                            <p>{date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
