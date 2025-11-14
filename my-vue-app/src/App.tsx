import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import SurveyForm from './components/SurveyForm';
import TaskTable from './components/TaskTable';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';

function App() {
  return <SurveyForm />;
  return <TaskTable />;
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', backgroundColor: '#ecf0f1' }}>
        <Navigation />
        
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;