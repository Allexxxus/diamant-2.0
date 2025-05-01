import { loadAllPosts, loadAllTags, loadPostsByTags } from '@/utils/actions';
import Tags from '@/components/Tags';
import Posts from '@/components/Posts';
import { PageProps, Post, Tag } from '@/types';

export default async function Home({ searchParams }: { searchParams: Promise<{ selectedTags: string }> }) {

  const params = await searchParams
  const tags: Tag[] = await loadAllTags();
  let posts: Post[] = [];

  let selectedTags: string[] = []
  if (params.selectedTags === undefined) {
    selectedTags = []
  } else {
    selectedTags = params.selectedTags.split(',')
  }

  if (selectedTags.length > 0) {
    posts = await loadPostsByTags(selectedTags)
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