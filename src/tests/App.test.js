import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import App from '../components/App';

it('Renders without crashing', () => {
  mount(<MemoryRouter><App /></MemoryRouter>);
});

it('renders as expected when no page is selected', () => {
  const tree = renderer
    .create(<MemoryRouter><App /></MemoryRouter>)
    .toJSON();
  
  expect(tree).toMatchSnapshot();  
});