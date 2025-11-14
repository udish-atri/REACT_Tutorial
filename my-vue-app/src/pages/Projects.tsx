import { useState } from 'react';

const Projects = () => {
  // Simple state to demonstrate that state persists when navigating
  const [likes, setLikes] = useState(0);

  return (
    <div>
      <h1>My Projects</h1>
      <div style={{ 
        border: '2px solid #3498db', 
        padding: '20px', 
        marginTop: '20px',
        borderRadius: '8px' 
      }}>
        <h3>🚀 React Router Demo</h3>
        <p>This very website you're looking at!</p>
        <button 
          onClick={() => setLikes(likes + 1)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          👍 Like ({likes})
        </button>
        <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          Navigate away and come back - the likes persist during your session!
        </p>
      </div>
    </div>
  );
};

export default Projects;