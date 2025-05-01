"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Tag } from '@/types';

interface TagsProps {
  tags: Tag[];
}

export default function Tags({ tags }: TagsProps) {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleFilter = async () => {
    if(selectedTags.length > 0) {
        router.push(`/?selectedTags=${selectedTags.join(',')}`);
    }
    else {
        router.push('/');
    }
  };

  return (
    <div className="flex flex-col gap-3"> 
      <div className="flex flex-wrap gap-2">
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
  );
}