import _ from 'lodash';
import { useState, createRef } from 'react';
import { useSelector } from 'react-redux';
import Notes from '../../notes-app/Notes';
import Tasks from '../../tasks-app/components/Tasks';
import Resources from '../../resources-app/Resources';
import Practicals from '../../practicals-app/Practicals';
import DataColumn from './DataColumn';
import AudioNotes from '../../audio-notes-app/AudioNotes';
import VisualNotes from '../../visual-notes-app/components/VisualNotes';
import SchedulesWrapper from '../../schedules-app/components/SchedulesWrapper';
import AnimateReorderX from '../../Effects/AnimateReorderX';
import { appName } from './../servecies/appsInfo';

const AppsWrapper = ({
  selectedSubject,
  setTasksRef,
  setResourcesRef,
  setNotesRef,
  setPracticalsRef,
  setAudioNotesRef,
  setVisualNotesRef,
  setSchedulesRef,
}) => {
  const [showPracticals, setShowPracticals] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [showAudioNotes, setShowAudioNotes] = useState(false);
  const [showVisualNotes, setShowVisualNotes] = useState(false);
  const [showSchedules, setShowSchedules] = useState(false);

  const subjectName = selectedSubject ? selectedSubject.name : 'All Subjects';
  const tasksCount = useSelector(
    state => state.ui.general.tasksPerSubject[subjectName]
  );
  const notesCount = useSelector(
    state => state.ui.general.notesPerSubject[subjectName]
  );
  const resourcesCount = useSelector(
    state => state.ui.general.resourcesPerSubject[subjectName]
  );
  const practicalsCount = useSelector(
    state => state.ui.general.practicalsPerSubject[subjectName]
  );

  const audioNotesCount = useSelector(
    state => state.ui.general.audioNotesPerSubject[subjectName]
  );

  const appsWrapperArray = [
    {
      name: appName.sessionsAndTimer,
      count: Number.POSITIVE_INFINITY,
      show: showSchedules,
      setShow: setShowSchedules,
      setRef: setSchedulesRef,
      data: <SchedulesWrapper />,
    },
    {
      name: appName.tasks,
      count: tasksCount,
      show: showTasks,
      setShow: setShowTasks,
      setRef: setTasksRef,
      data: <Tasks />,
    },
    {
      name: appName.resources,
      count: resourcesCount,
      show: showResources,
      setShow: setShowResources,
      setRef: setResourcesRef,
      data: <Resources />,
    },
    {
      name: appName.studyNotes,
      count: notesCount,
      show: showNotes,
      setShow: setShowNotes,
      setRef: setNotesRef,
      data: <Notes />,
    },
    {
      name: appName.practiceNotes,
      count: practicalsCount,
      show: showPracticals,
      setShow: setShowPracticals,
      setRef: setPracticalsRef,
      data: <Practicals />,
    },
    {
      name: appName.audioNotes,
      count: audioNotesCount,
      show: showAudioNotes,
      setShow: setShowAudioNotes,
      setRef: setAudioNotesRef,
      data: <AudioNotes />,
    },
    {
      name: appName.visualNotes,
      count: 0,
      show: showVisualNotes,
      setShow: setShowVisualNotes,
      setRef: setVisualNotesRef,
      data: <VisualNotes />,
    },
  ];

  const sortedAppsArray = _.orderBy(appsWrapperArray, ['count'], ['desc']);

  return (
    <div
      style={{ padding: 0, height: '91vh' }}
      className='col scrolling-wrapper d-flex flex-row justify-content-between apps-wrapper'
    >
      <AnimateReorderX>
        {sortedAppsArray.map(item => (
          <DataColumn
            key={item.name}
            data={item.data}
            name={item.name}
            show={item.show}
            count={item.count}
            setShow={item.setShow}
            ref={createRef()}
            setRef={item.setRef}
          />
        ))}
      </AnimateReorderX>
    </div>
  );
};

export default AppsWrapper;
