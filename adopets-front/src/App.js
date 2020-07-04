import React from 'react';
import { DefaultLoginRegister } from './components/Defaults'

function App() {
  return (
    <React.Fragment>
      <DefaultLoginRegister
        card_title="404">
        <p>
          Page not found
        </p>
        <a href="/products">
          View Products
        </a>
      </DefaultLoginRegister>
    </React.Fragment>
  );
}

export default App;
