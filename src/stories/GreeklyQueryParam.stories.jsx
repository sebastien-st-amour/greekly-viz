import React from 'react';
import GreeklyQueryParam from "../components/GreeklyQueryParam";

export default {
    title: "GreeklyQueryParam",
    component: GreeklyQueryParam,
};

const Template = (args) => <GreeklyQueryParam {...args} />;

export const DateQuery = Template.bind({});
DateQuery.args = {
    type: "date",
};

export const CurrencyQuery = Template.bind({});
CurrencyQuery.args = {
    type: "currency",
};

export const SingleSelectionQuery = Template.bind({});
SingleSelectionQuery.args = {
    type: "single",
};

export const MultiSelectionQuery = Template.bind({});
MultiSelectionQuery.args = {
    type: "multi",
};

export const FloatQuery = Template.bind({});
FloatQuery.args = {
    type: "float",
};

export const PercentQuery = Template.bind({});
PercentQuery.args = {
    type: "percent",
};