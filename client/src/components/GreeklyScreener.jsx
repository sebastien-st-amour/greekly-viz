import React from 'react';
import PropTypes from 'prop-types';
import GreeklyQuery from './GreeklyQuery';
import ListGroup from 'react-bootstrap/ListGroup';


class GreeklyScreener extends React.Component {

  constructor(props) {

    super(props);
    this.changeQueryParamValue = this.changeQueryParamValue.bind(this);
  }

  changeQueryParamValue(index, value) {
    let queries = this.props.queries.slice();
    queries[index].queryParamValue = value;
    this.props.onQueriesChange(queries);
  }

  render() {

    const { queries, availableOptionTypes, availableUnderlyings } = this.props;

    const listQueries = queries.map((query, index) => {
      return (
        <ListGroup.Item key={query.queryParam.value}>
          <GreeklyQuery
            queryParam={query.queryParam}
            queryParamValue={query.queryParamValue}
            availableOptionTypes={availableOptionTypes}
            availableUnderlyings={availableUnderlyings}
            onQueryParamValueChange={(value) => this.changeQueryParamValue(index, value)}
          />
        </ListGroup.Item>
      );
    });

    return (
      <ListGroup>
        {listQueries}
      </ListGroup>
    );
  }
}

GreeklyScreener.propTypes = {
  availableUnderlyings: PropTypes.arrayOf(PropTypes.object).isRequired,
  queries: PropTypes.arrayOf(PropTypes.object).isRequired,
  onQueriesChange: PropTypes.func.isRequired,
  availableOptionTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GreeklyScreener;