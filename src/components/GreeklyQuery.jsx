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
    this.handleQueryParamChange = this.handleQueryParamChange.bind(this);
    this.handleQueryParamValueChange = this.handleQueryParamValueChange.bind(this);

    this.state = {
      selectedQueryParam: null,
      queryParamValue: null,
    };
  }

  handleQueryParamChange(selected) {
    this.setState({
      selectedQueryParam: selected,
      queryParamValue: null,
    });
  }

  handleQueryParamValueChange(selected) {
    this.setState({
      queryParamValue: selected,
    });
  }

  render() {

    const { selectedQueryParam, queryParamValue } = this.state;

    let valueSelector;
    if (selectedQueryParam?.value === 'underlying') {

      valueSelector = (
        <GreeklyMultiSelector
          options={this.props.availableUnderlyings}
          onSelect={this.handleQueryParamValueChange}
        />
      );
    } else if (selectedQueryParam?.value === 'type') {

      valueSelector = (
        <Select
          options={this.props.availableOptionTypes}
          onChange={this.handleQueryParamValueChange}
        />
      );
    } else if (selectedQueryParam?.value === 'expdate') {

      valueSelector = (
        <GreeklyMinMaxDatePicker
          onChange={this.handleQueryParamValueChange}
          min={queryParamValue?.min}
          max={queryParamValue?.max}
        />
      );
    } else if (selectedQueryParam?.value) {

      valueSelector = (
        <GreeklyMinMaxInput
          key={selectedQueryParam.value}
          param={selectedQueryParam.value}
          onChange={this.handleQueryParamValueChange}
          min={queryParamValue?.min || 0}
          max={queryParamValue?.max || Math.pow(10, 1000)}
        />
      );
    }

    return (
      <Container>
        <Row>
          <Col>
            <Select
              options={this.props.queryOptions}
              onChange={this.handleQueryParamChange}
            />
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
  queryOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  availableOptionTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GreeklyQuery;