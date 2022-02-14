import * as React from 'react'
import {
	AppBar,
	Button,
	Link as LinkMUI,
	Grid,
	ListItemIcon,
} from '@mui/material'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import { Link } from 'react-router-dom'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
import BadgeIcon from '@mui/icons-material/Badge'
import GitHubIcon from '@mui/icons-material/GitHub'
import { red, blue } from '@mui/material/colors'

const pages = [
	{ name: 'Unused Names', link: '/', Icon: BadgeIcon },
	{ name: 'Dependency Count', link: '/badge', Icon: MilitaryTechIcon },
]

export const ResponsiveAppBar = () => {
	const [anchorElNav, setAnchorElNav] = React.useState(null)

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		// eslint-disable-next-line
		// @ts-expect-error
		setAnchorElNav(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
					>
						NPMjs Util
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map(page => (
								<Link
									to={page.link}
									key={page.name}
									style={{
										textDecoration: 'none',
										textAlign: 'center',
										alignItems: 'center',
									}}
								>
									<MenuItem onClick={handleCloseNavMenu}>
										<ListItemIcon>
											<page.Icon />
										</ListItemIcon>
										<Typography textAlign={'center'}>{page.name}</Typography>
									</MenuItem>
								</Link>
							))}
							<LinkMUI
								target="_blank"
								href={'https://github.com/tylim88/npm-util-front-end'}
								style={{
									textDecoration: 'none',
									textAlign: 'center',
									alignItems: 'center',
									justifyContent: 'center',
									display: 'flex',
								}}
							>
								<MenuItem onClick={handleCloseNavMenu}>
									<ListItemIcon>
										<GitHubIcon color={'error'} />
									</ListItemIcon>
								</MenuItem>
							</LinkMUI>
						</Menu>
					</Box>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
					>
						NPMjs Util
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						<Grid item xs={6} display="flex">
							{pages.map(page => (
								<Link
									key={page.name}
									to={page.link}
									style={{
										textDecoration: 'none',
									}}
								>
									<Button
										onClick={handleCloseNavMenu}
										sx={{ my: 2, color: 'white', display: 'block' }}
									>
										{page.name}
									</Button>
								</Link>
							))}
						</Grid>
						<Grid xs={6} item display={'flex'} justifyContent="flex-end">
							<LinkMUI
								target="_blank"
								href={'https://github.com/tylim88/npm-util-front-end'}
								style={{
									textDecoration: 'none',
									color: 'white',
									alignItems: 'center',
									display: 'flex',
									marginLeft: 100,
								}}
							>
								<GitHubIcon fontSize="large" color={'action'} />
							</LinkMUI>
						</Grid>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
