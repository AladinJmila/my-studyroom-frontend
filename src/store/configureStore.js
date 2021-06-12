import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import reducer from './reducer'
import apiGet from './middleware/apiGet'
import apiSave from './middleware/apiSave'
import apiDelete from './middleware/apiDelete'

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware(), apiGet, apiSave, apiDelete],
})

export default store
