import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadResources } from './../../store/apps/resourcesActions'
import { BeatLoader } from 'react-spinners'
import { cardsBody, mainContentStyle } from './../../services/stylesService'

const PublicResources = () => {
  // const publicResources = useSelector(state => state.apps.resources.list)
  const publicResources = null
  const { loading } = useSelector(state => state.apps.resources)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadResources())
  }, [])

  return (
    <div>
      {loading ? (
        <div className='center-spinner'>
          <BeatLoader size={50} color={'#6A7475'} loading={loading} />
        </div>
      ) : (
        <>
          {publicResources &&
            publicResources.map(resource => (
              <div style={cardsBody} className='card mb-1'>
                <div className='p-3'>
                  <p className='mb-0' style={mainContentStyle}>
                    {resource.content}
                    <a
                      href={resource.url}
                      rel='noreferrer'
                      target='_blank'
                      className='float-end'
                    >
                      <i className='fa fa-external-link' aria-hidden='true'></i>
                    </a>
                  </p>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  )
}

export default PublicResources
