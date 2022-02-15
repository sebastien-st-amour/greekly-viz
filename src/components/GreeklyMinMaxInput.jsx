import React from "react";
import PropTypes from 'prop-types';
import Select from 'react-select';




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

    this.setState({
      selectedFilter: selected,
    });
  }

  render() {

    const filterOptions = [
      { value: 'min', label: 'greater than' },
      { value: 'max', label: 'less than' },
      { value: 'between', label: 'between' },
    ];

    const { selectedFilter } = this.state;

    let aggregateValueSelector;

    if (selectedFilter?.value === 'between') {

      aggregateValueSelector = (
        <div>
          <div>
            <label>Min</label>
            <input type="number" value={this.props.min} onChange={(e) => this.handleMinChange(e.target.value)}/>
          </div>
          <div>
            <label>Max</label>
            <input type="number" value={this.props.max} onChange={(e) => this.handleMaxChange(e.target.value)}/>
          </div>
        </div>
      );
    } else if (selectedFilter?.value === 'min') {
      aggregateValueSelector = <input type="number" value={this.props.min} onChange={(e) => this.handleMinChange(e.target.value)}/>
    } else if (selectedFilter?.value === 'max') {
      aggregateValueSelector = <input type="number" value={this.props.max} onChange={(e) => this.handleMaxChange(e.target.value)}/>
    }
    
    return (
      <div style={{'display':'inline-flex'}}>
        <Select
          options={filterOptions}
          onChange={this.handleFilterChange}
        />
        <div>
          {aggregateValueSelector}
        </div>
      </div>
    );
  }
}

GreeklyMinMaxInput.propTypes = {
  onChange: PropTypes.func,
  param: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default GreeklyMinMaxInput;