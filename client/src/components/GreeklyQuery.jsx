import React from 'react';
import PropTypes from 'prop-types';
import GreeklyMultiSelector from './GreeklyMultiSelector';
import GreeklyDatePicker from "./GreeklyDatePicker";
import Select from 'react-select';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class GreeklyQuery extends React.Component {

  constructor(props) {
    super(props);
    this.handleQueryParamValueChange = this.handleQueryParamValueChange.bind(this);
  }

  handleQueryParamValueChange(selected) {
    this.props.onQueryParamValueChange(selected);
  }

  render() {

    const { queryParam, queryParamValue } = this.props;

    let valueSelector;
    if (queryParam?.value === 'underlying') {

      valueSelector = (
        <GreeklyMultiSelector
          options={this.props.availableUnderlyings}
          onSelect={this.handleQueryParamValueChange}
        />
      );
    } else if (queryParam?.value === 'type') {

      valueSelector = (
        <Select
          options={this.props.availableOptionTypes}
          onChange={this.handleQueryParamValueChange}
        />
      );
    } else if (queryParam?.value.includes('expdate')) {

      valueSelector = <GreeklyDatePicker selectedDate={queryParamValue} onSelect={this.handleQueryParamValueChange}/>;
    } else if (queryParam?.value) {

      valueSelector = <input type="number" value={queryParamValue} onChange={(e) => this.handleQueryParamValueChange(e.target.value)}/>;
    }

    return (
      <Container>
        <Row>
          <Col>
            {queryParam?.label}
          </Col>
          <Col>
            {valueSelector}
          </Col>
        </Row>
      </Container>
    );
  }
}

GreeklyQuery.propTypes = {
  availableUnderlyings: PropTypes.arrayOf(PropTypes.object).isRequired,
  queryParam: PropTypes.object,
  onQueryParamValueChange: PropTypes.func.isRequired,
  queryParamValue: PropTypes.object,
  availableOptionTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GreeklyQuery;