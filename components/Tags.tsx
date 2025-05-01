"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

interface Tag {
    id: string;
    name: string;
}

interface TagsProps {
    tags: Tag[];
}

export default function Tags({ tags }: TagsProps) {
    const router = useRouter();
    const [selectedTags, setSelectedTags] = useState<(string | number)[]>([])

    const toggleTag = (tagId: string | number) => {
        setSelectedTags(prev =>
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        )
    }

    const handleFilter = async () => {
        router.push(`/?selectedTags=${selectedTags.join(',')}`)
    }

    return (
<div className="flex flex-col gap-3"> {/* Main container with vertical spacing */}
    <div className="flex flex-wrap gap-2"> {/* Tags container that wraps to multiple lines */}
        {tags.map((tag) => {
            const isSelected = selectedTags.includes(tag.id);
            return (
                <div
                    onClick={() => toggleTag(tag.id)}
                    className={`px-3 py-1 rounded-md cursor-pointer transition-colors whitespace-nowrap ${
                        isSelected
                            ? 'bg-gray-400 dark:bg-gray-300 text-gray-900'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                    key={tag.id}
                >
                    {tag.name}
                </div>
            );
        })}
    </div>
    <button 
        onClick={handleFilter} 
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors self-start"
    >
        Filter
    </button>
</div>
    )
}
