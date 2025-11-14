import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation(); // Hook to know which page we're on
  
  // Helper to style active link
  const getLinkStyle = (path: string) => ({
    padding: '10px 20px',
    textDecoration: 'none',
    backgroundColor: location.pathname === path ? '#3498db' : '#95a5a6',
    color: 'white',
    borderRadius: '5px',
    transition: 'background-color 0.3s'
  });

  return (
    <nav style={{ 
      padding: '20px', 
      backgroundColor: '#2c3e50',
      marginBottom: '20px' 
    }}>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Link to="/" style={getLinkStyle('/')}>
          🏠 About
        </Link>
        <Link to="/projects" style={getLinkStyle('/projects')}>
          💼 Projects
        </Link>
        <Link to="/contact" style={getLinkStyle('/contact')}>
          📞 Contact
        </Link>
      </div>
      
      {/* Show current route */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '10px', 
        color: '#ecf0f1',
        fontSize: '14px' 
      }}>
        Current Route: {location.pathname}
      </div>
    </nav>
  );
};

export default Navigation;