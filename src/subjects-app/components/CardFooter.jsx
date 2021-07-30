import Upvote from '../../common/Upvote'
import { Link } from 'react-router-dom'

const CardFooter = ({ user, subject, onToggleUpvote }) => {
  return (
    <div className='mt-3 d-flex flex-row justify-content-between'>
      <div>
        {!user || user._id !== subject.creatorId ? (
          <Link
            to={`/profile/${subject.creatorName}/${subject.creatorId}`}
            className='card-link'
          >
            {subject.creatorName}
          </Link>
        ) : (
          ''
        )}
      </div>
      <div className='pb-0 mb-0'>
        <h6 className='me-2 mb-0 ' style={{ display: 'inline-block' }}>
          {subject.upvotes.length || 0}
        </h6>
        <Upvote user={user} item={subject} onToggleUpvote={onToggleUpvote} />
      </div>
    </div>
  )
}

export default CardFooter
