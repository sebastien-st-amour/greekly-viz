import React, { useState } from 'react';
import GreeklyQuery from "../components/GreeklyQuery";

export default {
  title: "GreeklyQuery",
  component: GreeklyQuery,
};

const queryOptions = [
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

  const [queryParam, setQueryParam] = useState(null);
  const [queryParamValue, setQueryParamValue] = useState(null);

  return (
    <GreeklyQuery 
      availableUnderlyings={availableUnderlyings}
      queryParam={queryParam}
      onQueryParamChange={setQueryParam}
      queryParamValue={queryParamValue}
      onQueryParamValueChange={setQueryParamValue}
      queryOptions={queryOptions}
      availableOptionTypes={availableOptionTypes}
    />
  );
};