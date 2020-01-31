import React from 'react';
import { shallow } from 'enzyme';
import ScoreCardWelcome from './index';

describe('<ScoreCardWelcome />', () => {
  const historyMock = { push: jest.fn() };
  const wrapper = shallow(<ScoreCardWelcome t={() => ''} history={historyMock}/>);

	it('Should render <ScoreCardWelcome />', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should render <Carousel />', () => {
    expect(wrapper.find('Carousel').length).toBeGreaterThan(0);
  });

  it('shallow wrapper instance should be null', () => {
    const instance = wrapper.instance();

    expect(instance).toBe(null);
  })
});
