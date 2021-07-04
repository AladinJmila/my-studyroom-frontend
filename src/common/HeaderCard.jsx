import { headersStyle } from './../services/stylesService'

const HeaderCard = ({ user, count, item, onClick, showForm }) => {
  return (
    <div
      style={headersStyle}
      className='d-flex flex-row justify-content-between sticky-top'
    >
      <h6 className='p-2'>
        Showing {count} <b>{' ' + item}</b>
      </h6>
      {user && (
        <button onClick={onClick} className=' p-2 btn btn-outline-dark'>
          {showForm ? 'Close' : 'Add'}
        </button>
      )}
    </div>
  )
}

export default HeaderCard
