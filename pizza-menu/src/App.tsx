import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Routes } from 'react-router-dom';
import AddPizzaPage from './pages/AddPizzaPage';
import EditPizzaPage from './pages/EditPizzaPage';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
        <Container>
          <Navbar.Brand as={Link} to="/">
            🍕 Pizza Menu
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/add-pizza">Add Pizza</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-pizza" element={<AddPizzaPage />} />
          {/* As requested, edit route is /:pizzaId */}
          <Route path="/:pizzaId" element={<EditPizzaPage />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
