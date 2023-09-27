import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/layout_area/layout/Layout';
import { Provider } from 'react-redux';
import { store } from './app_state_area/redux/configurer_store/configurer-store';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
  <Layout/>
  </Provider>
);
reportWebVitals();
