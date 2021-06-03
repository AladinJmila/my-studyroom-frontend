import { useState, useEffect } from 'react'
import { getMovies, deleteMovie } from '../../services/fakeMovieService'
// import { getGenres } from '../../services/fakeGenreService'
import MoviesForm from './MoviesForm'
import HeaderCard from '../../common/HeaderCard'
import MoviesCard from './MoviesCard'

const Movies = () => {
  // const [selectedGenre, setSelectedGenre] = useState(null)
  // const [genres, setGenres] = useState([])
  const [movies, setMovies] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    setMovies(getMovies())
  }, [])

  const handleDelete = movie => {
    setMovies(movies.filter(m => m._id !== movie._id))

    deleteMovie(movie._id)
  }

  // const getMovieId = movie => {
  //   return movie
  // }

  const handleStar = movie => {
    const newMovies = [...movies]
    const index = newMovies.indexOf(movie)
    newMovies[index] = { ...movie }
    newMovies[index].starred = !newMovies[index].starred

    setMovies(newMovies)
  }

  const handleShowForm = () => {
    setShowForm(showForm ? false : true)
  }

  // if (movies.length === 0) return <p>There are no movies in the database</p>

  // const flitered =
  //   selectedGenre && selectedGenre._id
  //     ? movies.filter(n => n.genre._id === selectedGenre._id)
  //     : movies

  return (
    <>
      <HeaderCard
        count={movies.length}
        item='Movies'
        onClick={handleShowForm}
        showForm={showForm}
      />
      {showForm && (
        <MoviesForm
          updateMovies={handleShowForm}
          movieId={'5b21ca3eeb7f6fbccd471817'}
        />
      )}
      {movies.map(movie => (
        <MoviesCard
          key={movie._id}
          movie={movie}
          onDelete={handleDelete}
          // onEdit={getMovieId}
          onStar={handleStar}
        />
      ))}
    </>
  )
}

export default Movies
