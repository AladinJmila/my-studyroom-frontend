import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import reducer from './reducer'
import apiGet from './middleware/apiGet'
import apiSave from './middleware/apiSave'

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware(), apiGet, apiSave],
})

export default store
