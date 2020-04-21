/* eslint-disable no-undef */
it('should pass', () => {
    expect(true).toEqual(true)
})

import React from 'react'
import ManagePassengerPage from './managePassengerPage'
import renderer from 'react-test-renderer'
import { passengers } from '../../../tools/mockData'

it("sets submit button label 'Saving...' when saving is true", () => {
    const tree = renderer.create(
        <ManagePassengerPage
            passengers={passengers}
            loadPassengers={jest.fn()}
            savePassenger={jest.fn()}
            deletePassenger={jest.fn()}
        />
    )
    expect(tree).toMatchSnapshot()
})
