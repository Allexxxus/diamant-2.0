// types/index.ts
export interface Tag {
    id: string;
    name: string;
  }
  
  interface BasePost {
    title: string;
    tags: Tag[];
  }
  
  export interface Post extends BasePost {
    id: string; // Only Post has an id
  }
  
  export interface NewPost extends BasePost {
    // NewPost doesn't have an id
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