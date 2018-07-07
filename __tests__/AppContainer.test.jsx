import React from 'react';
import { shallow, mount } from 'enzyme';

import { _AppContainer as AppContainer } from '../src/Components/AppContainer';
import NewsFeedContainer from '../src/Components/NewsFeed/NewsFeedContainer';

describe('AppContainer', () => {

    const compProps = {
        Component: NewsFeedContainer,
        requiresLogin: true,
        hasHeaderAndFooter: true,
        isLoggedIn: true
    };

    test('shows header if hasHeaderAndFooter is true', () => {
        const component = mount(<AppContainer {...compProps} />);

        expect(component.find('.AppHeader').length).toBe(1);

    });

    test('shows component if user is logged in', () => {
        const component = mount(<AppContainer {...compProps} />);

        expect(component.find('.NewsFeedContainer').length).toBe(1);
    });

    test('always shows component if login is not required', () => {
        const component = mount(<AppContainer {...compProps} requiresLogin={false} isLoggedIn={false} />);

        expect(component.find('.AppHeader').length).toBe(1);
        expect(component.find('.NewsFeedContainer').length).toBe(1);
    });
});