import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import { loadTasks } from '../../store/apps/tasksActions'
import { cardsBody, mainContentStyle } from './../../services/stylesService'

const PublicTasks = () => {
  // const publicTasks = useSelector(state => state.apps.tasks.list)
  const publicTasks = null
  const { loading } = useSelector(state => state.apps.tasks)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTasks())
  }, [])

  return (
    <>
      {loading ? (
        <div className='center'>
          <BeatLoader size={50} color={'#6A7475'} loading={loading} />
        </div>
      ) : (
        <>
          {publicTasks &&
            publicTasks.map(task => (
              <div key={task._id} style={cardsBody} className='card mb-1'>
                <div className='p-3'>
                  {task.resource && (
                    <p className='card-subtitle mb-2 text-muted'>
                      {task.resource.content}
                    </p>
                  )}
                  <p className='mb-0' style={mainContentStyle}>
                    {task.content}
                    {task.url && (
                      <a
                        href={task.url}
                        rel='noreferrer'
                        target='_blank'
                        className='float-end'
                      >
                        <i
                          className='fa fa-external-link'
                          aria-hidden='true'
                        ></i>
                      </a>
                    )}
                  </p>
                </div>
              </div>
            ))}
        </>
      )}
    </>
  )
}

export default PublicTasks
