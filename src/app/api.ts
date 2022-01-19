import axios from "axios";

// @ts-ignore
const localeCurrency = require('locale-currency').getCurrency(window.navigator.userLanguage || window.navigator.language);

export interface CurrentRates {
  success: true;
  timestamp: number;
  base: string;
  date: string;
  rates: { [key: string]: number };
}

export interface ConvertedСurrency {
  success: true;
  query: {
    from: string;
    to: string;
    amount: number;
  },
  info: {
    timestamp: number;
    rate: number;
  },
  historical: boolean | "";
  date: string;
  result: number;
}

export interface ErrorResponse {
  success: false;
  error: {
    code: number;
    info: string;
  }
}

axios.defaults.baseURL = "https://api.exchangeratesapi.io/v1/";
axios.defaults.headers.get = { "Content-type": "application/json" };
axios.defaults.params = { access_key: process.env.REACT_APP_API_ACCESS_KEY };
axios.defaults.timeout = 3000;

export async function fetchСonvertСurrency(amount: string, from: string, to: string) {
  return await axios.get('/convert', {
    params: {
      from,
      to,
      amount,
    }
  });

  // return new Promise<{ data: ConvertedСurrency }>((resolve) =>
  //   setTimeout(() => resolve({
  //     data: {
  //       "success": true,
  //       "query": {
  //         from,
  //         to,
  //         "amount": +amount,
  //       },
  //       "info": {
  //         "timestamp": 1519328414,
  //         "rate": 148.972231
  //       },
  //       "historical": "",
  //       "date": "2018-02-22",
  //       "result": 3724.305775,
  //     }
  //   }), 500)
  // );
}

export async function fetchCurrentRate(baseCurrency = localeCurrency) {

  return await axios.get('/latest', {
    params: {
      base: baseCurrency,
    }
  });

  // return new Promise<{ data: CurrentRates }>((resolve) =>
  //   setTimeout(() => resolve({
  //     data: {
  //       "success": true,
  //       "timestamp": 1519296206,
  //       "base": baseCurrency,
  //       "date": "2022-01-17",
  //       "rates": {
  //         "AUD": 1.566015,
  //         "CAD": 1.560132,
  //         "CHF": 1.154727,
  //         "CNY": 7.827874,
  //         "GBP": 0.882047,
  //         "JPY": 132.360679,
  //         "USD": 0.03636,
  //       }
  //     }
  //   }), 500)
  // );
}