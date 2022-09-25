import React, { useState, useEffect } from 'react'
import { TextField, TextFieldProps } from '@mui/material'
import { filtersRegex } from './share'
import pickRandom from 'pick-random'

const random = () => {
	const [a1, a2] = pickRandom(alphabet, { count: 2 })
	const [n1, n2] = pickRandom(number, { count: 2 })
	return pickRandom(
		[
			`${a1}-${a2}`,
			`${n1}-${n2}`,
			'vowels',
			'consonants',
			pickRandom(alphabet),
			pickRandom(number),
		],
		{
			count: pickRandom([1, 2, 3, 4])[0] || 1,
		}
	).join(',')
}
const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const alphabet = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
]

export const FilterTextField = ({
	onStateChange,
	...otherProps
}: {
	onStateChange?: (pass: boolean, filters: string[]) => void
} & TextFieldProps) => {
	const [value, setValue] = useState('')
	const [error, setError] = useState(false)
	const status = (value: string) => {
		const filters = value.split(',').map(filter => filter.trim())
		const pass = filters.some(item => {
			return filtersRegex.test(item)
		})
		return { pass, filters }
	}
	useEffect(() => {
		const value = random()
		setValue(value)
		const { pass, filters } = status(value)
		onStateChange && onStateChange(pass, filters)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []) // dont include onStateChange as dependency as this is intend to run once
	return (
		<TextField
			error={error}
			helperText={error ? 'incorrect filter format' : ''}
			value={value}
			onChange={e => {
				const value = e.target.value
				const { pass, filters } = status(value)
				onStateChange && onStateChange(pass, filters)
				setError(!pass)
				setValue(value)
			}}
			{...otherProps}
		/>
	)
}
