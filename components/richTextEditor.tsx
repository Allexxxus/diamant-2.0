'use client'

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'
import './richTextEditorStyles.scss'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, Heading1Icon, Heading2Icon, Heading3Icon, HighlighterIcon, ItalicIcon, PilcrowIcon, StrikethroughIcon } from 'lucide-react'

//////////

interface MenuBarProps {
    editor: Editor | null
}

const MenuBar = ({ editor }: MenuBarProps) => {
    if (!editor) {
        return null
    }

    return (
        <div className="p-2 bg-gray-100 dark:bg-black rounded-lg fixed top-0 z-10">
            <div className="flex flex-row items-center space-x-2">
                <Heading1Icon
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`w-6 h-6 p-1 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 1 }) ? 'is-active bg-gray-300' : ''}`}
                />
                <Heading2Icon
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`w-6 h-6 p-1 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'is-active bg-gray-300' : ''}`}
                />
                <Heading3Icon
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`w-6 h-6 p-1 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 3 }) ? 'is-active bg-gray-300' : ''}`}
                />
                <PilcrowIcon
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={`w-6 h-6 p-1 rounded hover:bg-gray-200 ${editor.isActive('paragraph') ? 'is-active bg-gray-300' : ''}`}
                />
                <BoldIcon
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`w-6 h-6 p-1 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'is-active bg-gray-300' : ''}`}
                />
                <ItalicIcon
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`w-6 h-6 p-1 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'is-active bg-gray-300' : ''}`}
                />
                <StrikethroughIcon
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`w-6 h-6 p-1 rounded hover:bg-gray-200 ${editor.isActive('strike') ? 'is-active bg-gray-300' : ''}`}
                />
                <HighlighterIcon
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                    className={`w-6 h-6 p-1 rounded hover:bg-gray-200 ${editor.isActive('highlight') ? 'is-active bg-gray-300' : ''}`}
                />
                <AlignLeftIcon
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={`w-6 h-6 p-1 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'left' }) ? 'is-active bg-gray-300' : ''}`}
                />
                <AlignCenterIcon
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={`w-6 h-6 p-1 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'center' }) ? 'is-active bg-gray-300' : ''}`}
                />
                <AlignRightIcon
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={`w-6 h-6 p-1 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'right' }) ? 'is-active bg-gray-300' : ''}`}
                />
                <AlignJustifyIcon
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={`w-6 h-6 p-1 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'justify' }) ? 'is-active bg-gray-300' : ''}`}
                />
            </div>
        </div>
    )
}

//////////

const RichTextEditor = () => {
    const [content, setContent] = useState('')
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight.configure({
                HTMLAttributes: {
                    class: 'my-custom-class',
                },
            })
        ],
        content: '<h1>MOBY-DICK;</h1><h1>or, THE WHALE.</h1><h2><mark class="my-custom-class">By Herman Melville</mark></h2><h3><strong>CHAPTER 1. Loomings.</strong></h3><p style="text-align: center">Call me Ishmael. Some years ago—<s>never mind how long precisely</s>—having little or no money in my purse, and <em>nothing particular to interest me on shore</em>, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation.</p><p style="text-align: justify">Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to sea as soon as I can.</p>',
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML())
        },
    })

    const handleLogContent = () => {
        if (!editor) return
        console.log('HTML:', editor.getHTML())
    }

    return (
        <div className="p-4">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="min-h-[200px] border rounded-lg p-4 mt-2" />
            <button 
                onClick={handleLogContent} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Log Content
            </button>
        </div>
    )
}

export default RichTextEditor