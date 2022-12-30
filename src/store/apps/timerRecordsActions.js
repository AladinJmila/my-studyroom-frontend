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

export const updateTimerRecords = (record, timerRecordId) => async dispatch => {
  try {
    const { data } = await httpService.put(
      `${apiEndPoint}/${timerRecordId}`,
      record
    );

    dispatch(actions.UPDATE_TIMER_RECORDS(data));
  } catch (error) {
    console.log(error);
  }
};

export const updateAction =
  (record, timerRecordId, actionId) => async dispatch => {
    console.log(actionId);

    try {
      const { data } = await httpService.put(
        `${apiEndPoint}/action/${timerRecordId}/${actionId}`,
        record
      );

      // console.log(data);
      dispatch(actions.UPDATE_ACTION(data));
    } catch (error) {
      console.log(error);
    }
  };

export const setSelectedDayViz = day => dispatch => {
  dispatch(actions.SET_SELECTED_DAY_VIZ(day));
};
