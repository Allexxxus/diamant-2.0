import { loadAllPosts, loadAllTags, loadPostsByTags } from '@/utils/actions';
import Tags from '@/components/Tags';
import Posts from '@/components/Posts';
import { PageProps, Post, Tag } from '@/types';

export default async function Page({ searchParams }: PageProps) {
  const { selectedTags } = await searchParams;

  const tags: Tag[] = await loadAllTags();
  let posts: Post[] = [];
  
  if (selectedTags !== undefined) {
    posts = await loadPostsByTags(selectedTags.split(','));
  } else {
    posts = await loadAllPosts();
  }

  return (
    <div>
      <Tags tags={tags} />
      <Posts posts={posts} />
    </div>
  );
}