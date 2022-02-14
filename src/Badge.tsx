import React, { useState, useRef } from 'react'
import {
	Typography,
	Grid,
	Toolbar,
	Link,
	TextField,
	Alert,
	Button,
} from '@mui/material'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const src = (packageName: string) =>
	`https://img.shields.io/badge/dynamic/json?url=https://api.npmutil.com/package/${packageName}&label=dependencies&query=$.dependencies.count`

const example = [
	'lodash',
	'axios',
	'moment',
	'express',
	'babel-loader',
	'eslint',
	'typescript',
	'rxjs',
	'socket.io',
]

export const Badge = () => {
	const [name, setName] = useState('my-package-name')
	const [err, setErr] = useState(false)
	const [copied, setCopied] = useState(false)
	const ref = useRef<NodeJS.Timeout | null>(null)
	const [mouseEnter, setMouseEnter] = useState(false)
	return (
		<>
			<Toolbar />
			<Typography variant="h5" textAlign="center">
				Dependency Count Badge
			</Typography>
			<Grid container direction="column" justifyContent="center" marginTop={3}>
				<Typography paragraph textAlign="center" sx={{ fontWeight: 'bold' }}>
					Examples:
				</Typography>
				{example.map(name => {
					return (
						<Grid
							key={name}
							container
							direction={'row'}
							alignItems="center"
							justifyContent="center"
						>
							<Grid item xs={6} display="flex" justifyContent="flex-end">
								<Typography paragraph marginY="auto">
									{name}:&nbsp;
								</Typography>
							</Grid>
							<Grid item xs={6} display="flex" alignItems={'center'}>
								<Link
									href={`https://www.npmjs.com/package/${name}`}
									target="_blank"
								>
									<img src={src(name)} alt={name + ' dependencies count'} />
								</Link>
							</Grid>
						</Grid>
					)
				})}
			</Grid>
			<Grid container direction="column" justifyContent="center" marginTop={5}>
				<Grid container justifyContent="center" marginBottom={2}>
					<TextField
						label="package name"
						value={name}
						error={err}
						onChange={e => {
							const value = e.target.value
							const pass = /^[a-z0-9.\-_]*$/.test(value)
							setErr(!pass)
							setName(value)
						}}
					/>
				</Grid>
				<Grid
					container
					direction={'row'}
					alignItems="center"
					justifyContent="center"
				>
					<Grid item xs={6} display="flex" justifyContent="flex-end">
						<Typography paragraph marginY="auto">
							{name}:&nbsp;
						</Typography>
					</Grid>
					<Grid item xs={6} display="flex" alignItems={'center'}>
						<Link
							href={`https://www.npmjs.com/package/${name}`}
							target="_blank"
						>
							<img src={src(name)} alt={name + ' dependencies count'} />
						</Link>
					</Grid>
				</Grid>
				<Grid container justifyContent="center" marginY={2}>
					<CopyToClipboard
						text={src(name)}
						onCopy={() => {
							setCopied(true)
							ref.current && clearTimeout(ref.current)
							ref.current = setTimeout(() => {
								setCopied(false)
							}, 2500)
						}}
					>
						<Grid item sx={{ backgroundColor: '#001E3C', borderRadius: 2 }}>
							<Button
								onMouseEnter={() => {
									setMouseEnter(true)
								}}
								onMouseLeave={() => {
									setMouseEnter(false)
								}}
							>
								<Typography
									marginY={1}
									color="#f8f8f2"
									paragraph
									borderRadius={2}
									bgcolor={mouseEnter ? 'rgba(150, 198, 253, 0.5)' : '#001E3C'}
									textAlign="center"
									textTransform={'lowercase'}
								>
									{err ? 'invalid name' : src(name)}
								</Typography>
							</Button>
						</Grid>
					</CopyToClipboard>
				</Grid>

				{copied && (
					<Grid container justifyContent={'center'}>
						<Grid item width={150}>
							<Alert severity="success">Copied!</Alert>
						</Grid>
					</Grid>
				)}
			</Grid>
		</>
	)
}
