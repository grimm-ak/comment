// App.jsx
import React, { useState } from 'react';
import Comment from './comment';
import CommentForm from './commentForm';

// Initial comments array
const initialComments = [
  { 
    id: 1, 
    text: "This is the first comment!", 
    likes: 5, 
    timestamp: new Date(), 
    user: "User1", 
    starred: false,
    replies: []
  },
  { 
    id: 2, 
    text: "Nice video!", 
    likes: 10, 
    timestamp: new Date(), 
    user: "User2", 
    starred: false,
    replies: []
  },
  { 
    id: 3, 
    text: "I learned a lot, thanks!", 
    likes: 3, 
    timestamp: new Date(), 
    user: "User3", 
    starred: false,
    replies: []
  }
];

function App() {
  const [comments, setComments] = useState(initialComments);
  const [replyTo, setReplyTo] = useState(null); // State to track which comment is being replied to
  const [sortBy, setSortBy] = useState('recent'); // State to track sorting criteria
  const [sortDirection, setSortDirection] = useState('desc'); // State to track sorting direction

  const addComment = (newComment) => {
    if (replyTo) {
      const updatedComments = comments.map(comment => {
        if (comment.id === replyTo.id) {
          return {
            ...comment,
            replies: [...comment.replies, newComment]
          };
        }
        return comment;
      });
      setComments(updatedComments);
    } else {
      setComments([...comments, newComment]);
    }
    setReplyTo(null);
  };

  const handleReply = (comment) => {
    setReplyTo(comment);
  };

  const deleteComment = (id) => {
    const updatedComments = comments.filter(comment => comment.id !== id);
    setComments(updatedComments);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortDirectionChange = (event) => {
    setSortDirection(event.target.value);
  };

  // Function to sort comments based on the selected criteria and direction
  const sortedComments = comments.slice().sort((a, b) => {
    if (sortBy === 'recent') {
      const timestampA = new Date(a.timestamp).getTime();
      const timestampB = new Date(b.timestamp).getTime();
      return sortDirection === 'desc' ? timestampB - timestampA : timestampA - timestampB;
    } else if (sortBy === 'likes') {
      return sortDirection === 'desc' ? b.likes - a.likes : a.likes - b.likes;
    }
    return 0;
  });

  return (
    <div className="App">
      <h1>YouTube Comment Section Clone</h1>
      <div className="sort-options">
        <label>
          Sort by:
          <select value={sortBy} onChange={handleSortChange}>
            <option value="recent">Recent</option>
            <option value="likes">Likes</option>
          </select>
        </label>
        {sortBy === 'likes' && (
          <label>
            Direction:
            <select value={sortDirection} onChange={handleSortDirectionChange}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </label>
        )}
      </div>
      <div className="comments">
        {sortedComments.map(comment => (
          <Comment key={comment.id} comment={comment} onReply={handleReply} onDelete={deleteComment} />
        ))}
      </div>
      <CommentForm addComment={addComment} replyTo={replyTo} />
    </div>
  );
}

export default App;
