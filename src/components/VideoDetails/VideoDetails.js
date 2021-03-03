import React from 'react';
import './VideoDetails.css';

const VideoDetails = ({ clip, hideClip }) => {
  return (
    <li className="list-items">
      <div>
        <a
          href={`https://www.youtube.com/embed/${clip.id.videoId}`}
          target="iframe_a"
          onClick={() => hideClip(clip)}
        >
          {clip.snippet.description}
        </a>
      </div>
      <div>
        <a
          href={`https://www.youtube.com/embed/${clip.id.videoId}`}
          target="iframe_a"
          onClick={() => hideClip(clip)}
        >
          {new Date(clip.snippet.publishTime).toISOString().split('T')[0]}
        </a>
      </div>
      <button className="button" onClick={() => hideClip(clip)}>
        Hide
      </button>
    </li>
  );
};

export default VideoDetails;
