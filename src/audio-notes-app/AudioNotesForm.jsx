import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Select from '../common/Select';
import { loadSubjects } from '../store/apps/subjectsActions';
import { appsFormStyle } from '../services/stylesService';

function AudioNotesForm() {
  const [data, setDate] = useState({
    subjectId: '',
    groupId: '',
    groupName: '',
    title: '',
    track: '',
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const subjects = useSelector(state => state.apps.subjects.list);
  const groups = [];

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
          onClick={null}
        >
          <i className='fa fa-plus' aria-hidden='true'></i>
        </button>
      </div>
    </form>
  );
}

export default AudioNotesForm;
