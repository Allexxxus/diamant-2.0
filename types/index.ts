// types/index.ts
export interface Tag {
  id: string;
  name: string;
}

export interface Post {
  title: string;
  tags: Tag[];
  id: string;
}

export interface NewPost {
  title: string;
  tags: string[];
  content: string
}

export interface PageProps {
  selectedTags?: string;
}

export interface PostsProps {
  posts: Post[];
}

export interface TagsProps {
  tags: Tag[];
}