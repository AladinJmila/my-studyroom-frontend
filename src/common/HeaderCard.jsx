import { backgroundOpacity } from './../services/stylesService'

const HeaderCard = ({ user, count, outOfCount, item, onClick, showForm }) => {
  return (
    <div style={backgroundOpacity} className='card mb-3 sticky-top'>
      <div className='card-body'>
        <h6 className='float-left'>
          Showing {count}
          {Boolean(outOfCount) && '/' + outOfCount} <b>{item}</b>.
        </h6>
        {user && (
          <button
            onClick={onClick}
            className='btn btn-outline-dark float-right'
          >
            {showForm ? 'Close' : 'Add'}
          </button>
        )}
      </div>
    </div>
  )
}

export default HeaderCard
