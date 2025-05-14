"use server";
import { createClient } from "@/utils/supabase/server";
import { NewPost, Post, Tag } from "@/types";

// loadPostsByTags calling the PostgreSQL function ////////
///////////////////////////////////////////////////////////

export async function loadPostsByTags(
  selectedTags: string[] | string
): Promise<Post[]> {
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

// add new post ///////////////////////////////////////////
///////////////////////////////////////////////////////////

export async function createPost(newPost: NewPost) {
  console.log("Received newPost:", newPost);

  // Validate input
  if (!newPost || typeof newPost !== 'object') {
    throw new Error("Invalid input: newPost must be an object");
  }

  const { title, tags = [], content } = newPost; // Default to empty array if tags not provided

  const supabase = await createClient();

  // 1. Create the post
  const { data: postData, error: postError } = await supabase
    .from("posts")
    .insert([{ title, content }])
    .select("id")
    .single();

  if (postError) {
    console.error("Error creating post:", postError);
    throw new Error(`Failed to create post: ${postError.message}`);
  }

  if (!postData?.id) {
    console.error("Post created but ID not returned.");
    throw new Error("Post ID not found after creation.");
  }

  const postId = postData.id;
  console.log("Post created successfully with ID:", postId);

  // 2. Handle tags if they exist
  if (tags.length > 0) {
    const postTagsData = tags.map((tagId) => ({
      post_id: postId,
      tag_id: tagId,
    }));

    console.log("Data to insert into post_tags:", postTagsData);

    const { error: postTagError } = await supabase
      .from("post_tags")
      .insert(postTagsData);

    if (postTagError) {
      console.error("Error creating post tag relationships:", postTagError);

      // Clean up by deleting the post
      console.log(`Attempting to delete post ${postId} due to tag insertion failure.`);
      const { error: deleteError } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId);

      if (deleteError) {
        console.error("Failed to delete post after tag insertion error:", deleteError);
        throw new Error(
          `Failed to create post tags (${postTagError.message}). ` +
          `Cleanup also failed (${deleteError.message}).`
        );
      }

      console.log(`Successfully deleted post ${postId} after tag insertion failure.`);
      throw new Error(
        `Failed to create post tag relationships: ${postTagError.message}. ` +
        "The post has been deleted."
      );
    }
    console.log("Post and tag relationships created successfully for post ID:", postId);
  } else {
    console.log("No tags provided, skipping post_tags insertion for post ID:", postId);
  }
}

///////////////////////////////////////////////////////////////////

// export async function createPost(newPost: NewPost) {
//   console.log("Received newPost:", newPost);

//   // Validate input
//   if (!newPost || typeof newPost !== 'object') {
//     throw new Error("Invalid input: newPost must be an object");
//   }

//   const { title, tags = [] } = newPost; // Default to empty array if tags not provided

//   const supabase = await createClient();

//   // 1. Create the post
//   const { data: postData, error: postError } = await supabase
//     .from("posts")
//     .insert([{ title }])
//     .select("id")
//     .single();

//   if (postError) {
//     console.error("Error creating post:", postError);
//     throw new Error(`Failed to create post: ${postError.message}`);
//   }

//   if (!postData?.id) {
//     console.error("Post created but ID not returned.");
//     throw new Error("Post ID not found after creation.");
//   }

//   const postId = postData.id;
//   console.log("Post created successfully with ID:", postId);

//   // 2. Handle tags if they exist
//   if (tags.length > 0) {
//     const postTagsData = tags.map((tagId) => ({
//       post_id: postId,
//       tag_id: tagId,
//     }));

//     console.log("Data to insert into post_tags:", postTagsData);

//     const { error: postTagError } = await supabase
//       .from("post_tags")
//       .insert(postTagsData);

//     if (postTagError) {
//       console.error("Error creating post tag relationships:", postTagError);

//       // Clean up by deleting the post
//       console.log(`Attempting to delete post ${postId} due to tag insertion failure.`);
//       const { error: deleteError } = await supabase
//         .from("posts")
//         .delete()
//         .eq("id", postId);

//       if (deleteError) {
//         console.error("Failed to delete post after tag insertion error:", deleteError);
//         throw new Error(
//           `Failed to create post tags (${postTagError.message}). ` +
//           `Cleanup also failed (${deleteError.message}).`
//         );
//       }

//       console.log(`Successfully deleted post ${postId} after tag insertion failure.`);
//       throw new Error(
//         `Failed to create post tag relationships: ${postTagError.message}. ` +
//         "The post has been deleted."
//       );
//     }
//     console.log("Post and tag relationships created successfully for post ID:", postId);
//   } else {
//     console.log("No tags provided, skipping post_tags insertion for post ID:", postId);
//   }
// }

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
