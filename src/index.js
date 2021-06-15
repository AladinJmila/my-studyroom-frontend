import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import logger from './services/logService'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

// store.dispatch(deleteSubject('60c475e4b0f7f533804ac10d'))

// store.dispatch(
//   addSubject({
//     _id: '60c46712b0f7f533804abf04',
//     isPinned: false,
//     isPublic: false,
//     name: 'Habbat',
//     userId: '60afd9645739643bcc77844d',
//   })
// )

// store.dispatch(loadSubjects())
// store.dispatch(loadSubject('60a38baca979ca2238c1233c'))

logger.init()

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
