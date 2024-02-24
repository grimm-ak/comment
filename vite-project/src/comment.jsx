// Comment.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faReply } from '@fortawesome/free-solid-svg-icons';

function Comment({ comment, onReply }) {
  const { id, text, likes, user, starred, replies } = comment;

  const handleReply = () => {
    onReply(comment);
  };

  return (
    <div className="comment">
      <div>
        <FontAwesomeIcon icon={faStar} className={starred ? "starred" : ""} />
        <p>{text}</p>
      </div>
      <p>User: {user}</p>
      <p>Likes: {likes}</p>
      <button onClick={handleReply}><FontAwesomeIcon icon={faReply} /> Reply</button>
      {replies && replies.map(reply => (
        <div className="reply" key={reply.id}>
          <FontAwesomeIcon icon={faReply} className="reply-icon" />
          <p>{reply.text}</p>
          <p>User: {reply.user}</p>
        </div>
      ))}
    </div>
  );
}

export default Comment;
