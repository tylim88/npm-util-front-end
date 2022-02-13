import React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AbcIcon from '@mui/icons-material/Abc'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
import { Routes, Route, Link } from 'react-router-dom'
import { Names } from './Names'
import { Badge } from './Badge'

const drawerWidth = 240

export const App = () => {
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<Typography variant="h6" noWrap component="div">
						NPMjs Utils
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: 'auto' }}>
					<List>
						{[
							{
								name: 'Generate Available Package Names',
								Icon: AbcIcon,
								link: '/',
							},
							{
								name: 'Dependency Count Badge',
								Icon: MilitaryTechIcon,
								link: '/badge',
							},
						].map(element => (
							<ListItem button key={element.name}>
								<ListItemIcon>
									<element.Icon color={'error'} fontSize="large" />
								</ListItemIcon>
								<Link
									to={element.link}
									style={{
										textDecoration: 'none',
										color: 'rgba(0, 0, 0, 0.87)',
									}}
								>
									<ListItemText primary={element.name} />
								</Link>
							</ListItem>
						))}
					</List>
				</Box>
			</Drawer>
			<Routes>
				<Route path="/" element={<Names />} />
				<Route path="/badge" element={<Badge />} />
			</Routes>
		</Box>
	)
}
