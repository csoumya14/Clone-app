import React from 'react';
import './ClipList.css';

const ClipList = ({ newVideoDetails, hideClip }) => {
  return (
    <ul className="ul-list">
      <iframe
        title="video"
        className="videoShow"
        width="420"
        height="345"
        src="demo_iframe.htm"
        name="iframe_a"
      ></iframe>
      {newVideoDetails.slice(0, 10).map((clip) => (
        <li key={clip.id} className="list-items">
          <div>
            <a
              href="https://www.youtube.com/embed/tgbNymZ7vqY"
              target="iframe_a"
              onClick={() => hideClip(clip)}
            >
              {clip.description}
            </a>
          </div>
          <div>
            <a
              href="https://www.youtube.com/embed/tgbNymZ7vqY"
              target="iframe_a"
              onClick={() => hideClip(clip)}
            >
              {clip.date}
            </a>
          </div>
          <button onClick={() => hideClip(clip)}>hide</button>
        </li>
      ))}
    </ul>
  );
};

export default ClipList;
