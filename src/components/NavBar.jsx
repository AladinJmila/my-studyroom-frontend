import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import NavBarIntervalsCard from '../schedules-app/components/NavBarIntervalsCard'

function NavBar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true)
  const user = useSelector(state => state.auth.user)
  const { playingLoop } = useSelector(state => state.apps.loops)
  const { playingSession } = useSelector(state => state.apps.sessions)
  const nbspName = user?.name.split(' ').map(tag => (
    <>
      <>{tag}</>&nbsp;
    </>
  ))

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed)

  return (
    <div>
      <nav
        className='navbar navbar-expand-lg navbar-dark bg-dark'
        style={{ width: '100%' }}
      >
        <div className='container-fluid d-flex flex-row'>
          <Link className='navbar-brand ' to='/shell'>
            My StudyRoom{' '}
            <small>
              <i>beta</i>
            </small>
          </Link>
          <div className='ms-4 me-4 flex-fill' style={{ width: '50%' }}>
            {playingSession && (
              <NavBarIntervalsCard
                intervals={playingLoop.intervals}
                numOfReps={playingSession.numOfReps}
              />
            )}
          </div>
          <button
            onClick={handleNavCollapse}
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            className={`${isNavCollapsed ? 'collapse' : ''}  navbar-collapse`}
            id='navbarNav'
          >
            <ul className='navbar-nav me-auto'>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/home'>
                  Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/shell'>
                  Work&nbsp;Space
                </NavLink>
              </li>
              {!user && (
                <>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to='/login'>
                      Login
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to='/register'>
                      Register
                    </NavLink>
                  </li>
                </>
              )}
              {user && (
                <>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to='/profile'>
                      {nbspName}
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to='/logout'>
                      Logout
                    </NavLink>
                  </li>
                </>
              )}
              <li className='nav-item'>
                <NavLink className='nav-link' to='/about'>
                  About
                </NavLink>
              </li>
            </ul>
            <form className='d-flex'>
              <input
                className='form-control me-2 ms-2'
                type='search'
                placeholder='Search'
                aria-label='Search'
              />
              <button className='btn btn-outline-success' type='submit'>
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
