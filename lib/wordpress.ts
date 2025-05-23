// Description: WordPress API functions
// Used to fetch data from a WordPress site using the WordPress REST API
// Types are imported from `wp.d.ts`

import querystring from "query-string";
import type {
  Post,
  Category,
  Tag,
  Page,
  Author,
  FeaturedMedia,
  Project,
} from "./wordpress.d";

interface Media {
  source_url: string;
  media_details?: {
    width?: number;
    height?: number;
  };
}

const baseUrl = process.env.WORDPRESS_URL;

if (!baseUrl) {
  throw new Error("WORDPRESS_URL environment variable is not defined");
}

function getUrl(path: string, query?: Record<string, any>) {
  const params = query ? querystring.stringify(query) : null;
  return `${baseUrl}${path}${params ? `?${params}` : ""}`;
}

class WordPressAPIError extends Error {
  constructor(message: string, public status: number, public endpoint: string) {
    super(message);
    this.name = "WordPressAPIError";
  }
}


async function wordpressFetch<T>(url: string): Promise<T> {
  const userAgent = "Next.js WordPress Client";
  const maxRetries = 3;
  const timeout = 60000; // 60 seconds

  for (let i = 1; i <= maxRetries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      const response = await fetch(url, {
        headers: {
          "User-Agent": userAgent,
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new WordPressAPIError(
          `WordPress API request failed: ${response.statusText}`,
          response.status,
          url
        );
      }

      return response.json();
    } catch (error) {
      if (i === maxRetries) {
        // console.error(`Fetch failed after ${maxRetries} attempts: ${url} - ${error.message}`);
        throw error;
      }
      // console.warn(`Attempt ${i} failed: ${url} - ${error.message}. Retrying...`);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
    }
  }
  throw new Error('Unexpected fetch error');
}

// WordPress Functions

export async function getAllPosts(filterParams?: {
  author?: string;
  tag?: string;
  category?: string;
  search?: string;
}): Promise<Post[]> {
  const query: Record<string, any> = {
    _embed: true,
    per_page: 100,
  };

  if (filterParams?.search) {
    query.search = filterParams.search;

    if (filterParams?.author) {
      query.author = filterParams.author;
    }
    if (filterParams?.tag) {
      query.tags = filterParams.tag;
    }
    if (filterParams?.category) {
      query.categories = filterParams.category;
    }
  } else {
    if (filterParams?.author) {
      query.author = filterParams.author;
    }
    if (filterParams?.tag) {
      query.tags = filterParams.tag;
    }
    if (filterParams?.category) {
      query.categories = filterParams.category;
    }
  }

  const url = getUrl("/wp-json/wp/v2/posts", query);
  return wordpressFetch<Post[]>(url);
}

export async function getPostById(id: number): Promise<Post> {
  const url = getUrl(`/wp-json/wp/v2/posts/${id}`);
  return wordpressFetch<Post>(url);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const url = getUrl("/wp-json/wp/v2/posts", { slug });
  const response = await wordpressFetch<Post[]>(url);
  return response[0];
}

export async function getAllCategories(): Promise<Category[]> {
  const url = getUrl("/wp-json/wp/v2/categories", { per_page: 100 });
  const categories = await wordpressFetch<Category[]>(url);

  // Filter out the 'Uncategorized' category
  return categories.filter(category =>
    category.name !== 'Uncategorized' &&
    category.slug !== 'uncategorized'
  );
}

export async function getCategoryById(id: number): Promise<Category> {
  const url = getUrl(`/wp-json/wp/v2/categories/${id}`);
  return wordpressFetch<Category>(url);
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  const url = getUrl("/wp-json/wp/v2/categories", { slug });
  const response = await wordpressFetch<Category[]>(url);
  return response[0];
}

export async function getPostsByCategory(categoryId: number): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { categories: categoryId });
  return wordpressFetch<Post[]>(url);
}


export async function getPostsByTag(tagId: number): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { tags: tagId });
  return wordpressFetch<Post[]>(url);
}

export async function getTagsByPost(postId: number): Promise<Tag[]> {
  const url = getUrl("/wp-json/wp/v2/tags", { post: postId });
  return wordpressFetch<Tag[]>(url);
}

export async function getAllTags(): Promise<Tag[]> {
  const url = getUrl("/wp-json/wp/v2/tags");
  return wordpressFetch<Tag[]>(url);
}

export async function getTagById(id: number): Promise<Tag> {
  const url = getUrl(`/wp-json/wp/v2/tags/${id}`);
  return wordpressFetch<Tag>(url);
}

export async function getTagBySlug(slug: string): Promise<Tag> {
  const url = getUrl("/wp-json/wp/v2/tags", { slug });
  const response = await wordpressFetch<Tag[]>(url);
  return response[0];
}

export async function getAllJobs(): Promise<Page[]> {
  const url = getUrl("/wp-json/wp/v2/jobs");
  const response = await wordpressFetch<Page[]>(url);

  return response;
}

export async function getAllProjects(): Promise<Project[]> {
  const url = getUrl("/wp-json/wp/v2/projects?_embed=true");
  const response = await wordpressFetch<Project[]>(url); // Note: changed from Page[] to Project[]

  // Fetch all categories first
  const categoriesUrl = getUrl("/wp-json/wp/v2/categories");
  const categoriesResponse = await wordpressFetch<Category[]>(categoriesUrl); // Use Category[] here

  // Create a map of category id to category name
  const categoriesMap = categoriesResponse.reduce((map, category) => {
    map[category.id] = category.name;
    return map;
  }, {} as Record<number, string>); // Add type annotation

  const projectsWithMedia = response.map(project => {
    let featured_media_url = '';
    let featured_media_width = 800;
    let featured_media_height = 600;

    if (project._embedded &&
      project._embedded['wp:featuredmedia'] &&
      project._embedded['wp:featuredmedia'][0]) {
      const media = project._embedded['wp:featuredmedia'][0];
      featured_media_url = media.source_url;
      featured_media_width = media.media_details?.width || 800;
      featured_media_height = media.media_details?.height || 600;
    }

    // Add category names to the project
    const categoryNames = project.categories ?
      project.categories.map(catId => categoriesMap[catId] || '') :
      [];

    return {
      ...project,
      featured_media_url,
      featured_media_width,
      featured_media_height,
      categoryNames // Add this new property
    };
  });

  return projectsWithMedia; // This now matches your Project[] return type
}


export async function getAllServices(): Promise<Project[]> {
  const url = getUrl("/wp-json/wp/v2/services?_embed=true");
  const response = await wordpressFetch<Project[]>(url); // Note: changed from Page[] to Project[]

  // Fetch all categories first
  const categoriesUrl = getUrl("/wp-json/wp/v2/categories");
  const categoriesResponse = await wordpressFetch<Category[]>(categoriesUrl); // Use Category[] here

  // Create a map of category id to category name
  const categoriesMap = categoriesResponse.reduce((map, category) => {
    map[category.id] = category.name;
    return map;
  }, {} as Record<number, string>); // Add type annotation

  const projectsWithMedia = response.map(project => {
    let featured_media_url = '';
    let featured_media_width = 800;
    let featured_media_height = 600;

    if (project._embedded &&
      project._embedded['wp:featuredmedia'] &&
      project._embedded['wp:featuredmedia'][0]) {
      const media = project._embedded['wp:featuredmedia'][0];
      featured_media_url = media.source_url;
      featured_media_width = media.media_details?.width || 800;
      featured_media_height = media.media_details?.height || 600;
    }

    // Add category names to the project
    const categoryNames = project.categories ?
      project.categories.map(catId => categoriesMap[catId] || '') :
      [];

    return {
      ...project,
      featured_media_url,
      featured_media_width,
      featured_media_height,
      categoryNames // Add this new property
    };
  });

  return projectsWithMedia; // This now matches your Project[] return type
}

export async function getLatestProjects(limit: number = 2): Promise<Page[]> {
  const url = getUrl(`/wp-json/wp/v2/projects?per_page=${limit}&orderby=date&order=desc&_embed=true`);
  const response = await wordpressFetch<Page[]>(url);

  const projectsWithMedia = await Promise.all(
    response.map(async (project) => {
      if (project._embedded && project._embedded['wp:featuredmedia'] && project._embedded['wp:featuredmedia'][0]) {
        const media = project._embedded['wp:featuredmedia'][0];
        return {
          ...project,
          featured_media_url: media.source_url,
          featured_media_width: media.media_details?.width || 800,
          featured_media_height: media.media_details?.height || 600
        };
      } else if (project.featured_media) {
        try {
          const mediaUrl = getUrl(`/wp-json/wp/v2/media/${project.featured_media}`);
          const mediaResponse = await wordpressFetch<Media>(mediaUrl);
          return {
            ...project,
            featured_media_url: mediaResponse.source_url,
            featured_media_width: mediaResponse.media_details?.width || 800,
            featured_media_height: mediaResponse.media_details?.height || 600
          };
        } catch (error) {
          console.error(`Error fetching media for project ${project.id}:`, error);
          return project;
        }
      }

      return project;
    })
  );

  return projectsWithMedia;
}

export async function getPartnerBySlug(slug: string): Promise<Page> {
  const url = getUrl("/wp-json/wp/v2/partners", { slug });
  const response = await wordpressFetch<Page[]>(url);
  return response[0];
}


export async function getAllPartners(): Promise<Page[]> {
  const url = getUrl("/wp-json/wp/v2/partners?_embed=true");
  const response = await wordpressFetch<Page[]>(url); // Using Partner[] type
  
  const partnersWithMedia = response.map(partner => {
    let featured_media_url = '';
    let featured_media_width = 800;
    let featured_media_height = 600;
    
    if (partner._embedded &&
        partner._embedded['wp:featuredmedia'] &&
        partner._embedded['wp:featuredmedia'][0]) {
      const media = partner._embedded['wp:featuredmedia'][0];
      featured_media_url = media.source_url;
      featured_media_width = media.media_details?.width || 800;
      featured_media_height = media.media_details?.height || 600;
    }
      
    return {
      ...partner,
      featured_media_url,
      featured_media_width,
      featured_media_height
    };
  });
  
  return partnersWithMedia;
}


export async function getJobBySlug(slug: string): Promise<Page> {
  const url = getUrl("/wp-json/wp/v2/jobs", { slug });
  const response = await wordpressFetch<Page[]>(url);

  return response[0];
}

export async function getProjectBySlug(slug: string): Promise<Page> {
  const url = getUrl("/wp-json/wp/v2/projects", { slug });
  const response = await wordpressFetch<Page[]>(url);

  return response[0];
}

export async function getServiceBySlug(slug: string): Promise<Page> {
  const url = getUrl("/wp-json/wp/v2/services", { slug });
  const response = await wordpressFetch<Page[]>(url);

  return response[0];
}

export async function getAllPages(): Promise<Page[]> {
  const url = getUrl("/wp-json/wp/v2/pages");
  return wordpressFetch<Page[]>(url);
}

export async function getPageById(id: number): Promise<Page> {
  const url = getUrl(`/wp-json/wp/v2/pages/${id}`);
  return wordpressFetch<Page>(url);
}

export async function getPageBySlug(slug: string): Promise<Page> {
  const url = getUrl("/wp-json/wp/v2/pages", { slug });
  const response = await wordpressFetch<Page[]>(url);
  return response[0];
}

export async function getAllAuthors(): Promise<Author[]> {
  const url = getUrl("/wp-json/wp/v2/users");
  return wordpressFetch<Author[]>(url);
}

export async function getAuthorById(id: number): Promise<Author> {
  const url = getUrl(`/wp-json/wp/v2/users/${id}`);
  return wordpressFetch<Author>(url);
}

export async function getAuthorBySlug(slug: string): Promise<Author> {
  const url = getUrl("/wp-json/wp/v2/users", { slug });
  const response = await wordpressFetch<Author[]>(url);
  return response[0];
}

export async function getPostsByAuthor(authorId: number): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { author: authorId });
  return wordpressFetch<Post[]>(url);
}

export async function getPostsByAuthorSlug(
  authorSlug: string
): Promise<Post[]> {
  const author = await getAuthorBySlug(authorSlug);
  const url = getUrl("/wp-json/wp/v2/posts", { author: author.id });
  return wordpressFetch<Post[]>(url);
}

export async function getPostsByCategorySlug(
  categorySlug: string
): Promise<Post[]> {
  const category = await getCategoryBySlug(categorySlug);
  const url = getUrl("/wp-json/wp/v2/posts", { categories: category.id });
  return wordpressFetch<Post[]>(url);
}

export async function getPostsByTagSlug(tagSlug: string): Promise<Post[]> {
  const tag = await getTagBySlug(tagSlug);
  const url = getUrl("/wp-json/wp/v2/posts", { tags: tag.id });
  return wordpressFetch<Post[]>(url);
}

export async function getFeaturedMediaById(id: number): Promise<FeaturedMedia> {
  const url = getUrl(`/wp-json/wp/v2/media/${id}`);
  return wordpressFetch<FeaturedMedia>(url);
}

export async function searchCategories(query: string): Promise<Category[]> {
  const url = getUrl("/wp-json/wp/v2/categories", {
    search: query,
    per_page: 100,
  });
  return wordpressFetch<Category[]>(url);
}

export async function searchTags(query: string): Promise<Tag[]> {
  const url = getUrl("/wp-json/wp/v2/tags", {
    search: query,
    per_page: 100,
  });
  return wordpressFetch<Tag[]>(url);
}

export async function searchAuthors(query: string): Promise<Author[]> {
  const url = getUrl("/wp-json/wp/v2/users", {
    search: query,
    per_page: 100,
  });
  return wordpressFetch<Author[]>(url);
}

export { WordPressAPIError };
