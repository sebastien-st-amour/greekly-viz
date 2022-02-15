import React from "react";
import PropTypes from 'prop-types';
import Select from 'react-select';
import GreeklyDatePicker from "./GreeklyDatePicker";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class GreeklyMinMaxDatePicker extends React.Component {

  constructor(props) {
    
    super(props);
    this.handleMinChange = this.handleMinChange.bind(this);
    this.handleMaxChange = this.handleMaxChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);

    this.state = {
      selectedFilter: null,
    };
  }

  handleMinChange(selected) {
    
    this.props.onChange({
      min: selected,
      max: this.props.max,
    });
  }

  handleMaxChange(selected) {
    
    this.props.onChange({
      max: selected,
      min: this.props.min,
    });
  }

  handleFilterChange(selected) {

    this.props.onChange({
      min: null,
      max: null,
    });

    this.setState({
      selectedFilter: selected,
    });
  }

  render() {

    const { selectedFilter } = this.state;

    const filterOptions = [
      { value: 'min', label: 'after' },
      { value: 'max', label: 'before' },
      { value: 'between', label: 'between' },
    ];

    let aggregateValueSelector;

    if (selectedFilter?.value === 'between') {

      aggregateValueSelector = (
        <div style={{'display':'inline-flex'}}>
          <GreeklyDatePicker selectedDate={this.props.min} onSelect={this.handleMinChange}/>
          <span> and </span>
          <GreeklyDatePicker selectedDate={this.props.max} onSelect={this.handleMaxChange}/>
        </div>
      );
    } else if (selectedFilter?.value === 'min') {
      aggregateValueSelector = <GreeklyDatePicker selectedDate={this.props.min} onSelect={this.handleMinChange}/>
    } if (selectedFilter?.value === 'max') {
      aggregateValueSelector = <GreeklyDatePicker selectedDate={this.props.max} onSelect={this.handleMaxChange}/>
    }
    
    return (
      <Container>
        <Row>
          <Col>
            <Select
              value={selectedFilter}
              onChange={this.handleFilterChange}
              options={filterOptions}
            />
          </Col>
          <Col>
            {aggregateValueSelector}
          </Col>
        </Row>
      </Container>
    );
  }
}

GreeklyMinMaxDatePicker.propTypes = {
  onChange: PropTypes.func,
  min: PropTypes.object,
  max: PropTypes.object,
};

export default GreeklyMinMaxDatePicker;