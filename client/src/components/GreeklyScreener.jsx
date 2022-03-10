import React from 'react';
import PropTypes from 'prop-types';
import GreeklyQuery from './GreeklyQuery';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
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

    const half = Math.ceil(queries.length / 2);

    const leftQueries = queries.slice(0, half);
    const rightQueries = queries.slice(half);


    const listLeftQueries = leftQueries.map((query, index) => {
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

    const listRightQueries = rightQueries.map((query, index) => {
      return (
        <ListGroup.Item key={query.queryParam.value}>
          <GreeklyQuery
            queryParam={query.queryParam}
            queryParamValue={query.queryParamValue}
            availableOptionTypes={availableOptionTypes}
            availableUnderlyings={availableUnderlyings}
            onQueryParamValueChange={(value) => this.changeQueryParamValue(index + half, value)}
          />
        </ListGroup.Item>
      );
    });

    return (
      <CardGroup>
        <Card>
          <ListGroup>
            {listLeftQueries}
          </ListGroup>
        </Card>
        <Card>
          <ListGroup>
            {listRightQueries}
          </ListGroup>
        </Card>
      </CardGroup>
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