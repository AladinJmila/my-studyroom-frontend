import { Route, Switch, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import MetaTags from 'react-meta-tags'
import Workspace from './components/Workspace'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import Profile from './components/Profile'
import ProfilePublic from './components/ProfilePublic'
import NotFound from './components/NotFound'
import NavBar from './components/NavBar'
import About from './components/About'
import Home from './components/Home'
import SubjectDetails from './components/SubjectDetails'
import { getCurrentUser } from './store/services/authService'
import { setCurrentUser } from './store/auth/authParams'
import appLogo from './static/images/studyroom-logo.png'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  const user = getCurrentUser()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentUser(user))
  }, [])

  return (
    <>
      <ToastContainer />
      <MetaTags>
        <title>MyStudyroom</title>
        <meta
          name='description'
          content='A platform for gathering and sharing learning material and experiences.'
        />
        <meta property='og:title' content='MyStudyroom' />
        <meta property='og:image' content={appLogo} />
      </MetaTags>
      <NavBar />
      <Switch>
        <Route path='/register' component={RegisterForm}></Route>
        <Route path='/login' component={LoginForm}></Route>
        <Route path='/logout' component={Logout}></Route>
        <Route
          path='/profile/:creatorName/:creatorId'
          component={ProfilePublic}
        ></Route>
        <Route path='/my-profile' component={Profile}></Route>
        <Route path='/subjects/:id' component={SubjectDetails}></Route>
        <Route path='/about' component={About}></Route>
        <Route path='/not-found' component={NotFound}></Route>
        <Route path='/workspace' exact component={Workspace}></Route>
        <Route path='/home' exact component={Home}></Route>
        <Redirect from='/' to='/home' />
        <Redirect to='/not-found' />
      </Switch>
    </>
  )
}

export default App
