import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import getBlobDuration from 'get-blob-duration'
import Joi from 'joi-browser'
import { appsFormStyle } from '../services/stylesService'
import { formatTime } from './services'
import Select from '../common/Select'
import Input from '../common/Input'
import { loadSubjects } from '../store/apps/subjectsActions'
import {
  createAudioNotesGroup,
  loadAudioNotes,
  createAudioNote,
} from '../store/apps/audioNotesActions'
import './AudioNotes.css'
import { setSelectedGroup } from '../store/apps/groupsActions'

let recordInterval

function AudioNotesForm() {
  const { selectedGroup } = useSelector(state => state.apps.groups)

  const [subjectId, setSubjectId] = useState('')
  const [groupName, setGroupName] = useState('')
  const [groupId, setGroupId] = useState(selectedGroup?._id || '')
  const [errors, setErrors] = useState({})
  const [showGroupInput, setShowGroupInput] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [audioURL, setAudioURL] = useState('')
  const [progressPosition, setProgressPosition] = useState(0)
  const [audioCurrentTime, setAudioCurrentTime] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const [audioBlob, setAudioBlob] = useState()
  const dispatch = useDispatch()

  const audioEl = useRef()

  const subjects = useSelector(state => state.apps.subjects.list)
  const { selectedSubject } = useSelector(state => state.apps.subjects)
  const groups = useSelector(state => state.apps.audioNotes.list)

  const audioNoteSchema = {
    subjectId: Joi.string().label('Subject').required(),
    groupId: Joi.string().label('Group').required(),
    audioBlob: Joi.object().label('Recording').required(),
  }

  const validateAudioNote = () => {
    const options = { abortEarly: false }
    const audioNoteBody = { subjectId, groupId, audioBlob }
    const { error } = Joi.validate(audioNoteBody, audioNoteSchema, options)

    if (!error) return null

    const errors = {}
    for (let item of error.details) errors[item.path[0]] = item.message
    return errors
  }

  const groupSchema = {
    subjectId: Joi.string().label('Subject').required(),
    groupName: Joi.string().label('Group Name').required(),
  }

  const validateGroup = () => {
    const options = { abortEarly: false }
    const groupBody = { subjectId, groupName }
    const { error } = Joi.validate(groupBody, groupSchema, options)

    if (!error) return null

    const errors = {}
    for (let item of error.details) errors[item.path[0]] = item.message
    return errors
  }

  const handleShowGroupInput = () => {
    setShowGroupInput(!showGroupInput)
  }

  const handleAddGroup = e => {
    const group = {
      subjectId,
      name: groupName,
      props: { totalDuration: 0, remainingDuration: 0 },
    }
    dispatch(createAudioNotesGroup(group))
    handleShowGroupInput()
    setGroupName('')
  }

  useEffect(() => {
    if (!selectedGroup && groups.length) {
      setGroupId(groups[groups.length - 1]._id)
      dispatch(setSelectedGroup(groups[groups.length - 1]))
    }
  }, [groups])

  useEffect(() => {
    dispatch(loadSubjects())
    subjectId && dispatch(loadAudioNotes(subjectId))
    if (selectedSubject && selectedSubject.name !== 'All Subjects') {
      setSubjectId(selectedSubject._id)
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (mediaStreamObj) {
        setMediaRecorder(new MediaRecorder(mediaStreamObj))
      })
  }, [subjectId, selectedSubject])

  const record = e => {
    setIsRecording(!isRecording)

    let chunks = []

    if (!isRecording) {
      mediaRecorder.start()
      setAudioDuration(0)
      setAudioCurrentTime(0)
      setProgressPosition(0)
      setIsPlaying(false)
      recordInterval = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
      // console.log(mediaRecorder.state);
    } else {
      mediaRecorder.stop()
      clearInterval(recordInterval)
      setRecordingTime(0)
      // console.log(mediaRecorder.state);
    }

    mediaRecorder.ondataavailable = e => {
      chunks.push(e.data)
    }

    mediaRecorder.onstop = e => {
      const blob = new Blob(chunks, { type: 'audio/wav' })
      setAudioBlob(blob)
      getBlobDuration(blob).then(duration => {
        setAudioDuration(Math.ceil(duration))
      })

      chunks = []
      setAudioURL(window.URL.createObjectURL(blob))
    }
  }

  const play = () => {
    if (!audioURL) return
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      audioEl.current.play()
    } else {
      audioEl.current.pause()
    }
  }

  if (audioEl.current) {
    audioEl.current.ontimeupdate = () => {
      setAudioDuration(
        audioEl.current.duration !== Infinity
          ? Math.ceil(audioEl.current.duration)
          : audioDuration
      )
      setAudioCurrentTime(Math.ceil(audioEl.current.currentTime))
      const position = Math.ceil(
        (100 * Math.ceil(audioEl.current.currentTime)) /
          (audioEl.current.duration !== Infinity
            ? Math.ceil(audioEl.current.duration)
            : audioDuration)
      )
      setProgressPosition(isNaN(position) ? 0 : position)
    }

    audioEl.current.onended = () => setIsPlaying(false)
  }

  const seekTime = e => {
    audioEl.current.currentTime =
      (e.nativeEvent.offsetX / e.target.clientWidth) * audioDuration
  }

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('audio', audioBlob)

    const params = {
      subjectId,
      groupId,
      audioDuration,
    }

    dispatch(createAudioNote(formData, params))
    setAudioBlob(null)
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 12, ...appsFormStyle }}>
      <Select
        name="subjectId"
        label="Subject"
        options={subjects}
        value={subjectId}
        required
        onChange={e => setSubjectId(e.target.value)}
      />
      <div className="row">
        <div className="col-10 ps pe-0">
          <Select
            name="groupId"
            label="Group"
            options={groups}
            value={groupId}
            required
            onChange={e => {
              setGroupId(e.target.value)
              dispatch(
                setSelectedGroup(groups.filter(g => g._id == e.target.value)[0])
              )
            }}
          />
        </div>
        <button
          type="button"
          className="btn btn-outline-dark ms-4 mt-4 mb-3 me-0 col-1"
          onClick={handleShowGroupInput}
        >
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
      </div>

      {showGroupInput && (
        <div className="row">
          <div className="col-10 ps pe-0">
            <Input
              type="text"
              required
              name="groupName"
              label="Group name"
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-outline-dark ms-4 mt-4 mb-3 me-0 col-1"
            onClick={handleAddGroup}
            disabled={validateGroup()}
          >
            <i className="fa fa-check" aria-hidden="true"></i>
          </button>
        </div>
      )}

      <div className="audio-recorder">
        <div className="controls">
          <button
            type="button"
            className={`record-btn ${isRecording ? 'rec' : 'stop-rec'}`}
            onClick={record}
          ></button>
          <button
            disabled={isRecording}
            type="button"
            className="play-btn"
            onClick={play}
          >
            <i className={`fa fa-${isPlaying ? 'pause' : 'play'}`}></i>
          </button>
        </div>
        <input
          type="range"
          className="timeline"
          max="100"
          value={progressPosition}
          style={{ backgroundSize: `${progressPosition}% 100%` }}
          onClick={seekTime}
          readOnly
        />

        <p className="time">
          {isRecording
            ? formatTime(recordingTime)
            : `${formatTime(audioCurrentTime)} / ${formatTime(audioDuration)}`}
        </p>
        <audio ref={audioEl} src={audioURL}></audio>
      </div>
      <div className="d-grid gap-2">
        <button className="btn btn-dark mb-2" disabled={validateAudioNote()}>
          Save
        </button>
      </div>
    </form>
  )
}

export default AudioNotesForm
