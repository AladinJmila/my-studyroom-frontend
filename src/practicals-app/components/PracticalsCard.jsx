import {
  cardsBody,
  checkedStyle,
  mainContentStyle,
} from './../../services/stylesService'
import Check from './../../common/Check'
import Star from '../../common/Star'
import CardEllipsisMenu from './../../common/CardEllipsisMenu'
import { isEditor } from './../../services/permissionsService'

const PracticalsCard = ({
  user,
  practical,
  onToggleProp,
  onDelete,
  onEdit,
}) => {
  const showPrivateInfo = user && isEditor(practical.subject.editors, user._id)

  return (
    <div style={cardsBody} className='card mb-1'>
      <div className='p-3'>
        <div className='d-flex flex-row justify-content-between '>
          <h6 className='card-subtitle mb-2'>
            {practical.subject.name}{' '}
            {practical.isPublic && <i style={{ color: '#3E98C7' }}>P</i>}{' '}
            {practical.starred && <Star className='yellow' starred />}
          </h6>
          <div className='card-link float-end'>
            {showPrivateInfo && (
              <CardEllipsisMenu
                item={practical}
                onEdit={onEdit}
                onToggleProp={onToggleProp}
                onDelete={onDelete}
              />
            )}
          </div>
        </div>
        <div>
          <div className='float-start me-2 mb-1'>
            {showPrivateInfo && (
              <Check
                onCheck={() => onToggleProp(practical, 'isChecked')}
                isChecked={practical.isChecked}
              />
            )}
          </div>
          {practical.url && (
            <a
              href={practical.url}
              rel='noreferrer'
              target='_blank'
              className='float-end'
            >
              <i className='fa fa-external-link' aria-hidden='true'></i>
            </a>
          )}
          {practical.about && (
            <>
              <h6 className='pt-1'>About:</h6>{' '}
              {practical.isChecked && showPrivateInfo ? (
                <p
                  className='mb-2'
                  style={{ ...checkedStyle, whiteSpace: 'pre-wrap' }}
                >
                  {practical.about}
                </p>
              ) : (
                <p
                  className='mb-2'
                  style={{ ...mainContentStyle, whiteSpace: 'pre-wrap' }}
                >
                  {practical.about}
                </p>
              )}
            </>
          )}

          {practical.cause && (
            <>
              <h6 className='pt-1'>Cause:</h6>{' '}
              {practical.isChecked && showPrivateInfo ? (
                <p
                  className='mb-2'
                  style={{ ...checkedStyle, whiteSpace: 'pre-wrap' }}
                >
                  {practical.cause}
                </p>
              ) : (
                <p
                  className='mb-2'
                  style={{ ...mainContentStyle, whiteSpace: 'pre-wrap' }}
                >
                  {practical.cause}
                </p>
              )}
            </>
          )}
          {practical.solution && (
            <>
              <h6 className='pt-1'>Solution:</h6>{' '}
              {practical.isChecked && showPrivateInfo ? (
                <p
                  className='mb-2'
                  style={{ ...checkedStyle, whiteSpace: 'pre-wrap' }}
                >
                  {practical.solution}
                </p>
              ) : (
                <p
                  className='mb-2'
                  style={{ ...mainContentStyle, whiteSpace: 'pre-wrap' }}
                >
                  {practical.solution}
                </p>
              )}
            </>
          )}
          {practical.lesson && (
            <>
              <h6 className='pt-1'>Lesson:</h6>{' '}
              {practical.isChecked && showPrivateInfo ? (
                <p
                  className='mb-2'
                  style={{ ...checkedStyle, whiteSpace: 'pre-wrap' }}
                >
                  {practical.lesson}
                </p>
              ) : (
                <p
                  className='mb-2'
                  style={{ ...mainContentStyle, whiteSpace: 'pre-wrap' }}
                >
                  {practical.lesson}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PracticalsCard
