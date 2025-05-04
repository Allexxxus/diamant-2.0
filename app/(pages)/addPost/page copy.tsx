//I need to think about adding new tags
"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { createPost } from '@/utils/actions'
import { NewPost } from '@/types'

// Mock tags data - replace with your actual tag selection logic
const MOCK_TAGS = [
  { id: '1', name: 'Technology' },
  { id: '2', name: 'Programming' },
  { id: '3', name: 'Design' },
]

export default function Page() {
  const router = useRouter()
  const [formData, setFormData] = React.useState<NewPost>({
    title: '',
    tags: []
  })

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, title: e.target.value }))
  }

  const handleTagToggle = (tagId: string) => {
    setFormData(prev => {
      const tagIndex = prev.tags.indexOf(tagId)
      let newTags = [...prev.tags]
      
      if (tagIndex >= 0) {
        // Remove tag if already selected
        newTags.splice(tagIndex, 1)
      } else {
        // Add tag if not selected
        newTags.push(tagId)
      }
      
      return { ...prev, tags: newTags }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return
    
    try {
      await createPost(formData)
      router.push('/')
    } catch (error) {
      console.error('Failed to create post:', error)
      // You might want to add error state and display it to the user
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-zinc-950 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add New Post</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Post Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleTitleChange}
            className="w-full px-3 py-2 border rounded-md dark:bg-zinc-900 dark:border-zinc-700"
            placeholder="Enter post title"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {MOCK_TAGS.map(tag => (
              <button
                key={tag.id}
                type="button"
                onClick={() => handleTagToggle(tag.id)}
                className={`px-3 py-1 text-sm rounded-full border ${
                  formData.tags.includes(tag.id)
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-gray-100 dark:bg-zinc-800 border-gray-300 dark:border-zinc-600'
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            disabled={!formData.title.trim()}
          >
            Submit
          </button>
          
          <button
            type="button"
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white rounded-md transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}