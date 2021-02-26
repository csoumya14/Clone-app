import React from 'react';
import './ClipList.css';

const ClipList = ({ videoDetailsToShow, hideClip }) => {
  return (
    <div>
      <iframe
        title="video"
        className="videoShow"
        width="420"
        height="345"
        src="demo_iframe.htm"
        name="iframe_a"
      ></iframe>
      <ul className="ul-list">
        {videoDetailsToShow.slice(0, 10).map((clip) => (
          <li key={Math.random().toString(36).substr(2, 9)} className="list-items">
            <div>
              <a href="https://www.youtube.com/embed/tgbNymZ7vqY" target="iframe_a">
                {clip.snippet.description}
              </a>
            </div>
            <div>
              <a href="https://www.youtube.com/embed/tgbNymZ7vqY" target="iframe_a">
                {new Date(clip.snippet.publishTime).toISOString().split('T')[0]}
              </a>
            </div>
            <button onClick={() => hideClip(clip)}>hide</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClipList;
