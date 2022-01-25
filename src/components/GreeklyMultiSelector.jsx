import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';


class GreeklyMultiSelector extends React.Component {

  render() {

    return (
      <Select
        options={this.props.options}
        onChange={this.props.onSelect}
        isMulti
      />
    );
  }
}

GreeklyMultiSelector.propTypes = {
  options: PropTypes.array,
  onSelect: PropTypes.func,
};

export default GreeklyMultiSelector;