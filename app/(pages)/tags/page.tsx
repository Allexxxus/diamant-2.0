import { loadAllTags } from '@/utils/actions';

export default async function Tags() {
    const tags = await loadAllTags()

    return (
        <>
            {
                tags!.map((tag) => {
                    return (
                        <div key={tag.id}>{tag.name}</div>
                    )
                })
            }
        </>
    )
}


