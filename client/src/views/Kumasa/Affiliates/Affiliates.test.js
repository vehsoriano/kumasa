import React from 'react';
import ReactDOM from 'react-dom';
import Affiliates from './Affiliates';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Affiliates />, div);
  ReactDOM.unmountComponentAtNode(div);
});