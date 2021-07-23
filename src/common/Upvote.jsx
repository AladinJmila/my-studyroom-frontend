import { useState } from 'react'

const Upvote = ({ user, item, onToggleUpvote }) => {
  const [upvote, setUpvote] = useState(false)

  const handleUpvote = () => {
    onToggleUpvote(item, !upvote)
    setUpvote(upvote ? false : true)
  }

  const isUpvoted = item.upvotes.find(userId => userId === user?._id)

  const upvoteClass = isUpvoted
    ? 'fa fa-lg fa-thumbs-up me-1 float-end'
    : 'fa fa-lg fa-thumbs-o-up me-1 float-end'
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
