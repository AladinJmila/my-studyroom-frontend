import moment from 'moment';
import httpService from '../services/httpService';
import { getCurrentUser } from '../services/authService';
import * as actions from './audioNotes';
import config from '../../config.json';

const apiEndPoint = '/audioNotes';
let userid;
const user = getCurrentUser();
const loadingInterval = Number(config.loadingInterval);

if (user) userid = user._id;

export const loadAudioNotes = () => async (dispatch, getState) => {
  const { lastFetch } = getState().apps.audioNotes;
  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  if (diffInMinutes < loadingInterval) return;

  try {
    dispatch(actions.REQUEST_AUDIO_NOTES());

    const options = { headers: { userid } };
    const { data } = await httpService.get(apiEndPoint, options);

    dispatch(actions.GET_AUDIO_NOTES(data));
  } catch (error) {
    console.log(error);
    dispatch(actions.REQUEST_AUDIO_NOTES_FAIL());
  }
};

export const createAudioNote = (formData, params) => async dispatch => {
  try {
    const options = { params: params };
    const { data } = await httpService.post(apiEndPoint, formData, options);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const loadAudioNotesGroups = () => async dispatch => {
  const options = { headers: { userid } };
  try {
    const { data } = await httpService.get(`groups${apiEndPoint}`, options);

    dispatch(actions.GET_AUDIO_NOTES_GROUPS(data));
  } catch (error) {
    console.log(error);
  }
};

export const createAudioNotesGroup = group => async dispatch => {
  console.log(group);
  try {
    const { data } = await httpService.post(`groups${apiEndPoint}`, group);

    dispatch(actions.CREATE_AUDIO_NOTES_GROUP(data));
  } catch (error) {
    console.log(error);
  }
};
