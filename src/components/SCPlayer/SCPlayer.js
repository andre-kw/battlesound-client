import React from 'react';

export default function SCPlayer(props) {
  return (
    <iframe title="SCPlayer" width="100%" height="300" scrolling="no" frameBorder="no" allow="autoplay" src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${props.trackId}&color=%23ff007a&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}></iframe>
  );
}