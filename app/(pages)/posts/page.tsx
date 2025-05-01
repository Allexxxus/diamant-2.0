// app/posts/page.tsx
import { loadAllPosts } from '@/utils/actions';
import DeleteButton from '@/components/DeleteButton';
// import DeleteButton from '@/app/components/deleteButton';

export default async function Posts() {
  const posts = await loadAllPosts();

  return (
    <>
      {posts?.map((post) => (
        <div key={post.id}>
          {post.title}
          <DeleteButton postId={post.id} /> {/* Client component */}
        </div>
      ))}
    </>
  );
}