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
    id: string;
  }
  
  export interface NewPost extends BasePost {
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