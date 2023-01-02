import httpService from '../services/httpService';
import { getCurrentUser } from '../services/authService';
import * as actions from './timerRecords';

const apiEndPoint = '/timerRecords';
let userid;
const user = getCurrentUser();
if (user) userid = user._id;

export const loadNewestTimerRecord = () => async dispatch => {
  try {
    const { data } = await httpService.get(apiEndPoint);
    console.log('record loaded');

    dispatch(actions.GET_NEWEST_TIMER_RECORD(data));
  } catch (error) {
    console.log(error);
  }
};

export const loadDailyDurations = () => async dispatch => {
  try {
    const { data } = await httpService.get(`${apiEndPoint}/daily-durations`);

    dispatch(actions.GET_DAILY_DURATIONS(data));
  } catch (error) {
    console.log(error);
  }
};

export const loadVizData = () => async dispatch => {
  try {
    const { data } = await httpService.get(`${apiEndPoint}/week-stats`);

    dispatch(actions.GET_VIZ_DATA(data));
  } catch (error) {
    console.log(error);
  }
};

export const updateTimerRecord =
  (activity, recordId, method) => async dispatch => {
    try {
      const { data } = await httpService.put(
        `${apiEndPoint}/${recordId}/${activity._id}/${method}`,
        activity
      );
    } catch (error) {
      console.log(error);
    }
  };

export const updateAction = (record, timerRecordId) => async dispatch => {
  try {
    const { data } = await httpService.put(
      `${apiEndPoint}/action/${timerRecordId}`,
      record
    );

    dispatch(actions.UPDATE_ACTION(data));
  } catch (error) {
    console.log(error);
  }
};

export const setSelectedDayViz = day => dispatch => {
  dispatch(actions.SET_SELECTED_DAY_VIZ(day));
};
