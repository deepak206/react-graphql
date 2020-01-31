import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Institute } from './index';
import SimpleTable from '../../views/simple-table';
import SearchBox from '../../views/search-box';
import Button from '../../views/button';

configure({
  adapter: new Adapter()
});

describe('<Institute />', () => {
  const wrapper = shallow(<Institute location={ () => '' }/>);

	it('Should render <Institute />', () => {
    expect(wrapper).toMatchSnapshot();
  })
});

describe('Institute - SimpleTable', () => {
  it('should be defined', () => {
    expect(SimpleTable).toBeDefined();
  });
  it('should render SimpleTable correctly', () => {
    const simpleTable = shallow(
      <SimpleTable rows={ [] } titles={ [] } />
    );
    expect(simpleTable).toMatchSnapshot();
  });
});

describe('Institute - SearchBox', () => {
  it('should be defined', () => {
    expect(SearchBox).toBeDefined();
  });
  it('should render SearchBox correctly', () => {
    const searchBox = shallow(
      <SearchBox  title={ 'Search Institute' }/>
    );
    expect(searchBox).toMatchSnapshot();
  });
});

describe('Institute - Button', () => {
  it('Institute should be defined', () => {
    expect(Button).toBeDefined();
  });
  it('should render Button correctly', () => {
    const button = shallow(
      <Button  classname={ 'btn-outlined' } text={ 'Add Institute' }  />
    );
    expect(button).toMatchSnapshot();
  });
});


