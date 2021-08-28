import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { postActivity } from './store/actions';
import configureStore from 'redux-mock-store';
import Activities from './components/activities/Activities';
import { beforeEach, describe, expect } from '@jest/globals';

configure({adapter: new Adapter()});

describe('<Activities/>', () => {
    describe('Structure', () => {
        let wrapper;
        beforeEach(()=>{
            wrapper = shallow(<Activities/>)
        });
        it('Renderiza un form', () => {
            expect(wrapper.find('form')).toHaveLength(1);
        })
        it('Renderiza un input con la propiedad "name" igual a "name"', () => {
            expect(wrapper.find('input[name="name"]')).toHaveLength(1);
          })
        it('Renderiza un input con la propiedad "duration" igual a "duration"', () => {
            expect(wrapper.find('input[name="duration"]')).toHaveLength(1);
        })
        it('Renderiza un boton con el "type" "submit"', () => {
            expect(wrapper.find('button[type="submit"]')).toHaveLength(1)
          })
    })
})