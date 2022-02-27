import React from 'react';
import PropTypes from 'prop-types';
import GreeklyQuery from './GreeklyQuery';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';
import Stack from 'react-bootstrap/Stack';

class GreeklyScreener extends React.Component {

  constructor(props) {

    super(props);
    this.deleteQuery = this.deleteQuery.bind(this);
    this.changeQueryParamValue = this.changeQueryParamValue.bind(this);
    this.changeQueryParam = this.changeQueryParam.bind(this);
    this.addQuery = this.addQuery.bind(this);
  }

  deleteQuery(index) {
    let queries = this.props.queries.slice();
    queries.splice(index, 1);
    this.props.onQueriesChange(queries);
  }

  changeQueryParamValue(index, value) {
    let queries = this.props.queries.slice();
    queries[index].queryParamValue = value;
    this.props.onQueriesChange(queries);
  }

  changeQueryParam(index, param) {
    let queries = this.props.queries.slice();
    queries[index].queryParam = param;
    queries[index].queryParamValue = null;
    this.props.onQueriesChange(queries);
  }

  addQuery(param) {
    let queries = this.props.queries.slice();
    queries.push({
      queryParam: param,
      queryParamValue: null,
    });
    this.props.onQueriesChange(queries);
  }

  render() {

    const { queries, queryParamOptions, availableOptionTypes, availableUnderlyings } = this.props;

    const filteredQueryOptions = queryParamOptions.filter(param => {

      return !queries.find(query => query.queryParam.value === param.value);
    });

    const listQueries = queries.map((query, index) => {
      return (
        <Container key={query.queryParam.value}>
          <Row>
            <Col md="auto">
              <CloseButton onClick={() => this.deleteQuery(index)}/>
            </Col>
            <Col>
              <GreeklyQuery
                queryOptions={filteredQueryOptions}
                queryParam={query.queryParam}
                queryParamValue={query?.queryParamValue}
                availableUnderlyings={availableUnderlyings}
                availableOptionTypes={availableOptionTypes}
                onQueryParamChange={(param) => this.changeQueryParam(index, param)}
                onQueryParamValueChange={(val) => this.changeQueryParamValue(index, val)}
              />
            </Col>
          </Row>
        </Container>
      );
    });

    return (
      <Stack>
        {listQueries}
        <GreeklyQuery
          key={`greeklyQueries_${this.props.queries.length}`}
          queryOptions={filteredQueryOptions}
          availableUnderlyings={availableUnderlyings}
          availableOptionTypes={availableOptionTypes}
          onQueryParamChange={(param) => this.addQuery(param)}
          onQueryParamValueChange={(val) => console.log(val)}
        />
      </Stack>
    );
  }
}

GreeklyScreener.propTypes = {
  availableUnderlyings: PropTypes.arrayOf(PropTypes.object).isRequired,
  queryParamOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  queries: PropTypes.arrayOf(PropTypes.object).isRequired,
  onQueriesChange: PropTypes.func.isRequired,
  availableOptionTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GreeklyScreener;