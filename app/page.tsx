import { loadAllPosts, loadAllTags, loadPostsByTags } from '@/utils/actions';
import Tags from '@/components/Tags';
import Posts from '@/components/Posts';
import { PageProps, Post, Tag } from '@/types';

export default async function Page({ searchParams }: { searchParams: Promise<{ tag: string[] }> }) {

  const params = await searchParams

  const tags: Tag[] = await loadAllTags();
  let posts: Post[] = [];

  let selectedTags: string[] = []
  if (params.tag === undefined) {
    selectedTags = []
  } else if (typeof params.tag === 'string') {
    selectedTags = [params.tag]
  } else if (Array.isArray(params.tag)) {
    selectedTags = params.tag
  }

  if (selectedTags !== undefined) {
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

///////////////////////////////////////////////////////////

// import { loadAllPosts, loadAllTags, loadPostsByTags } from '@/utils/actions';
// import Tags from '@/components/Tags';
// import Posts from '@/components/Posts';
// import { PageProps, Post, Tag } from '@/types';

// export default async function Page({ searchParams }: { searchParams: Promise<PageProps> }) {

//   const selectedTags = await searchParams;

//   const tags: Tag[] = await loadAllTags();
//   let posts: Post[] = [];

//   if (selectedTags !== undefined) {
//     posts = Array.isArray(selectedTags)
//       ? await loadPostsByTags(selectedTags[0])
//       : await loadPostsByTags(selectedTags.split(','))
//   } else {
//     posts = await loadAllPosts();
//   }

//   return (
//     <div>
//       <Tags tags={tags} />
//       <Posts posts={posts} />
//     </div>
//   );
// }


///////////////////////////////////////////////////////////


// import { loadAllPosts, loadAllTags, loadPostsByTags } from '@/utils/actions';
// import Tags from '@/components/Tags';
// import Posts from '@/components/Posts';
// import { PageProps, Post, Tag } from '@/types';

// export default async function Page({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
//   console.log(typeof searchParams);

//   const { selectedTags } = await searchParams;

//   const tags: Tag[] = await loadAllTags();
//   let posts: Post[] = [];

//   if (selectedTags !== undefined) {
//     posts = Array.isArray(selectedTags)
//       ? await loadPostsByTags(selectedTags[0].split(','))
//       : await loadPostsByTags(selectedTags)
//   } else {
//     posts = await loadAllPosts();
//   }

//   return (
//     <div>
//       <Tags tags={tags} />
//       <Posts posts={posts} />
//     </div>
//   );
// }