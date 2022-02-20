// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import GreeklyScreener from "./components/GreeklyScreener";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const queryParamOptions = [
  { value: 'expdate', label: 'Exp. Date' },
  { value: 'bidprice', label: 'Bid Price' },
  { value: 'askprice', label: 'Ask Price' },
  { value: 'underlying', label: 'Underlying' },
  { value: 'strike', label: 'Strike' },
  { value: 'volatility', label: 'Volatility' },
  { value: 'theta', label: 'Theta' },
  { value: 'delta', label: 'Delta' },
  { value: 'gamma', label: 'Gamma' },
  { value: 'vega', label: 'Vega' },
  { value: 'rho', label: 'Rho' },
  { value: 'type', label: 'Option Type' },
]

const availableUnderlyings = [
  { value: 'AAPL', label: 'Apple' },
  { value: 'MSFT', label: 'Microsoft' },
  { value: 'GOOG', label: 'Google' },
  { value: 'FB', label: 'Facebook' },
  { value: 'AMZN', label: 'Amazon' },
]

const availableOptionTypes = [
  { value: 'call', label: 'Call' },
  { value: 'put', label: 'Put' },
]


function App() {

  const [queries, setQueries] = useState([]);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Greekly</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <GreeklyScreener
        availableUnderlyings={availableUnderlyings}
        queries={queries}
        onQueriesChange={setQueries}
        queryParamOptions={queryParamOptions}
        availableOptionTypes={availableOptionTypes}
      />
    </>
  );
}

export default App;
