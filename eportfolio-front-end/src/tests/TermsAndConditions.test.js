import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TermsAndConditions from '../pages/TermsAndConditions.js.js';



afterEach(cleanup)

it('should take a snapshot for TermsAndConditions UI', () => {
  const { asFragment } = render(<TermsAndConditions />)

  expect(asFragment(<TermsAndConditions />)).toMatchSnapshot()
})

