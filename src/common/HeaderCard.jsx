import { backgroundOpacity } from './../services/stylesService'

const HeaderCard = ({ user, count, item, onClick, showForm }) => {
  return (
    // sticky-top
    <div style={backgroundOpacity} className='card mb-3'>
      <div className='card-body'>
        <h6 className='float-left'>
          Showing {count}
          <b>{item}</b>
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
