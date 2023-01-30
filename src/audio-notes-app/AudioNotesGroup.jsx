import { useState, useEffect, useRef } from 'react';
import AudioNotesCard from './AudioNotesCard';
import { formatTime, playTrack } from './services';
import { baseURL } from '../store/services/httpService';

let timesPlayed = 1;
let repsInterval = null;
let currentTrackIndex = 0;

function AudioNotesGroup({ user, group, playSubject, currentGroupIndex }) {
  const [showContent, setShowContent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState();

  const audioEl = useRef();
  const audioPadding = 5;

  const playGroup = () => {
    currentTrackIndex = 0;
    setTimeout(() => {
      const playNext = () => {
        setCurrentTrack(group.children[currentTrackIndex].track.name);
        const playArgs = {
          audioEl,
          audioNote: group.children[currentTrackIndex],
          isPlaying,
          timesPlayed,
          setIsPlaying,
          audioPadding,
          repsInterval,
          currentTrackIndex,
          totalTracks: group.children.length,
          onEnded,
          playSubject,
          currentGroupIndex,
        };
        playTrack(playArgs);
      };

      const onEnded = () => {
        currentTrackIndex++;
        setTimeout(() => {
          playNext();
        }, audioPadding * 1000);
      };

      playNext();
    }, 500);
  };

  return (
    <>
      <div className='audio-notes-group'>
        <button onClick={playGroup} className='play-btn'>
          <i
            className={`fa fa-${isPlaying ? 'stop' : 'play'}`}
            style={{ color: 'white', zIndex: 100 }}
          ></i>
        </button>
        <h6> {group.name}</h6>
        {isPlaying ? (
          <p>
            {currentTrackIndex + 1} / {group.children.length}
          </p>
        ) : (
          <p>{group.children.length} tracks</p>
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
