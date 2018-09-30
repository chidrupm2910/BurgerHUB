import React from 'react';
import {configure, shallow}from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './navigationItems'
import NavigationItem from './navigationItem/navigationItem'

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />); 
    })
    it('should render only 2 NavigationItems when not authenticated', () => {
        
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    
    it('should render only 3 NavigationItems when authenticated', () => {
        //const wrapper = shallow(<NavigationItems isAuthenticated/>);
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
})