import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [rates, setRates] = useState([]);
  const API_KEY = "72a2478fe8d94a3d927d47c8b4f4742e"; // Ganti dengan API Key Anda dari CurrencyFreaks

  useEffect(() => {
    // Fetch data dari API CurrencyFreaks
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          `https://api.currencyfreaks.com/latest?apikey=${API_KEY}`
        );
        const data = response.data.rates;
        // Filter hanya mata uang yang diperlukan
        const currencies = ["CAD", "IDR", "JPY", "CHF", "EUR", "GBP"];
        const filteredRates = currencies.map((currency) => {
          const exchangeRate = parseFloat(data[currency]);
          return {
            currency,
            exchangeRate,
            buyRate: (exchangeRate * 1.05).toFixed(4),
            sellRate: (exchangeRate * 0.95).toFixed(4),
          };
        });
        setRates(filteredRates);
      } catch (error) {
        console.error("Error fetching currency rates:", error);
      }
    };
    fetchRates();
  }, []);

  return (
    <div className="App">
      <h1>Rate Currency</h1>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate) => (
            <tr key={rate.currency}>
              <td>{rate.currency}</td>
              <td>{rate.buyRate}</td>
              <td>{rate.exchangeRate.toFixed(4)}</td>
              <td>{rate.sellRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Rates are based on 1 USD.</p>
      <p>This application uses API from https://currencyfreaks.com</p>
    </div>
  );
}

export default App;
