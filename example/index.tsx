import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from '../src';
import SSContext from '../src/components/Context';

const App = () => {
  return (
    <Provider store={{}}>
      <div>awd</div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
