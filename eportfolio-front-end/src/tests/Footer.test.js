import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Footer from '../components/Footer.js';


afterEach(cleanup)

it('should take a snapshot for footer UI', () => {
  const { asFragment } = render(<Footer />)

  expect(asFragment(<Footer />)).toMatchSnapshot()
})
