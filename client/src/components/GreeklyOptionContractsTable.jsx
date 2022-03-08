import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';

const GreeklyOptionContractsTable = ({
  optionContracts,
}) => {

  const optionContractsTable = optionContracts.map(optionContract => {
    return (
      <tr key={optionContract.id}>
        <td>{optionContract.symbol}</td>
        <td>{optionContract.expiration_date}</td>
        <td>{optionContract.type}</td>
        <td>{optionContract.strike_price}</td>
        <td>{optionContract.ask_price}</td>
        <td>{optionContract.bid_price}</td>
        <td>{optionContract.delta}</td>
        <td>{optionContract.gamma}</td>
        <td>{optionContract.theta}</td>
        <td>{optionContract.vega}</td>
        <td>{optionContract.rho}</td>
      </tr>
    );
  });

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Expiration Date</th>
          <th>Type</th>
          <th>Strike Price</th>
          <th>Ask Price</th>
          <th>Bid Price</th>
          <th>Delta</th>
          <th>Gamma</th>
          <th>Theta</th>
          <th>Vega</th>
          <th>Rho</th>
        </tr>
      </thead>
      <tbody>
        {optionContractsTable}
      </tbody>
    </Table>
  );
}

GreeklyOptionContractsTable.propTypes = {
  optionContracts: PropTypes.array.isRequired,
};

export default GreeklyOptionContractsTable;