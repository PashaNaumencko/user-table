import React from 'react';
import { Provider } from 'react-redux';
import MainContainer from '../../containers/MainContainer';
import { store } from '../../store';

const App = () => (
  <Provider store={store}>
    <MainContainer />
  </Provider>
);

export default App;
