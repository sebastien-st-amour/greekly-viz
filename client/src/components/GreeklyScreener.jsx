import React from 'react';
import PropTypes from 'prop-types';
import GreeklyQuery from './GreeklyQuery';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

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
        <Container key={query.queryParam.value}>
          <Row>
            <Col>
              <GreeklyQuery
                queryParam={query.queryParam}
                queryParamValue={query?.queryParamValue}
                availableUnderlyings={availableUnderlyings}
                availableOptionTypes={availableOptionTypes}
                onQueryParamValueChange={(val) => this.changeQueryParamValue(index, val)}
              />
            </Col>
            <Col md="auto">
              <Button 
                as="input" 
                type="reset" 
                value="Reset"
                onClick={() => this.changeQueryParamValue(index, null)}
              />
            </Col>
          </Row>
        </Container>
      );
    });

    return (
      <Stack>
        {listQueries}
      </Stack>
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