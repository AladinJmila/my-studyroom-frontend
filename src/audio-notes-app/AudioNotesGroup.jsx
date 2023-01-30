import { useState, useEffect, useRef } from 'react';
import AudioNotesCard from './AudioNotesCard';
import { formatTime, playGroup } from './services';
import { baseURL } from '../store/services/httpService';

let timesPlayed = 1;
let repsInterval = null;
let currentIndex = 0;

function AudioNotesGroup({ user, group }) {
  const [showContent, setShowContent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState();
  const [playingTrackIndex, setPlayingTrackIndex] = useState(1);

  const audioEl = useRef();
  const audioPadding = 5;

  const playGroupArgs = {
    group,
    audioEl,
    isPlaying,
    timesPlayed,
    setIsPlaying,
    audioPadding,
    repsInterval,
    currentIndex,
    setCurrentTrack,
    setPlayingTrackIndex,
  };

  return (
    <>
      <div className='audio-notes-group'>
        <button onClick={() => playGroup(playGroupArgs)} className='play-btn'>
          <i
            className={`fa fa-${isPlaying ? 'stop' : 'play'}`}
            style={{ color: 'white', zIndex: 100 }}
          ></i>
        </button>
        <h6> {group.name}</h6>
        {isPlaying ? (
          <p>
            {playingTrackIndex} / {group.children.length}
          </p>
        ) : (
          <p>Tracks: {group.children.length}</p>
        )}

        <p>{formatTime(group.props.duration)}</p>
        <button
          className='expand-btn'
          onClick={() => setShowContent(!showContent)}
        >
          <i
            className={`fa fa-${showContent ? 'chevron-up' : 'chevron-down'}`}
          ></i>
        </button>
      </div>
      {currentTrack && (
        <audio
          ref={audioEl}
          src={`${baseURL}/audioNotes/stream/${currentTrack}`}
        ></audio>
      )}
      {showContent &&
        group.children.map((child, index) => (
          <AudioNotesCard
            user={user}
            key={child._id}
            audioNote={child}
            index={index}
            groupName={group.name}
            audioPadding={audioPadding}
          />
        ))}
    </>
  );
}

export default AudioNotesGroup;
