import React from 'react'
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { render, screen } from '@testing-library/react'
import { Names } from './Names'

test('renders learn react link', () => {
	render(<Names />)
	const linkElement = screen.getByText(/learn react/i)
	expect(linkElement).toBeInTheDocument()
})
