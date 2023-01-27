import { useState } from 'react';
import AudioNotesCard from './AudioNotesCard';
import { formatTime } from './services';

function AudioNotesGroup({ user, group }) {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      <button
        type='button'
        className='audio-notes-group'
        onClick={() => setShowContent(!showContent)}
      >
        <h6> {group.name}</h6>
        <p>Items: {group.children.length}</p>
        <p>Duration: {formatTime(group.props.duration)}</p>
        <i
          className={`fa fa-${showContent ? 'chevron-up' : 'chevron-down'}`}
        ></i>
      </button>
      {showContent &&
        group.children.map((child, index) => (
          <AudioNotesCard
            user={user}
            key={child._id}
            audioNote={child}
            index={index}
            groupName={group.name}
          />
        ))}
    </>
  );
}

export default AudioNotesGroup;
