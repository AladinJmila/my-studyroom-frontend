import { useState, useEffect, useRef } from 'react';
import AudioNotesCard from './AudioNotesCard';
import { formatTime, play } from './services';

function AudioNotesGroup({ user, group }) {
  const [showContent, setShowContent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playGroup = () => {};

  return (
    <>
      <div className='audio-notes-group'>
        <button type='button' onClick={playGroup} className='play-btn'>
          <i
            className={`fa fa-${isPlaying ? 'stop' : 'play'}`}
            style={{ color: 'white', zIndex: 100 }}
          ></i>
        </button>
        <h6> {group.name}</h6>
        <p>Items: {group.children.length}</p>
        <p>Duration: {formatTime(group.props.duration)}</p>
        <button
          className='expand-btn'
          onClick={() => setShowContent(!showContent)}
        >
          <i
            className={`fa fa-${showContent ? 'chevron-up' : 'chevron-down'}`}
          ></i>
        </button>
      </div>
      {showContent &&
        group.children.map((child, index) => (
          <AudioNotesCard
            user={user}
            key={child._id}
            audioNote={child}
            index={index}
            groupName={group.name}
            audioPadding={5}
          />
        ))}
    </>
  );
}

export default AudioNotesGroup;
