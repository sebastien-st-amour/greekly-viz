import React from 'react';
import { useState, useEffect } from 'react';
import GreeklyScreener from "./GreeklyScreener";
import GreeklyOptionContractsTable from './GreeklyOptionContractsTable';
import GreeklyPagination from './GreeklyPagination';
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

const GreeklyHome = () => {

  const [leftQueries, setLeftQueries] = useState(leftQueryParams);
  const [rightQueries, setRightQueries] = useState(rightQueryParams);
  const [underlyings, setUnderlyings] = useState([]);
  const [optionContracts, setOptionContracts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchOptionContracts = ({params}) => {
    fetch(`/api/option_contracts?${params}&page=${currentPage}`)
      .then(res => res.json())
      .then(optionContracts => {
        setOptionContracts(optionContracts.items);
        setTotalResults(optionContracts.total_items);
        setTotalPages(optionContracts.total_pages);
      })
      .catch(err => console.log(err))
  }

  const fetchStocks = () => {
    fetch(`/api/stocks`)
      .then(res => res.json())
      .then(stocks => setUnderlyings(stocks.map(stock => ({ value: stock.id, label: stock.description }))))
      .catch(err => console.log(err))
  }

  const generateQueryString = () => {
    let queries = leftQueries.concat(rightQueries);

    let queryString = queries.reduce((acc, query) => {
      
      if (query.queryParamValue) {
        
        acc.push(`${query.queryParam.value}=${formatQueryParamValue(query.queryParamValue)}`)

        console.log(acc)
      }
      return acc;
    }, []).join('&');

    return queryString;
  }

  const updateScreenerResults = () => {
    fetchOptionContracts({params: generateQueryString()});
    fetchStocks();
  }

  useEffect(() => {
    setCurrentPage(1);
    updateScreenerResults();
  }, [leftQueries, rightQueries]);

  useEffect(() => {

    updateScreenerResults();
    
  }, [currentPage]);

  return (
    <>
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
      <span>Total Results: {totalResults}</span>
      <GreeklyOptionContractsTable
        optionContracts={optionContracts}
      />
      <GreeklyPagination
        page={currentPage}
        totalPages={totalPages}
        onSelect={setCurrentPage}
      />
    </>
  );
}

export default GreeklyHome;
