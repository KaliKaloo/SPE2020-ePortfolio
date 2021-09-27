import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HeroSection from '../components/landing/HomePage/HeroSection';


afterEach(cleanup)

it('should take a snapshot for HeroSection UI', () => {
  const { asFragment } = render(<HeroSection />)

  expect(asFragment(<HeroSection />)).toMatchSnapshot()
})
