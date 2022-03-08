import React from 'react';
import PropTypes from 'prop-types';
import GreeklyMultiSelector from './GreeklyMultiSelector';
import GreeklyMinMaxInput from './GreeklyMinMaxInput';
import GreeklyMinMaxDatePicker from './GreeklyMinMaxDatePicker';
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
    } else if (queryParam?.value === 'expdate') {

      valueSelector = (
        <GreeklyMinMaxDatePicker
          onChange={this.handleQueryParamValueChange}
          min={queryParamValue?.min}
          max={queryParamValue?.max}
        />
      );
    } else if (queryParam?.value) {

      valueSelector = (
        <GreeklyMinMaxInput
          key={queryParam.value}
          param={queryParam.value}
          onChange={this.handleQueryParamValueChange}
          min={queryParamValue?.min || ''}
          max={queryParamValue?.max || ''}
        />
      );
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