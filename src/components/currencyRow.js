import React from "react";

export default function currencyRow(props) {
    const { currencyOptions, selectedCurrency, onChangeCurrency } = props;

    return (
        <div>
            <select
                className="form-select"
                value={selectedCurrency}
                onChange={onChangeCurrency}
            >
                {currencyOptions.map((option) => (
                    <option key={Math.random()} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
