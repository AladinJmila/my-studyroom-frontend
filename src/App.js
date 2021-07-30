import { Route, Switch, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Shell from './components/Shell'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import Profile from './components/Profile'
import ProfilePublic from './components/ProfilePublic'
import NotFound from './components/NotFound'
import NavBar from './components/NavBar'
import About from './components/About'
import { getCurrentUser } from './store/services/authService'
import { setCurrentUser } from './store/auth/authParams'
import './App.css'
import Home from './components/Home'

function App() {
  const user = getCurrentUser()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentUser(user))
  }, [])

  return (
    <>
      <NavBar />
      <Switch>
        <Route path='/register' component={RegisterForm}></Route>
        <Route path='/login' component={LoginForm}></Route>
        <Route path='/logout' component={Logout}></Route>
        <Route
          path='/profile/:creatorName/:creatorId'
          component={ProfilePublic}
        ></Route>
        <Route path='/profile' component={Profile}></Route>
        <Route path='/about' component={About}></Route>
        <Route path='/not-found' component={NotFound}></Route>
        <Route path='/shell' exact component={Shell}></Route>
        <Route path='/home' exact component={Home}></Route>
        <Redirect from='/' to='/shell' />
        <Redirect to='/not-found' />
      </Switch>
    </>
  )
}

export default App
