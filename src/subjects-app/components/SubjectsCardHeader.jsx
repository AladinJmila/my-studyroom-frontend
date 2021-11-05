import CardEllipsisMenu from './../../common/CardEllipsisMenu';
import Star from '../../common/Star';

const SubjectsCardHeader = ({
  subject,
  onToggleProp,
  onDelete,
  onShowShareForm,
  showPrivateInfo,
}) => {
  return (
    <div className='d-flex flex-row justify-content-between'>
      <h5 className='card-title'>
        {subject.name}{' '}
        {subject.isPublic && <i style={{ color: '#3E98C7' }}>P</i>}{' '}
        {subject.starred && <Star className='yellow' starred />}
      </h5>
      <div className='card-link float-end'>
        {showPrivateInfo && subject.name !== 'All Subjects' && (
          <CardEllipsisMenu
            share
            item={subject}
            // onEdit={onEdit}
            onToggleProp={onToggleProp}
            onDelete={onDelete}
            onShareForm={onShowShareForm}
          />
        )}
      </div>
    </div>
  );
};

export default SubjectsCardHeader;
