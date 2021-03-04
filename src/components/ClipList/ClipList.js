import React from 'react';
import './ClipList.css';
import VideoDetails from '../VideoDetails/VideoDetails';

const ClipList = ({ videoDetailsToDisplay, hideClip }) => {
  let displayVideos = videoDetailsToDisplay.slice(0, 10);
  return (
    <div>
      <div>
        <iframe
          title="video"
          width="420"
          height="345"
          className="videoShow"
          name="iframe_a"
        ></iframe>
      </div>
      <ul className="ul-list">
        {displayVideos.map((clip) => (
          <VideoDetails
            key={Math.random().toString(36).substr(2, 9)}
            clip={clip}
            hideClip={hideClip}
          />
        ))}
      </ul>
    </div>
  );
};

export default ClipList;
