export interface Blog {
  posts: Post[];
}

export interface Post {
  frontmatter: FrontMatter;
  content: any;
  slug: string;
}

export interface FrontMatter {
  title: string;
  description: string;
  date: string;
  author: string;
}
