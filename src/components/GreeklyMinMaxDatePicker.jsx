import React from "react";
import PropTypes from 'prop-types';
import Select from 'react-select';
import GreeklyDatePicker from "./GreeklyDatePicker";


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

    this.setState({
      selectedFilter: selected,
    });
  }

  render() {

    const filterOptions = [
      { value: 'min', label: 'after' },
      { value: 'max', label: 'before' },
      { value: 'between', label: 'between' },
    ];

    const { selectedFilter } = this.state;

    let aggregateValueSelector;

    if (selectedFilter?.value === 'between') {

      aggregateValueSelector = (
        <div>
          <div>
            <label>Min</label>
            <GreeklyDatePicker selectedDate={this.props.min} onSelect={this.handleMinChange}/>
          </div>
          <div>
            <label>Max</label>
            <GreeklyDatePicker selectedDate={this.props.max} onSelect={this.handleMaxChange}/>
          </div>
        </div>
      );
    } else if (selectedFilter?.value === 'min') {
      aggregateValueSelector = <GreeklyDatePicker selectedDate={this.props.min} onSelect={this.handleMinChange}/>
    } if (selectedFilter?.value === 'max') {
      aggregateValueSelector = <GreeklyDatePicker selectedDate={this.props.max} onSelect={this.handleMaxChange}/>
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

GreeklyMinMaxDatePicker.propTypes = {
  onChange: PropTypes.func,
  min: PropTypes.object,
  max: PropTypes.object,
};

export default GreeklyMinMaxDatePicker;