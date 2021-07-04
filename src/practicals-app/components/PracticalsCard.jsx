import {
  cardsBody,
  checkedStyle,
  mainContentStyle,
} from './../../services/stylesService'
import Check from './../../common/Check'
import Star from '../../common/Star'
import CardEllipsisMenu from './../../common/CardEllipsisMenu'

const PracticalsCard = ({
  user,
  practical,
  onToggleProp,
  onDelete,
  onEdit,
}) => {
  return (
    <div style={cardsBody} className='card mb-1'>
      <div className='pt-3 pr-3 pl-3'>
        <div className='d-flex flex-row justify-content-between '>
          {practical.url ? (
            <h6 className='card-subtitle mb-2 link'>
              {practical.subject.name}{' '}
              {practical.starred && <Star className='yellow' starred={true} />}
            </h6>
          ) : (
            <h6 className='card-subtitle mb-2'>
              {practical.subject.name}{' '}
              {practical.starred && <Star className='yellow' starred={true} />}
            </h6>
          )}
          <div className='card-link float-right'>
            {user && (
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
          <div className='card-title float-left mr-2 mb-1'>
            {user && (
              <Check
                onCheck={() => onToggleProp(practical, 'isChecked')}
                isChecked={practical.isChecked}
              />
            )}
          </div>
          {practical.about && (
            <>
              <h6 className='pt-1'>About:</h6>{' '}
              {practical.isChecked ? (
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
              {practical.isChecked ? (
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
              {practical.isChecked ? (
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
              {practical.isChecked ? (
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
