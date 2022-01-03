export const FetchMyReviewsBodyTag = "fetchMyReviews"

export const FetchMyReviewsBody = (_id: string) => ({
  query: `{
    fetchMyReviews(_id: "${_id}") {
      _id
      reviewed_by
      reviewed_to
      reviewed_by_type
      reviewed_to_type
      review_content
      createdAt
      updatedAt
    }
}`
})