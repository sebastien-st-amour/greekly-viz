import React, { useState } from 'react';
import GreeklyMultiSelector from "./GreeklyMultiSelector";

export default {
    title: "GreeklyMultiSelector",
    component: GreeklyMultiSelector,
};

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

export const Default = () => {
  
  const [selectedOptions, setSelectedOptions] = useState([]);

  console.log('selected', selectedOptions);

  return (
    <GreeklyMultiSelector
      options={options}
      onSelect={(selected) => setSelectedOptions(selected)}
    />
  );
}