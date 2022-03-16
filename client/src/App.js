// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import GreeklyScreener from "./components/GreeklyScreener";
import GreeklyOptionContractsTable from './components/GreeklyOptionContractsTable';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';

let leftQueryParams = [
  {
    queryParam: { value: 'min_expiration', label: 'Min Exp. Date' },
    queryParamValue: null
  },
  {
    queryParam: { value: 'min_strike', label: 'Min Strike Price' },
    queryParamValue: ''
  },
  {
    queryParam: { value: 'min_theta', label: 'Min Theta' },
    queryParamValue: ''
  },
  {
    queryParam: { value: 'min_delta', label: 'Min Delta' },
    queryParamValue: ''
  },
  {
    queryParam: { value: 'min_gamma', label: 'Min Gamma' },
    queryParamValue: ''
  },
  {
    queryParam: { value: 'min_vega', label: 'Min Vega' },
    queryParamValue: ''
  },
  {
    queryParam: { value: 'min_rho', label: 'Min Rho' },
    queryParamValue: ''
  },
  {
    queryParam: { value: 'min_ask_price', label: 'Min Ask Price' },
    queryParamValue: ''
  },
  {
    queryParam: { value: 'min_bid_price', label: 'Min Bid Price' },
    queryParamValue: ''
  },
  {
    queryParam: { value: 'min_volatility', label: 'Min Volatility' },
    queryParamValue: ''
  },
  {
    queryParam: { value: 'type', label: 'Option Type' },
    queryParamValue: null
  },
];

let rightQueryParams = [
  {
    queryParam: { value: 'max_expiration', label: 'Max Exp. Date' },
    queryParamValue: null
  },
  {
    queryParam: { value: 'max_strike', label: 'Max Strike Price' },
    queryParamValue: ''
  },
  {
    queryParam: { value: 'max_theta', label: 'Max Theta' },
    queryParamValue: ''
  },

  {
    queryParam: { value: 'max_delta', label: 'Max Delta' },
    queryParamValue: ''
  },

  {
    queryParam: { value: 'max_gamma', label: 'Max Gamma' },
    queryParamValue: ''
  },

  {
    queryParam: { value: 'max_vega', label: 'Max Vega' },
    queryParamValue: ''
  },
  {
    queryParam: { value: 'max_rho', label: 'Max Rho' },
    queryParamValue: ''
  },
  {
    queryParam: { value: 'max_ask_price', label: 'Max Ask Price' },
    queryParamValue: ''
  },
  {
    queryParam: { value: 'max_bid_price', label: 'Max Bid Price' },
    queryParamValue: ''
  },
  {
    queryParam: { value: 'max_volatility', label: 'Max Volatility' },
    queryParamValue: ''
  },
  {
    queryParam: { value: 'underlying', label: 'Underlying' },
    queryParamValue: null
  },
]

const availableOptionTypes = [
  { value: 'C', label: 'Call' },
  { value: 'P', label: 'Put' },
]

function App() {

  const [leftQueries, setLeftQueries] = useState(leftQueryParams);
  const [rightQueries, setRightQueries] = useState(rightQueryParams);
  const [underlyings, setUnderlyings] = useState([]);
  const [optionContracts, setOptionContracts] = useState([]);

  const fetchOptionContracts = ({params}) => {
    fetch(`/api/option_contracts?${params}`)
      .then(res => res.json())
      .then(optionContracts => setOptionContracts(optionContracts.items))
      .catch(err => console.log(err))
  }

  const fetchStocks = () => {
    fetch(`/api/stocks`)
      .then(res => res.json())
      .then(stocks => setUnderlyings(stocks.map(stock => ({ value: stock.id, label: stock.description }))))
      .catch(err => console.log(err))
  }

  const formatQueryParamValue = (queryParamValue) => {

    let value;
    
    if (Array.isArray(queryParamValue)) {
      
      value = queryParamValue.reduce((acc, val) => {
        acc.push(val.value)
        return acc
      }, []).join(',')
    
    } else if (queryParamValue.value) {

      value = queryParamValue.value

    } else if (queryParamValue instanceof Date) {
      
      value = queryParamValue.toISOString().split('T')[0]

    } else {

      value = queryParamValue

    }

    return value
  }

  useEffect(() => {

    let queries = leftQueries.concat(rightQueries);

    let params = queries.reduce((acc, query) => {
      
      if (query.queryParamValue) {
        
        acc.push(`${query.queryParam.value}=${formatQueryParamValue(query.queryParamValue)}`)

        console.log(acc)
      }
      return acc;
    }, []).join('&');

    fetchOptionContracts({params});
    fetchStocks();
    
  }, [leftQueries, rightQueries]);

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
      <CardGroup className='mt-5 mb-5'>
        <Card>
          <GreeklyScreener
            availableUnderlyings={underlyings}
            queries={leftQueries}
            onQueriesChange={setLeftQueries}
            availableOptionTypes={availableOptionTypes}
          />
        </Card>
        <Card>
          <GreeklyScreener
            availableUnderlyings={underlyings}
            queries={rightQueries}
            onQueriesChange={setRightQueries}
            availableOptionTypes={availableOptionTypes}
          />
        </Card>
      </CardGroup>
      <GreeklyOptionContractsTable
        optionContracts={optionContracts}
      />
    </>
  );
}

export default App;
