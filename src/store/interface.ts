export interface PostType {
    article_id: string,
    title: string;
    description: string;
    image_url: string;
    source_icon: string;
    pubDate: string;
    source_name: string;
    category: string[],
    creator: string[] | null,
    link: string
}