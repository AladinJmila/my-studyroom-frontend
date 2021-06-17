import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function NavBar() {
  const user = useSelector(state => state.auth.user)

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <Link className='navbar-brand' to='/shell'>
          My StudyRoom
        </Link>
        <button
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
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/shell'>
                Home
              </NavLink>
            </li>
            {/* <li className='nav-item'>
              <NavLink className='nav-link' to='/profile'>
                Profile
              </NavLink>
            </li> */}
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
                    {user.name}
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/logout'>
                    Logout
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
