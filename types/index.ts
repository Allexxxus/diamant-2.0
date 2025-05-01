// types/index.ts
export interface Tag {
    id: string;
    name: string;
  }
  
  export interface Post {
    id: string;
    title: string;
    tags: Tag[];
  }
  
  export interface PageProps {
    searchParams: {
      selectedTags?: string;
    };
  }
  
  export interface PostsProps {
    posts: Post[];
  }
  
  export interface TagsProps {
    tags: Tag[];
  }