const About = () => {
  return (
    <div>
      <h1>About Me</h1>
      <p>Hi! I'm learning React Router. This is my about page.</p>
      <div style={{ 
        marginTop: '20px', 
        padding: '20px', 
        backgroundColor: '#f0f0f0',
        borderRadius: '8px' 
      }}>
        <h3>My Skills:</h3>
        <ul>
          <li>HTML/CSS</li>
          <li>JavaScript</li>
          <li>Learning React!</li>
        </ul>
      </div>
    </div>
  );
};

export default About;