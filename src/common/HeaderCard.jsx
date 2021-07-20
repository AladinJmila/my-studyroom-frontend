import { headersStyle } from './../services/stylesService'

const HeaderCard = ({
  user,
  count,
  item,
  onClick,
  showForm,
  onYoutubeClick,
  showYoutubeForm,
  youtube,
}) => {
  return (
    <div
      style={headersStyle}
      className='d-flex flex-row justify-content-between sticky-top'
    >
      <h6 className='p-2'>
        Showing {count} <b>{' ' + item}</b>
      </h6>
      <div>
        {user && youtube && (
          <button
            onClick={onYoutubeClick}
            className=' p-2 me-4 btn btn-outline-dark'
          >
            {showYoutubeForm ? 'Close' : 'YouTube'}
          </button>
        )}
        {user && (
          <button onClick={onClick} className=' p-2 btn btn-outline-dark'>
            {showForm ? 'Close' : 'Add'}
          </button>
        )}
      </div>
    </div>
  )
}

export default HeaderCard
