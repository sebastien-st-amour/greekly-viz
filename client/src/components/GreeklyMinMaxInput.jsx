import React from "react";
import PropTypes from 'prop-types';
import Select from 'react-select';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class GreeklyMinMaxInput extends React.Component {

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
      { value: 'min', label: 'greater than' },
      { value: 'max', label: 'less than' },
      { value: 'between', label: 'between' },
    ];

    let aggregateValueSelector;

    if (selectedFilter?.value === 'between') {

      aggregateValueSelector = (
        <div style={{'display':'inline-flex'}}>
          <input type="number" value={this.props.min} onChange={(e) => this.handleMinChange(e.target.value)}/>
          <span> and </span>
          <input type="number" value={this.props.max} onChange={(e) => this.handleMaxChange(e.target.value)}/>
        </div>
      );

    } else if (selectedFilter?.value === 'min') {

      aggregateValueSelector = <input type="number" value={this.props.min} onChange={(e) => this.handleMinChange(e.target.value)}/>
    
    } else if (selectedFilter?.value === 'max') {

      aggregateValueSelector = <input type="number" value={this.props.max} onChange={(e) => this.handleMaxChange(e.target.value)}/>
    
    }
    
    return (
      <Container>
        <Row>
          <Col>
            <Select
              options={filterOptions}
              value={selectedFilter}
              onChange={this.handleFilterChange}
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

GreeklyMinMaxInput.propTypes = {
  onChange: PropTypes.func,
  param: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
};

export default GreeklyMinMaxInput;