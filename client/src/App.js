// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
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
  const [stocks, setStocks] = useState([]);
  const [optionContracts, setOptionContracts] = useState([]);

  const fetchStocks = () => {
    fetch('/api/stocks')
      .then(res => res.json())
      .then(stocks => setStocks(stocks))
      .catch(err => console.log(err))
  }

  const fetchOptionContracts = ({params}) => {
    fetch(`/api/option_contracts?${params}`)
      .then(res => res.json())
      .then(optionContracts => setOptionContracts(optionContracts.items))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchStocks();
    fetchOptionContracts({params: 'page=1'});
  }, []);

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
      <div>
        {stocks.map(stock => (
          <div key={stock.ticker}>
            <h3>{stock.ticker}</h3>
            <p>{stock.description}</p>
          </div>))
          }
      </div>
      <div>
        {optionContracts.map(option => (
          <div key={option.id}>
            <p>{option.expiration_date}</p>
            <p>{option.strike_price}</p>
          </div>))
          }
      </div>
    </>
  );
}

export default App;
