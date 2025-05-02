"use client"
import React from 'react'
import DeleteButton from './DeleteButton'
import { Post } from '@/types';

interface PostsProps {
    posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
    return (
        <div className='mt-2 mx-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2'>
            <button
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors self-start"
            >
                Add Post
            </button>
            {posts?.map((post) => (
                <div key={post.id} className="border p-5 bg-white dark:bg-zinc-950">
                    {post.title}
                    <div className='flex items-center gap-2'>
                        {post.tags.map((tag) => (
                            <div
                                className='bg-gray-300 dark:bg-gray-900 px-1'
                                key={tag.id}
                            >
                                {tag.name}
                            </div>
                        ))}
                    </div>
                    <DeleteButton postId={post.id} />
                </div>
            ))}
        </div>
    );
}