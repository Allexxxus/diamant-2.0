//richTextEditor.tsx
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState, useRef, useEffect } from 'react'
import './richTextEditorStyles.scss'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import MenuBar from './menuBar'
import Placeholder from '@tiptap/extension-placeholder'

interface RichTextEditorProps {
    content: string
    onContentChange: (content: string) => void
}

const RichTextEditor = ({ content, onContentChange }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight.configure({}),
            Placeholder.configure({placeholder: 'Write your post here...'})
        ],
        immediatelyRender: false,
        // content: content || '<h3 style={{color: "red"}}>Write your post here...</h3>',
        content: content,
        onUpdate: ({ editor }) => {
            onContentChange(editor.getHTML())
        },
    })

    const editorContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = () => {
            if (editor && !editor.isDestroyed) {
                editor.commands.focus()
            }
        }

        const container = editorContainerRef.current
        if (container) {
            container.addEventListener('click', handleClick)
        }

        return () => {
            if (container) {
                container.removeEventListener('click', handleClick)
            }
        }
    }, [editor])

    return (
        <div>
            <MenuBar editor={editor} />
            <div
                ref={editorContainerRef}
                className="w-screen md:w-[48rem] mx-auto p-2 cursor-text"
            >
                <EditorContent
                    editor={editor}
                    className="min-h-[200px] bg-white p-4 border rounded"
                />
            </div>
        </div>
    )
}
export default RichTextEditor