import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from '../common/Select';
import { loadSubjects } from '../store/apps/subjectsActions';
import { appsFormStyle } from '../services/stylesService';
import Input from '../common/Input';
import './AudioNotes.css';
import getBlobDuration from 'get-blob-duration';
import { duration } from 'moment/moment';

let playInterval;
let counter = 0;

function AudioNotesForm() {
  const [data, setData] = useState({
    subjectId: '',
    groupId: '',
    groupName: '',
    track: '',
  });
  const [errors, setErrors] = useState({});
  const [showGroupInput, setShowGroupInput] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const [progressPosition, setProgressPosition] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const dispatch = useDispatch();

  const audioEl = useRef();

  const subjects = useSelector(state => state.apps.subjects.list);
  const groups = [];

  const handleShowGroupInput = () => {
    setShowGroupInput(!showGroupInput);
  };

  useEffect(() => {
    dispatch(loadSubjects());

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (mediaStreamObj) {
        setMediaRecorder(new MediaRecorder(mediaStreamObj));
      });
  }, []);

  const record = e => {
    setIsRecording(!isRecording);

    let chunks = [];

    if (!isRecording) {
      mediaRecorder.start();
      setAudioDuration(0);
      setAudioCurrentTime(0);
      setProgressPosition(0);
      setIsPlaying(false);
      console.log(mediaRecorder.state);
    } else {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
    }

    mediaRecorder.ondataavailable = e => {
      chunks.push(e.data);
    };

    mediaRecorder.onstop = e => {
      const blob = new Blob(chunks, { type: 'audio/wav' });
      console.log(blob);
      getBlobDuration(blob).then(duration => {
        setAudioDuration(Math.ceil(duration));
      });

      chunks = [];
      setAudioURL(window.URL.createObjectURL(blob));
    };
  };

  const play = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  };

  if (audioEl.current) {
    audioEl.current.ontimeupdate = () => {
      setAudioDuration(
        audioEl.current.duration !== Infinity
          ? Math.ceil(audioEl.current.duration)
          : audioDuration
      );
      setAudioCurrentTime(Math.ceil(audioEl.current.currentTime));
      setProgressPosition(
        Math.ceil(
          (100 * Math.ceil(audioEl.current.currentTime)) /
            (audioEl.current.duration !== Infinity
              ? Math.ceil(audioEl.current.duration)
              : audioDuration)
        )
      );
    };

    audioEl.current.onended = () => {
      setIsPlaying(false);
    };
  }

  const seekTime = e => {
    console.log(e.target.clientWidth);
    console.log(e.nativeEvent.offsetX);
    audioEl.current.currentTime =
      (e.nativeEvent.offsetX / e.target.clientWidth) * audioDuration;
  };

  const formatTime = time => {
    if (isNaN(time)) return '00:00';
    let seconds = time % 60;
    seconds = seconds >= 10 ? seconds : '0' + seconds;
    let minutes = parseInt(time / 60);
    minutes = minutes >= 10 ? minutes : '0' + minutes;

    return `${minutes}:${seconds}`;
  };

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
          <button
            type='button'
            className={`record-btn ${isRecording ? 'rec' : 'stop-rec'}`}
            onClick={record}
          ></button>
          <button
            disabled={isRecording}
            type='button'
            className='play-btn'
            onClick={play}
          >
            <i className={`fa fa-${isPlaying ? 'pause' : 'play'}`}></i>
          </button>
        </div>
        <input
          type='range'
          className='timeline'
          max='100'
          value={progressPosition}
          style={{ backgroundSize: `${progressPosition}% 100%` }}
          onClick={seekTime}
        />
        <div className='time'>{`${formatTime(audioCurrentTime)} / ${formatTime(
          audioDuration
        )}`}</div>
        <audio ref={audioEl} src={audioURL}></audio>
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
