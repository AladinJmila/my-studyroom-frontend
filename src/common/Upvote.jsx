import { useState } from 'react'

const Upvote = ({ user, item, onToggleUpvote }) => {
  const isUpvoted = item.upvotes.find(userId => userId === user?._id)
  const [upvote, setUpvote] = useState(isUpvoted)

  const handleUpvote = () => {
    onToggleUpvote(item, !upvote)
    setUpvote(upvote ? false : true)
  }

  const upvoteClass = isUpvoted
    ? 'fa fa-lg fa-thumbs-up me-1 mt-1 float-end'
    : 'fa fa-lg fa-thumbs-o-up me-1 mt-1 float-end'
  const upvoteStyle =
    isUpvoted || user ? { cursor: 'pointer' } : { color: 'grey' }

  return (
    <i
      onClick={handleUpvote}
      className={upvoteClass}
      style={upvoteStyle}
      aria-hidden='true'
    ></i>
  )
}

export default Upvote
