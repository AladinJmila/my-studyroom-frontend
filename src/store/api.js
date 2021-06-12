import { createAction } from '@reduxjs/toolkit'

export const apiGetCallBegan = createAction('api/getCallBegan')
export const apiSaveCallBegan = createAction('api/saveCallBegan')
export const apiPutCallBegan = createAction('api/putCallBegan')
export const apiDeleteCallBegan = createAction('api/deleteCallBegan')
export const apiCallSuccess = createAction('api/callSucess')
export const apiCallFailed = createAction('api/callFailed')
