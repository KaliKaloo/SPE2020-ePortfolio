import React from 'react'
import { render,cleanup } from '@testing-library/react'
import App from '../App.js'

afterEach(cleanup)

it('should take a snapshot for the whole App UI', () => {
  const { asFragment } = render(<App />)

  expect(asFragment(<App />)).toMatchSnapshot()
})


