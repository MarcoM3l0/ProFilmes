import axios from "axios"
import { useState, useEffect } from "react"

import "../pages/Movie.css" 

const baseURL = 'https://economia.awesomeapi.com.br/last/USD-BRL'

const CurrencyConverter = ({ movirNumber }) => {

    const [quotation, setQuotation] = useState([])

    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setQuotation(response.data.USDBRL.bid);
        });
    }, []);

    const quoteNumber = Number(quotation) * movirNumber

    // ---------------------------------------
    const formatCurrency = (number) => {
        return number.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        })
    }

    const formatCurrencyBr = (number) => {
        return number.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })
    }

  return (
    <div className="movie-page">
        <p>{formatCurrency(movirNumber)}</p>
        <p>{formatCurrencyBr(quoteNumber)} cotação atual</p>
    </div>
  )
}
export default CurrencyConverter