import React from 'react';
import ReactDOM from 'react-dom';
import Rider from './Riders';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Rider />, div);
  ReactDOM.unmountComponentAtNode(div);
});