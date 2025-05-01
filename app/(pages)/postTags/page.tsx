// post_tags table represents connections between posts and tags that they are associated with
import { fetchAllTagPostsRelationsips } from '@/utils/actions'
import React from 'react'

export default async function PostTags() {
    const tagPostRelationships = await fetchAllTagPostsRelationsips()
  return (
    <>
    {
      tagPostRelationships?.map((relationship) => {
        return(
          <div  key={relationship.post_Id}>{relationship.tag_Id}</div>
        )
      })
    }
    </>
  )
}
