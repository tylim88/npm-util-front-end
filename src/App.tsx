import React from 'react'
import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import { Names } from './Names'
import { Badge } from './Badge'
import { ResponsiveAppBar } from './AppBar'

export const App = () => {
	return (
		<>
			<ResponsiveAppBar />
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Routes>
					<Route path="/" element={<Names />} />
					<Route path="/badge" element={<Badge />} />
				</Routes>
			</Box>
		</>
	)
}
