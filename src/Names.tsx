import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import { FilterTable } from './FilterTable'
import { FilterTextField } from './FilterTextField'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import axios from 'axios'
import { availableNameShape } from './share'
import { z } from 'zod'
import Link from '@mui/material/Link'
import SearchIcon from '@mui/icons-material/Search'
import { red } from '@mui/material/colors'

const defaultLength = 3
const maxChar = 6

const StyledGrid = styled(Grid)(({ theme }) => ({
	backgroundColor: theme.palette.action.hover,
}))

const StyledGrid2 = styled(Grid)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
}))
export const Names = () => {
	const [length, setLength] = useState<number | ''>(defaultLength)
	const [data, setData] = useState<string[]>([])
	const [filters, setFilters] = useState<
		Record<number, { pass: boolean; filters: string[] }>
	>({})
	const [loading, setLoading] = useState(false)
	const [errMsg, setErrMsg] = useState('')

	return (
		<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
			<Toolbar />
			<Typography variant="h5" marginBottom={5} textAlign="center">
				Search For Available <Link href="https://www.npmjs.com/">NPMjs</Link>{' '}
				Name
			</Typography>
			<Grid container justifyContent="center">
				<Grid item xs={12} lg={8}>
					<FilterTable />
				</Grid>
			</Grid>
			<Grid
				container
				justifyContent="center"
				alignItems={'center'}
				marginTop={3}
			>
				<StyledGrid item>
					<TextField
						id="outlined-number"
						type="number"
						label="Length"
						sx={{ marginTop: 3, marginBottom: 2, marginX: 5 }}
						value={length}
						onChange={e => {
							const value = e.target.value
							const num = parseFloat(value)
							if (value === '') {
								setLength('')
							} else if (!Number.isInteger(num)) {
								setLength(p => {
									return p
								})
							} else if (num < 1) {
								setLength(1)
							} else if (num > maxChar) {
								setLength(maxChar)
							} else {
								setLength(num)
							}
						}}
						onBlur={e => {
							const value = e.target.value
							if (value === '') {
								setLength(0)
							}
						}}
						helperText={`min=1 max=${maxChar}`}
						InputProps={{ inputProps: { min: 0, max: 10 } }}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</StyledGrid>
				<Grid item marginX={3}>
					<LoadingButton
						loading={loading}
						loadingPosition="end"
						endIcon={<SearchIcon />}
						variant="contained"
						onClick={async () => {
							setLoading(true)
							const filters_ = new Array(length)
								.fill(1)
								.reduce<string[][] | null>((acc, item, index) => {
									const filter = filters[index]
									if (acc && filter?.pass) {
										return [...acc, filter.filters]
									} else {
										return null
									}
								}, [] as string[][])
							process.env?.REACT_APP_NAME_END_POINT &&
								(await axios
									.post(process.env.REACT_APP_NAME_END_POINT, {
										filters: filters_,
									})
									.then(res => {
										const data: z.infer<typeof availableNameShape.res> =
											res.data
										setData(data.names)
										setErrMsg('')
									})
									.catch(err => {
										setData([])
										setErrMsg(err?.response?.data?.error || 'unknown error')
									}))
							setLoading(false)
						}}
					>
						Search Names
					</LoadingButton>
				</Grid>
			</Grid>
			<Grid container justifyContent="center" marginTop={4}>
				<Grid container justifyContent="center" maxWidth={1440}>
					{new Array(maxChar).fill(1).map((item, index) => {
						return (
							<Grid
								item
								xs={6}
								sm={4}
								md={3}
								lg={2}
								key={index}
								justifyContent="center"
								display={'flex'}
								padding={1}
							>
								<FilterTextField
									disabled={index >= length}
									label={'Char ' + (index + 1)}
									onStateChange={(pass, filters) => {
										setFilters(prev => {
											prev[index] = { pass, filters }
											return prev
										})
									}}
								/>
							</Grid>
						)
					})}
				</Grid>
			</Grid>
			<Grid container justifyContent="center">
				<Typography marginBottom={2} paragraph>
					Filters are preload with random example. Multiple filters per
					character is possible, separate them with ",". Request will be
					rejected if result set exceed 10k, if so please reduce the range.
				</Typography>
			</Grid>
			<Grid container justifyContent="center">
				{errMsg ? (
					<Typography paragraph marginTop={2} color={red[500]}>
						Error: {errMsg}
					</Typography>
				) : (
					<Grid container justifyContent="flex-start" maxWidth={1440}>
						{data.map(name => {
							return (
								<StyledGrid2 item key={name} xs={4}>
									<Typography
										fontWeight="bold"
										fontSize="large"
										marginY={2}
										paragraph
										textAlign={'center'}
									>
										{name}
									</Typography>
								</StyledGrid2>
							)
						})}
					</Grid>
				)}
			</Grid>
			<Grid />
		</Box>
	)
}
