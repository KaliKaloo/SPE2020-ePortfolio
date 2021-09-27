import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import PubFooter from '../published/components/pubFooter';


afterEach(cleanup)

it('should take a snapshot for PubFooter UI', () => {
  const { asFragment } = render(<PubFooter />)

  expect(asFragment(<PubFooter />)).toMatchSnapshot()
})
