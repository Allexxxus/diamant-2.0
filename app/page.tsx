import { loadAllPosts, loadAllTags, loadPostsByTags } from '@/utils/actions';
import Tags from '@/components/Tags';
import Posts from '@/components/Posts';

export default async function Page({ searchParams }) {
  const { selectedTags } = await searchParams

  const tags = await loadAllTags();
  let posts = []
  if (selectedTags !== undefined) {
    posts = await loadPostsByTags(selectedTags.split(','))
  }
  else {
    posts = await loadAllPosts();
  }


  return (
    <div>
      <Tags tags={tags} />
      <Posts posts={posts} />
    </div>
  );
}