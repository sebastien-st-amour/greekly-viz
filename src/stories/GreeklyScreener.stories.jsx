import React, { useState } from 'react';
import GreeklyScreener from "../components/GreeklyScreener";

export default {
  title: "GreeklyScreener",
  component: GreeklyScreener,
};

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

export const Default = () => {

  const [queries, setQueries] = useState([]);

  return (
    <GreeklyScreener
      availableUnderlyings={availableUnderlyings}
      queries={queries}
      onQueriesChange={setQueries}
      queryParamOptions={queryParamOptions}
      availableOptionTypes={availableOptionTypes}
    />
  );
};