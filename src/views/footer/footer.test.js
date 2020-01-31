import React from 'react';
import Footer from './index';
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

it('renders footer', () => {
    shallow(<Footer />);
});
