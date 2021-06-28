import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadSubjects,
  patchSubject,
  deleteSubject,
  toggleSubjectProp,
  setSelectedSubject,
} from '../../store/apps/subjectsActions'
import _ from 'lodash'
import HeaderCard from '../../common/HeaderCard'
import SubjectsCard from './SubjectsCard'
import SubjectsForm from './SubjectsForm'
import BeatLoader from 'react-spinners/BeatLoader'

const Subjects = () => {
  const [showForm, setShowForm] = useState(false)
  // const [loading, setLoading] = useState(false)

  const allSubjects = { key: 'key', name: 'All Subjects' }
  const dispatch = useDispatch()
  const subjects = useSelector(state => state.apps.subjects.list)
  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.apps.subjects.loading)

  useEffect(() => {
    dispatch(loadSubjects())
    // setLoading(true)
    // setTimeout(() => {
    //   setLoading(false)
    // }, 2000)
  }, [dispatch])

  const handleDelete = subject => {
    dispatch(deleteSubject(subject._id))
  }

  const handleToggleProp = (subject, property) => {
    const index = subjects.indexOf(subject)
    const subjectToUpdate = { ...subjects[index] }
    subjectToUpdate[property] = !subjectToUpdate[property]
    const update = { [property]: subjectToUpdate[property] }

    dispatch(patchSubject(subject._id, update))
    dispatch(toggleSubjectProp(subject._id, property))
  }

  const handleSubjectSelect = subject => {
    dispatch(setSelectedSubject(subject))
  }

  const handleShowForm = () => {
    setShowForm(showForm ? false : true)
  }

  const sortSubjects = () => {
    let data = [...subjects]
    let pinnedSubjects = data.filter(s => s.isPinned)
    pinnedSubjects = _.orderBy(pinnedSubjects, ['name'], ['asc'])
    let notPinnedSubjects = data.filter(s => !s.isPinned)
    notPinnedSubjects = _.orderBy(notPinnedSubjects, ['name'], ['asc'])
    return [allSubjects, ...pinnedSubjects, ...notPinnedSubjects]
  }

  const sorted = sortSubjects()

  return (
    <>
      {loading ? (
        <div className='center-spinner'>
          <BeatLoader size={50} color={'#3E98C7'} loading={loading} />
        </div>
      ) : (
        <>
          <HeaderCard
            user={user}
            count={sorted.length - 1}
            item='Subjects'
            onClick={handleShowForm}
            showForm={showForm}
          />
          {showForm && (
            <SubjectsForm
              user={user}
              subjects={sorted}
              toggleShowForm={handleShowForm}
            />
          )}

          {sorted.map(subject => (
            <SubjectsCard
              key={subject._id || subject.key}
              user={user}
              subject={subject}
              onSubjectSelect={handleSubjectSelect}
              onToggleProp={handleToggleProp}
              onDelete={handleDelete}
              allSubjects={allSubjects}
            />
          ))}
        </>
      )}
    </>
  )
}

export default Subjects
