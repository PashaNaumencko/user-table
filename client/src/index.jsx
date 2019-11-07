import React from 'react';
import { render } from 'react-dom';
import App from './scenes/App';

import './styles/reset.scss';
import 'semantic-ui-less/semantic.less';
import './styles/common.scss';

const target = document.getElementById('root');

render(<App />, target);
