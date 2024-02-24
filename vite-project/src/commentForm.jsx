// CommentForm.jsx
import React, { useState } from 'react';

function CommentForm({ addComment, replyTo }) {
  const [text, setText] = useState('');
  const [user, setUser] = useState('Anonymous');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    const newComment = {
      id: Date.now(),
      text,
      likes: 0,
      timestamp: new Date(),
      user,
      starred: false,
      replies: []
    };
    addComment(newComment);
    setText('');
  };

  return (
    <div className="comment-form">
      <h3>Add a Comment</h3>
      <form onSubmit={handleSubmit}>
        {replyTo && <p>Replying to: {replyTo.user}</p>}
        <div>
          <label htmlFor="commentText">Comment:</label>
          <input 
            type="text" 
            id="commentText" 
            name="commentText" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="Enter your comment" 
            autoComplete="off" 
          />
        </div>
        <div>
          <label htmlFor="userName">Name:</label>
          <input 
            type="text" 
            id="userName" 
            name="userName" 
            value={user} 
            onChange={(e) => setUser(e.target.value)} 
            placeholder="Enter your name" 
            autoComplete="off" 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CommentForm;
