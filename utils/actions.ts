"use server";
import { createClient } from "@/utils/supabase/server";

// loadPostsByTags calling the PostgreSQL function ////////
///////////////////////////////////////////////////////////

export async function loadPostsByTags(selectedTags) {
  if (!selectedTags || selectedTags.length === 0) {
    return [];
  }

  try {
    const supabase = await createClient();

    // Call the PostgreSQL function
    const { data, error } = await supabase.rpc(
      "get_posts_by_tags_recursive_and",
      { selected_tag_ids: selectedTags }
    );

    if (error) {
      console.error("Error loading posts by tags:", error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Unexpected error in loadPostsByTags:", err);
    return [];
  }
}

// Example Usage (inside an async function or context):

// async function testLoadPosts() {
//   const exampleTags = [
//     '40d039aa-be4b-45be-9465-57bdf69a54db', // Example Tag ID 1
//     '135c9763-e615-4aa9-9d88-f444e94fcc1f'  // Example Tag ID 2
//   ];
//   const posts = await loadPostsByTags(exampleTags);
//   console.log("Loaded Posts:", posts);

//   const singleTag = ['40d039aa-be4b-45be-9465-57bdf69a54db'];
//   const postsSingle = await loadPostsByTags(singleTag);
//   console.log("Loaded Posts (Single Tag):", postsSingle);

//   const noTags = [];
//   const postsNone = await loadPostsByTags(noTags);
//   console.log("Loaded Posts (No Tags):", postsNone);
// }

// testLoadPosts();

// fetch all tags /////////////////////////////////////////
///////////////////////////////////////////////////////////

export async function loadAllTags() {
  const supabase = await createClient();

  const { data: tags } = await supabase.from("tags").select("id, name");

  return tags;
}

// fetch all posts ////////////////////////////////////////
///////////////////////////////////////////////////////////

export async function loadAllPosts() {
  const supabase = await createClient();

  const { data: postsWithTags } = await supabase.from("posts").select(`
      id,
      title,
      post_tags (
        tags (
          id,
          name
        )
      )
    `);

  if (!postsWithTags) return [];

  return postsWithTags.map((post) => ({
    id: post.id,
    title: post.title,
    tags: post.post_tags.map((pt) => pt.tags),
  }));
}

// to implement filtering by tags there should be a parameter 'filter'
// loadAllPosts('filter': Array)
// if filter array is empty then load all posts
// if filter array has some tags' ids then use these ids to filter posts by

// delete a post //////////////////////////////////////////
///////////////////////////////////////////////////////////

export async function deletePost(postId: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", postId);

  if (error) {
    console.error("Delete error:", error);
    throw error;
  }
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
