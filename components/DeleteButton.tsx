'use client'
import { deletePost } from "@/utils/actions";
import { Trash2Icon } from "lucide-react";

export default function DeleteButton({ postId }: { postId: string }) {
  async function handleDelete() {
    await deletePost(postId);
  }

  return (
    <Trash2Icon onClick={handleDelete} className="p-1 text-gray-500 cursor-pointer hover:text-red-500" />
  );
}