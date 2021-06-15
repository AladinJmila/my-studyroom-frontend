import { Route, Switch, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './store/configureStore'
import Shell from './components/Shell'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import Profile from './components/Profile'
import NotFound from './components/NotFound'
import NavBar from './components/NavBar'
import { getCurrentUser } from './services/authService'
import './App.css'

function App() {
  const [user, setUser] = useState()

  useEffect(() => {
    const user = getCurrentUser()
    setUser(user)
  }, [])

  return (
    <Provider store={store}>
      <NavBar user={user} />
      <Switch>
        <Route path='/register' component={RegisterForm}></Route>
        <Route path='/login' component={LoginForm}></Route>
        <Route path='/logout' component={Logout}></Route>
        <Route path='/profile' component={Profile}></Route>
        <Route path='/not-found' component={NotFound}></Route>
        <Route
          path='/shell'
          exact
          render={props => <Shell {...props} user={user} />}
        ></Route>
        <Redirect from='/' to='/shell' />
        <Redirect to='/not-found' />
      </Switch>
    </Provider>
  )
}

export default App
