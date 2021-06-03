import Star from '../../common/Star'

const MoviesCard = ({ movie, onDelete, onStar, onEdit }) => {
  return (
    <div className='card mb-1'>
      <div className='card-body'>
        <h5 className='card-title'>
          {movie.title}
          <div className='card-link float-right'>
            <i
              onClick={() => onDelete(movie)}
              style={{ cursor: 'pointer' }}
              className='fa fa-times'
              aria-hidden='true'
            ></i>
          </div>
        </h5>

        <h6 className='card-subtitle mb-2 text-muted'>{movie.genre.name}</h6>
        <p className='card-text'>{movie.numberInStock}</p>
        <div className='row'>
          <div className='col'>
            <Star
              className='yellow'
              onStar={() => onStar(movie)}
              starred={movie.starred}
            />
          </div>
          <div className='col'>
            <i
              className='fa fa-pencil'
              style={{ cursor: 'pointer' }}
              aria-hidden='true'
              onClick={() => onEdit(movie)}
            ></i>
          </div>
          <div className='col'>
            <a
              href={movie.dailyRentalRate}
              target='_blank'
              className='card-link float-right'
            >
              <i className='fa fa-external-link' aria-hidden='true'></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoviesCard
