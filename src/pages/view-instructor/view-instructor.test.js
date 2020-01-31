import React from 'react';
import { shallow, mount } from 'enzyme';
import ViewInstructor from './index';
import { trans } from '../../utils';

const row = [
  {
    course: '',
    department: '',
    firstName: '',
    lastName: '',
    loginID: '',
    password: '',
    section: '',
  },
];
const mockCallBack = jest.fn();

it('ViewInstructor should render without crash', () => {
  shallow(<ViewInstructor />);
});

describe('ViewInstructor', () => {
  const wrapper = shallow(<ViewInstructor />);

  it('Should render <ViewInstructor />', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<ViewInstructor />', () => {
  const wrapper = mount(<ViewInstructor rows={row} />);

  it('contains h4', () => {
    const value = wrapper
      .find('h4')
      .first()
      .text();

    expect(value).toEqual('Instructors Added (1)');
  });
  it('accepts rows props', () => {
    expect(wrapper.props().rows).toEqual(row);
  });

  it('should render edit button correctly', () => {
    const edit = mount(
      <div className="edit" onClick={mockCallBack}>
        {trans('Edit')}
      </div>,
    );

    edit.simulate('click');

    expect(mockCallBack).toHaveBeenCalled();
  });
});
