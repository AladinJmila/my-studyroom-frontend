import moment from 'moment';
import httpService from '../services/httpService';
import { getCurrentUser } from '../services/authService';
import * as actions from './audioNotes';
import config from '../../config.json';
import { toast } from 'react-toastify';

const apiEndPoint = '/audioNotes';
let userid;
const user = getCurrentUser();
const loadingInterval = Number(config.loadingInterval);

if (user) userid = user._id;

export const loadAudioNotes = subjectId => async (dispatch, getState) => {
  const { lastFetch } = getState().apps.audioNotes;
  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  if (diffInMinutes < loadingInterval) return;
  const options = { headers: { userid } };

  try {
    dispatch(actions.REQUEST_AUDIO_NOTES());

    const { data } = await httpService.get(
      `${apiEndPoint}/${subjectId}`,
      options
    );

    dispatch(actions.GET_AUDIO_NOTES(data));
  } catch (error) {
    console.log(error);
    dispatch(actions.REQUEST_AUDIO_NOTES_FAIL());
  }
};

export const createAudioNotesGroup = group => async dispatch => {
  try {
    const { data } = await httpService.post(`${apiEndPoint}/group`, group);

    dispatch(actions.CREATE_AUDIO_NOTES_GROUP(data));
  } catch (error) {
    console.log(error);
  }
};

export const createAudioNote = (formData, params) => async dispatch => {
  try {
    const options = { params: params };
    const { data } = await httpService.post(apiEndPoint, formData, options);

    dispatch(actions.CREATE_AUDIO_NOTE(data));
  } catch (error) {
    console.log(error);
  }
};

export const patchAudioNote = (id, update) => async dispatch => {
  try {
    const { data } = await httpService.patch(`${apiEndPoint}/${id}`, update);

    dispatch(actions.UPDATE_AUDIO_NOTE({ data, update }));
  } catch (error) {
    console.log(error);
  }
};

export const deleteAudioNoteGroup = group => async dispatch => {
  if (!group.children.length) {
    try {
      await httpService.delete(`${apiEndPoint}/group/${group._id}`);

      dispatch(actions.DELETE_AUDIO_NOTE_GROUP(group._id));
    } catch (error) {
      console.log(error);
    }
  } else {
    toast.error('Group must be empty to be deleted');
  }
};

export const deleteAudioNote = audioNote => async dispatch => {
  try {
    await httpService.delete(`${apiEndPoint}/${audioNote._id}`);

    dispatch(actions.DELETE_AUDIO_NOTE(audioNote));
  } catch (error) {
    console.log(error);
  }
};
