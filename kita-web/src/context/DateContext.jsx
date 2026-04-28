import React, { createContext, useState, useContext } from 'react';

const DateContext = createContext();

export const DateProvider = ({ children }) => {
    const now = new Date();
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());

    // Helper to get month options (shared between components)
    const getMonthOptions = () => {
        const options = [];
        for (let i = 0; i < 12; i++) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            options.push({
                label: date.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
                month: date.getMonth(),
                year: date.getFullYear()
            });
        }
        return options;
    };

    const value = {
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
        monthOptions: getMonthOptions()
    };

    return (
        <DateContext.Provider value={value}>
            {children}
        </DateContext.Provider>
    );
};

export const useDate = () => {
    const context = useContext(DateContext);
    if (!context) {
        throw new Error('useDate must be used within a DateProvider');
    }
    return context;
};
