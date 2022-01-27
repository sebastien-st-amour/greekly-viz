import React from 'react';
import PropTypes from 'prop-types';
import GreeklyMultiSelector from './GreeklyMultiSelector';
import GreeklyMinMaxFilter from './GreeklyMinMaxFilter';
import Select from 'react-select';

class GreeklyQueryParam extends React.Component {

	render() {

		if (this.props.type === "multi") {

			return (
				<GreeklyMultiSelector
					options={this.props.options}
					onSelect={this.props.onSelect}
				/>
			);
		}

		if (this.props.type === "single") {

			return (
				<Select
					options={this.props.options}
					onChange={this.props.onSelect}
				/>
			)
		}

		return (
			<GreeklyMinMaxFilter
				onSelect={this.props.onSelect}
				type={this.props.type}
			/>
		);
	}
}

GreeklyQueryParam.propTypes = {
	type: PropTypes.string,
	options: PropTypes.array,
	onSelect: PropTypes.func,
};

export default GreeklyQueryParam;