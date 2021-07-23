import _ from 'lodash'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import {
  loadSubjects,
  patchSubject,
  deleteSubject,
  toggleSubjectProp,
  setSelectedSubject,
} from '../../store/apps/subjectsActions'
import HeaderCard from '../../common/HeaderCard'
import SubjectsCard from './SubjectsCard'
import SubjectsForm from './SubjectsForm'
import SubjectsSortCard from './SubjectsSortCard'
import generateAllSubjects from '../services/generateAllSubjects'

const Subjects = ({ appsWrapperRef }) => {
  const [showForm, setShowForm] = useState(false)
  const [sortTarget, setSortTarget] = useState({
    path: 'starred',
    order: 'desc',
  })

  const dispatch = useDispatch()
  const subjects = useSelector(state => state.apps.subjects.list)
  const { user } = useSelector(state => state.auth)
  const { loading } = useSelector(state => state.apps.subjects)
  const subjectsRef = useRef()

  const allSubjects = generateAllSubjects(subjects)

  useEffect(() => {
    dispatch(loadSubjects())
  }, [])

  const handleDelete = subject => {
    dispatch(deleteSubject(subject._id))
  }

  const onSort = sortTarget => {
    setSortTarget(sortTarget)
  }

  const handleToggleProp = (subject, property) => {
    const index = subjects.indexOf(subject)
    const subjectToUpdate = { ...subjects[index] }
    subjectToUpdate[property] = !subjectToUpdate[property]
    const update = { [property]: subjectToUpdate[property] }

    dispatch(patchSubject(subject._id, update))
    dispatch(toggleSubjectProp(subject._id, property))
  }

  const handleToggleUpvote = (subject, status) => {
    const index = subjects.indexOf(subject)
    const subjectToUpdate = { ...subjects[index] }
    // subjectToUpdate.upvote = status
    const update = { upvote: status }

    dispatch(patchSubject(subject._id, update))
    // dispatch(toggleSubjectProp(subject._id, 'upvote'))
  }

  const handleSubjectSelect = subject => {
    dispatch(setSelectedSubject(subject))
    subjectsRef.current.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    })
    setTimeout(() => {
      appsWrapperRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
      })
    }, 100)
  }

  const handleShowForm = () => {
    setShowForm(showForm ? false : true)
  }

  let sorted = _.orderBy(subjects, [sortTarget.path], [sortTarget.order])
  sorted = [allSubjects, ...sorted]

  return (
    <div ref={subjectsRef}>
      <HeaderCard
        user={user}
        count={sorted.length - 1}
        item='Subjects'
        onClick={handleShowForm}
        showForm={showForm}
      />
      {showForm && (
        <SubjectsForm subjects={sorted} toggleShowForm={handleShowForm} />
      )}
      <SubjectsSortCard sortTarget={sortTarget} onSort={onSort} />
      {loading ? (
        <div className='center-spinner'>
          <BeatLoader size={50} color={'#6A7475'} loading={loading} />
        </div>
      ) : (
        <>
          {sorted.map(subject => (
            <SubjectsCard
              key={subject._id || subject.key}
              user={user}
              subject={subject}
              onSubjectSelect={handleSubjectSelect}
              onToggleProp={handleToggleProp}
              onToggleUpvote={handleToggleUpvote}
              onDelete={handleDelete}
              allSubjects={allSubjects}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default Subjects
