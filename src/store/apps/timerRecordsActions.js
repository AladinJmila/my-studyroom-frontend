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
  console.log('dispatched from updateTimerRecord');
  try {
    const { data } = await httpService.get(`${apiEndPoint}/week-stats`);

    dispatch(actions.GET_VIZ_DATA(data));
  } catch (error) {
    console.log(error);
  }
};

export const updateTimerRecord = (activity, recordId) => async dispatch => {
  console.log(activity);
  console.log(recordId);
  try {
    const { data } = await httpService.put(
      `${apiEndPoint}/${recordId}/${activity._id}`,
      activity
    );

    // dispatch(actions.UPDATE_TIMER_RECORDS(data));
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
