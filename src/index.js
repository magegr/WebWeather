
import ReactDOM from 'react-dom/client';
import './index.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Api from '../src/services/Api/ApiWeather';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <PrimeReactProvider>
    <Api />
  </PrimeReactProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();