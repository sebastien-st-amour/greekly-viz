import React from "react";
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';

import "react-datepicker/dist/react-datepicker.css";

class GreeklyDatePicker extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <DatePicker
            selected={this.props.selectedDate}
            onSelect={this.props.onSelect}
            placeholderText={this.props.placeholder}
          />
        </div>
      </div>
    );
  }
}

GreeklyDatePicker.propTypes = {
  selectedDate: PropTypes.object,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
};

export default GreeklyDatePicker;