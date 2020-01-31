import React from 'react';
import { shallow, mount } from 'enzyme';
import ViewLicense from './index';
import { trans } from '../../utils';
import crossIcon from '../../assets/images/icon-cross.svg';

const row = [
  {
    licenseKey: `PearB${Math.random()}`,
    licenseCount: '120',
    startDate: '12/11/2019',
    endDate: '25/12/2019',
    courseName: 'Course A',
    courseData: {},
    instituteName: 'Test',
  },
];
const mockCallBack = jest.fn();

it('ViewLicense should render without crash', () => {
  shallow(<ViewLicense />);
});

describe('ViewLicense', () => {
  const wrapper = shallow(<ViewLicense />);

  it('Should render <ViewLicense />', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<ViewLicense />', () => {
  const wrapper = mount(<ViewLicense rows={ row } />);

  it('it has successfully added License Row', () => {
    const value = wrapper
      .find('h4')
      .first()
      .text();

    expect(value).toEqual('License Batch Added (1)');
  });
  it('accepts rows props', () => {
    expect(wrapper.props().rows).toEqual(row);
  });

  it('should render edit button correctly', () => {
    const edit = mount(
      <div className="edit" onClick={ mockCallBack }>
        {trans('Edit')}
      </div>,
    );

    edit.simulate('click');

    expect(mockCallBack).toHaveBeenCalled();
  });

  it('should render remove button correctly', () => {
    const remove = mount(
      <div className="close" onClick={mockCallBack }>
      <img src={crossIcon} />
    </div>,
    );
    remove.simulate('click');
    expect(mockCallBack).toHaveBeenCalled();
  });

  it('it has successfully deleted License Row', () => {
    row.length = 0; 
    const wrapper = mount(<ViewLicense rows={ row } />);
    const value = wrapper
      .find('h4')
      .first()
      .text();

    expect(value).toEqual('License Batch Added (0)');
  });

});
