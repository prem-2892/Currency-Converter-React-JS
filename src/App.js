import { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./components/currencyRow";
import "bootstrap/dist/css/bootstrap.min.css";
import Error from "./components/error";

function App() {
    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [fromCurrency, setFromCurrency] = useState("");
    const [toCurrency, setToCurrency] = useState();
    const [exchangeRate, setExchangeRate] = useState(1);
    const [amount, setAmount] = useState(1);
    const [result, setResult] = useState(1);
    const [error, setError] = useState(false);

    const BASE_URL = "https://api.exchangerate.host/latest";
    // const BASE_URL = "https://api.exchangeratesapi.io/latest";

    useEffect(() => {
        fetch(BASE_URL)
            .then((res) => res.json())
            .then((data) => {
                const firstCurrency = Object.keys(data.rates)[0];
                setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
                setToCurrency(firstCurrency);
                setFromCurrency(data.base);
                setExchangeRate(data.rates[firstCurrency]);
            });
    }, []);

    useEffect(() => {
        // console.log(fromCurrency, toCurrency);

        if (fromCurrency != null && toCurrency != null) {
            fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
                .then((res) => res.json())
                .then((data) => setExchangeRate(data.rates[toCurrency]));
        }

        if (toCurrency === fromCurrency) {
            setError(true);
        } else {
            setError(false);
        }
    }, [fromCurrency, toCurrency]);

    useEffect(() => {
        setResult(amount * exchangeRate);
    }, [amount, exchangeRate]);

    // console.log(exchangeRate);

    return (
        <>
            <h4 className="display-6 mb-3">Currency Converter</h4>
            <div className="App container-fluid">
                <Error isError={error} />
                <CurrencyRow
                    currencyOptions={currencyOptions}
                    selectedCurrency={fromCurrency}
                    onChangeCurrency={(e) => setFromCurrency(e.target.value)}
                />
                <div className="spacer"></div>
                <CurrencyRow
                    currencyOptions={currencyOptions}
                    selectedCurrency={toCurrency}
                    onChangeCurrency={(e) => setToCurrency(e.target.value)}
                />
                <input
                    className="input mt-4 form-control"
                    type="number"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                ></input>
                <h3 className="result alert alert-success">{result}</h3>
            </div>
        </>
    );
}

export default App;
