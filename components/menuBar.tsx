import { Editor } from '@tiptap/react'
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, Heading1Icon, Heading2Icon, Heading3Icon, HighlighterIcon, ItalicIcon, PilcrowIcon, StrikethroughIcon } from 'lucide-react'

interface MenuBarProps {
    editor: Editor | null
}

const MenuBar = ({ editor }: MenuBarProps) => {
    if (!editor) {
        return null
    }

    return (
        <div className="w-full p-2 bg-gray-100 border-b dark:bg-black fixed top-0 left-0 z-10">
            <div className="max-w-4xl mx-auto flex flex-row items-center space-x-2">
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

export default MenuBar