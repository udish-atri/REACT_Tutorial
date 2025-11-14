const Contact = () => {
  return (
    <div>
      <h1>Contact Me</h1>
      <div style={{ 
        backgroundColor: '#e8f5e9', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '20px' 
      }}>
        <p>📧 Email: learner@react.com</p>
        <p>📱 Phone: 555-REACT</p>
        <p>🐦 Twitter: @reactlearner</p>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h3>Fun Fact:</h3>
        <p>This page loaded instantly without refreshing the browser!</p>
        <p>Check the browser's refresh icon - it didn't spin! ⚡</p>
      </div>
    </div>
  );
};

export default Contact;