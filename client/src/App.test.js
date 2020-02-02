// import React from 'react';
// import {shallow} from 'enzyme/build';
// import App from './App';


// it('mounts without crashing', () => {
//   const wrapper = shallow(<App />);
//   wrapper.unmount()
// });
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
