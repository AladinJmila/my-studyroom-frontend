import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Select from '../common/Select';
import { loadSubjects } from '../store/apps/subjectsActions';
import { appsFormStyle } from '../services/stylesService';
import Input from '../common/Input';
import './AudioNotes.css';

function AudioNotesForm() {
  const [data, setData] = useState({
    subjectId: '',
    groupId: '',
    groupName: '',
    track: '',
  });
  const [errors, setErrors] = useState({});
  const [showGroupInput, setShowGroupInput] = useState(false);
  const dispatch = useDispatch();

  const subjects = useSelector(state => state.apps.subjects.list);
  const groups = [];

  const handleShowGroupInput = () => {
    setShowGroupInput(!showGroupInput);
  };

  useEffect(() => {
    dispatch(loadSubjects());
  });

  return (
    <form onSubmit={null} style={{ marginTop: 12, ...appsFormStyle }}>
      <Select name='subjectId' label='Subject' options={subjects} required />
      <div className='row'>
        <div className='col-10 ps pe-0'>
          <Select name='groupId' label='Group' options={groups} required />
        </div>
        <button
          type='button'
          className='btn btn-outline-dark ms-4 mt-4 mb-3 me-0 col-1'
          onClick={handleShowGroupInput}
        >
          <i className='fa fa-plus' aria-hidden='true'></i>
        </button>
      </div>

      {showGroupInput && (
        <div className='row'>
          <div className='col-10 ps pe-0'>
            <Input type='text' name='groupName' label='Group name' />
          </div>
          <button
            type='button'
            className='btn btn-outline-dark ms-4 mt-4 mb-3 me-0 col-1'
            onClick={handleShowGroupInput}
          >
            <i className='fa fa-check' aria-hidden='true'></i>
          </button>
        </div>
      )}

      <div className='audio-recorder'>
        <div className='controls'>
          <button className='record-btn stop-rec'></button>
          <button className='play-btn'>
            <i className='fa fa-play'></i>
          </button>
          <button className='stop-btn'>
            <i className='fa fa-square'></i>
          </button>
        </div>
        <input type='range' className='timeline' max='100' value='0' />
        <audio src='https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3'></audio>
      </div>
      <div className='d-grid gap-2'>
        <button className='btn btn-dark mb-2' onClick={null}>
          Save
        </button>
      </div>
    </form>
  );
}

export default AudioNotesForm;
