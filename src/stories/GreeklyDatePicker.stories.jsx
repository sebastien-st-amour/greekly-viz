import React, { useState } from 'react';
import GreeklyDatePicker from "../components/GreeklyDatePicker";

export default {
    title: "GreeklyDatePicker",
    component: GreeklyDatePicker,
};

export const Default = () => {

    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <GreeklyDatePicker
            selectedDate={selectedDate}
            onSelect={(date) => setSelectedDate(date)}
            placeholder="Select a date"
        />
    );
}