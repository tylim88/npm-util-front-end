import React, { useState, useRef } from 'react'
import {
	Typography,
	Grid,
	Box,
	Toolbar,
	Link,
	TextField,
	Alert,
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
	return (
		<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
			<Toolbar />
			<Typography variant="h5" textAlign="center">
				Dependency Count Badge
			</Typography>
			<Grid container direction="column" justifyContent="center" marginTop={5}>
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
							<Grid item xs={6}>
								<Grid container justifyContent="flex-end">
									<Typography paragraph marginY="auto">
										{name}:&nbsp;
									</Typography>
								</Grid>
							</Grid>
							<Grid item xs={6}>
								<Link
									href={`https://www.npmjs.com/package/${name}`}
									target="_blank"
								>
									<Grid container alignItems={'center'}>
										<img src={src(name)} alt={name + ' dependencies count'} />
									</Grid>
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
					<Grid item xs={6}>
						<Grid container justifyContent="flex-end">
							<Typography paragraph marginY="auto">
								{name}:&nbsp;
							</Typography>
						</Grid>
					</Grid>
					<Grid item xs={6}>
						<Link
							href={`https://www.npmjs.com/package/${name}`}
							target="_blank"
						>
							<Grid container alignItems={'center'}>
								<img src={src(name)} alt={name + ' dependencies count'} />
							</Grid>
						</Link>
					</Grid>
				</Grid>
				<Grid
					container
					justifyContent="center"
					marginY={2}
					bgcolor="#001E3C"
					borderRadius={5}
				>
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
						<Typography
							marginY={2}
							paragraph
							textAlign="center"
							color="#f8f8f2"
						>
							{err ? 'invalid name' : src(name)}
						</Typography>
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
		</Box>
	)
}
