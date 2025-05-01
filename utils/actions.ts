"use server";
import { createClient } from "@/utils/supabase/server";
import { Post, Tag } from "@/types";

// loadPostsByTags calling the PostgreSQL function ////////
///////////////////////////////////////////////////////////

export async function loadPostsByTags(selectedTags: string[]): Promise<Post[]> {
  if (!selectedTags || selectedTags.length === 0) {
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc(
      "get_posts_by_tags_recursive_and",
      { selected_tag_ids: selectedTags }
    );

    if (error) {
      console.error("Error loading posts by tags:", error.message);
      return [];
    }

    return (data as Post[]) || [];
  } catch (err) {
    console.error("Unexpected error in loadPostsByTags:", err);
    return [];
  }
}

// fetch all tags /////////////////////////////////////////
///////////////////////////////////////////////////////////

export async function loadAllTags(): Promise<Tag[]> {
  const supabase = await createClient();
  const { data: tags } = await supabase.from("tags").select("id, name");
  return tags || [];
}

// fetch all posts ////////////////////////////////////////
///////////////////////////////////////////////////////////

export async function loadAllPosts(): Promise<Post[]> {
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
    tags: post.post_tags.map((pt: any) => pt.tags),
  }));
}

// delete a post //////////////////////////////////////////
///////////////////////////////////////////////////////////

export async function deletePost(postId: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", postId);

  if (error) {
    console.error("Delete error:", error);
    throw error;
  }
}
