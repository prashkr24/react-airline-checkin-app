/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import ReactDOM from 'react-dom'
import ManagePassengerPage from './managePassengerPage'

it('Render without creashing', () => {
    const div = document.createElement('div')
    ReactDOM.render('<ManagePassengerPage/>', div)
})
