//Page.tsx
"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPost } from '@/utils/actions'
import { NewPost } from '@/types'
import RichTextEditor from '@/components/richTextEditor'

export default function Page() {
  const router = useRouter()
  const [editorContent, setEditorContent] = useState('')

  function getTitle(htmlString: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    return tempDiv.firstElementChild?.textContent || '';
  }

  const handleContentChange = (content: string) => {
    setEditorContent(content)
  }

  const handleLogContent = async () => {
    const newPost: NewPost = {
      content: editorContent,
      tags: [],
      title: getTitle(editorContent)
    }
    console.log(newPost)
    await createPost(newPost)
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (!newPost.title.trim()) return

  //   try {
  //     await createPost(newPost)
  //     router.push('/')
  //   } catch (error) {
  //     console.error('Failed to create post:', error)
  //   }
  // }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <RichTextEditor
        content={editorContent}
        onContentChange={handleContentChange}
      />
      <div className="mt-4">
        <button
          onClick={handleLogContent}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add post
        </button>
      </div>
    </div>
  )
}
// //////////////////////////////////////////////////////////////////////3
// //////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////

// //Page.tsx
// "use client"

// import React, { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { createPost } from '@/utils/actions'
// import { NewPost } from '@/types'
// import RichTextEditor from '@/components/richTextEditor'

// export default function Page() {
//   const router = useRouter()
//   const [tags, setTags] = useState()
//   const [content, setContent] = useState()

//   const [newPost, setNewPost] = React.useState<NewPost>({
//     title: '',
//     tags: [],
//     content: ''
//   })

//   function getTitle(htmlString: string) {
//     const tempDiv = document.createElement('div');
//     tempDiv.innerHTML = htmlString;

//     const firstElement = tempDiv.firstElementChild;

//     if (!firstElement) {
//       return null;
//     }
//     return firstElement.textContent;
//   }

//   const handleContentChange = (content: string) => {
//     setNewPost(prev => ({
//       ...prev,
//       content,
//       title: getTitle(content) || prev.title // Update title from content, fallback to previous title
//     }))
//   }

//   const handleLogContent = () => {
//     console.log(newPost)
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!newPost.title.trim()) return

//     try {
//       await createPost(newPost)
//       router.push('/')
//     } catch (error) {
//       console.error('Failed to create post:', error)
//     }
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <RichTextEditor
//         content={newPost.content}
//         onContentChange={handleContentChange}
//       />
//       <div className="mt-4">
//         <button
//           onClick={handleLogContent}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Log Content
//         </button>
//       </div>
//     </div>
//   )
// }

//////////////////////////////////////////////////////////////////////2
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// //Page.tsx
// "use client"

// import React from 'react'
// import { useRouter } from 'next/navigation'
// import { createPost } from '@/utils/actions'
// import { NewPost } from '@/types'
// import RichTextEditor from '@/components/richTextEditor'

// export default function Page() {
//   const router = useRouter()
//   const [newPost, setNewPost] = React.useState<NewPost>({
//     title: '',
//     tags: [],
//     content: ''
//   })

//   function getTitle(htmlString: string) {
//     const tempDiv = document.createElement('div');
//     tempDiv.innerHTML = htmlString;

//     const firstElement = tempDiv.firstElementChild;

//     if (!firstElement) {
//       return null;
//     }
//     return firstElement.textContent;
//   }

//   const handleContentChange = (content: string) => {
//     setNewPost(prev => ({
//       ...prev,
//       content,
//       title: getTitle(content) || prev.title // Update title from content, fallback to previous title
//     }))
//   }

//   const handleLogContent = () => {
//     console.log(newPost)
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!newPost.title.trim()) return

//     try {
//       await createPost(newPost)
//       router.push('/')
//     } catch (error) {
//       console.error('Failed to create post:', error)
//     }
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <RichTextEditor
//         content={newPost.content}
//         onContentChange={handleContentChange}
//       />
//       <div className="mt-4">
//         <button
//           onClick={handleLogContent}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Log Content
//         </button>
//       </div>
//     </div>
//   )
// }

// //////////////////////////////////////////////////////////////////////1
// //////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////

// //I need to think about adding new tags
// "use client"

// import React from 'react'
// import { useRouter } from 'next/navigation'
// import { createPost } from '@/utils/actions'
// import { NewPost } from '@/types'
// import RichTextEditor from '@/components/richTextEditor'

// // Mock tags data - replace with your actual tag selection logic
// const MOCK_TAGS = [
//   { id: '1', name: 'Technology' },
//   { id: '2', name: 'Programming' },
//   { id: '3', name: 'Design' },
// ]

// export default function Page() {
//   const router = useRouter()
//   const [formData, setFormData] = React.useState<NewPost>({
//     title: '',
//     tags: []
//   })

//   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prev => ({ ...prev, title: e.target.value }))
//   }

//   const handleTagToggle = (tagId: string) => {
//     setFormData(prev => {
//       const tagIndex = prev.tags.indexOf(tagId)
//       let newTags = [...prev.tags]

//       if (tagIndex >= 0) {
//         // Remove tag if already selected
//         newTags.splice(tagIndex, 1)
//       } else {
//         // Add tag if not selected
//         newTags.push(tagId)
//       }

//       return { ...prev, tags: newTags }
//     })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!formData.title.trim()) return

//     try {
//       await createPost(formData)
//       router.push('/')
//     } catch (error) {
//       console.error('Failed to create post:', error)
//       // You might want to add error state and display it to the user
//     }
//   }

//   return (
//     <div>
//       <RichTextEditor />
//     </div>
//   )
// }