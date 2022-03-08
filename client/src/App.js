// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import GreeklyScreener from "./components/GreeklyScreener";
import GreeklyOptionContractsTable from './components/GreeklyOptionContractsTable';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

let queryParams = [
  {
    queryParam: { value: 'expdate', label: 'Exp. Date' },
    queryParamValue: null
  },
  {
    queryParam: { value: 'strike', label: 'Strike' },
    queryParamValue: null
  },
  {
    queryParam: { value: 'type', label: 'Option Type' },
    queryParamValue: null
  },
  {
    queryParam: { value: 'theta', label: 'Theta' },
    queryParamValue: null
  },
  {
    queryParam: { value: 'delta', label: 'Delta' },
    queryParamValue: null
  },
  {
    queryParam: { value: 'gamma', label: 'Gamma' },
    queryParamValue: null
  },
  {
    queryParam: { value: 'vega', label: 'Vega' },
    queryParamValue: null
  },
  {
    queryParam: { value: 'rho', label: 'Rho' },
    queryParamValue: null
  },
  {
    queryParam: { value: 'askprice', label: 'Ask Price' },
    queryParamValue: null
  },
  {
    queryParam: { value: 'bidprice', label: 'Bid Price' },
    queryParamValue: null
  },
  {
    queryParam: { value: 'underlying', label: 'Underlying' },
    queryParamValue: null
  },
  {
    queryParam: { value: 'volatility', label: 'Volatility' },
    queryParamValue: null
  },
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

  const [queries, setQueries] = useState(queryParams);
  // const [stocks, setStocks] = useState([]);
  const [optionContracts, setOptionContracts] = useState([]);

  console.log('queries', queries);
  // const fetchStocks = () => {
  //   fetch('/api/stocks')
  //     .then(res => res.json())
  //     .then(stocks => setStocks(stocks))
  //     .catch(err => console.log(err))
  // }

  const fetchOptionContracts = ({params}) => {
    fetch(`/api/option_contracts?${params}`)
      .then(res => res.json())
      .then(optionContracts => setOptionContracts(optionContracts.items))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    // fetchStocks();
    fetchOptionContracts({params: 'type=C&max_theta=0&min_theta'});
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
        availableOptionTypes={availableOptionTypes}
      />
      <GreeklyOptionContractsTable
        optionContracts={optionContracts}
      />
    </>
  );
}

export default App;
