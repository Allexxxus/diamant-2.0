//tags relatinship table represents hierarchical structure of tags and may be used
//-when building a tree of tags
//-when fetching a post with certain tag in a way that posts with children tags are fetched to

import { fetchAllTagsRelationships } from '@/utils/actions';

export default async function Tags() {
    const TagsRelationships = await fetchAllTagsRelationships()

    return (
            <pre>{JSON.stringify(TagsRelationships, null, 2)}</pre>
    )
}


