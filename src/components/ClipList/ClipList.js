import React from 'react';
import './ClipList.css';

const ClipList = ({ videoDetailsToDisplay, hideClip }) => {
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
        {videoDetailsToDisplay.slice(0, 10).map((clip) => (
          <li key={Math.random().toString(36).substr(2, 9)} className="list-items">
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
            <button onClick={() => hideClip(clip)}>Hide</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClipList;
