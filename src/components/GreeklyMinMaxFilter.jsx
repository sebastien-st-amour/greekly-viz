import React from "react";
import PropTypes from 'prop-types';
import Select from 'react-select';
// import GreeklyDatePicker from "./GreeklyDatePicker";


class GreeklyMinMaxFilter extends React.Component {

  render() {

    let selectionOptions;
    
    if (this.props.type === "date") {
      selectionOptions = [
        { value: 'min', label: 'After' },
        { value: 'max', label: 'Before' },
        { value: 'between', label: 'Between' },
      ]
    } else {
      selectionOptions = [
        { value: 'min', label: 'Greater Than' },
        { value: 'max', label: 'Less Than' },
        { value: 'between', label: 'Between' },
      ]
    }
    
    return (
      <Select
        options={selectionOptions}
        onChange={this.props.onSelect}
      />
    );
  }
}

GreeklyMinMaxFilter.propTypes = {
  onSelect: PropTypes.func,
  type: PropTypes.string,
};

export default GreeklyMinMaxFilter;