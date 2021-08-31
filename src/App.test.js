import React from 'react';
import {shallow} from 'enzyme';
import App from './App';
describe('MovieComparePage Tests', () => {
  let shallowWrapper;
  beforeEach(() => {
    shallowWrapper = shallow(<App/>);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render all required children', () => {
    expect(shallowWrapper.find('MoviePage').length)
        .toEqual(1);
  });
});
