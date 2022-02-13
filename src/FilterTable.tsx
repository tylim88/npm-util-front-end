import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

function createData(filter: string, value: string, example: string) {
	return { filter, value, example }
}

const rows = [
	createData('<alphabet>', 'single alphabet', 'b, l, h'),
	createData(
		'<alphabet> - <alphabet>',
		'all alphabet from first alphabet to last alphabet, ignore order',
		'b-o, u-l, h-m'
	),
	createData('<digit>', 'single digit', '3, 1, 9'),
	createData(
		'<digit> - <digit>',
		'all values from first number to last number, ignore order',
		'0-5, 8-2, 5-7'
	),
	createData('vowels', 'a, e, i, o, u', 'vowels'),
	createData('consonants', 'alphabets other than vowels', 'consonants'),
	createData('-', 'hyphen', '-'),
	createData('_', 'underscore', '_'),
	createData('.', 'full stop', '.'),
	createData('*', 'all characters in above', '*'),
]

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}))

export const FilterTable = () => {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Filter</StyledTableCell>
						<StyledTableCell>Value</StyledTableCell>
						<StyledTableCell>Example</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map(row => (
						<StyledTableRow
							key={row.filter}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<StyledTableCell>{row.filter}</StyledTableCell>
							<StyledTableCell>{row.value}</StyledTableCell>
							<StyledTableCell>{row.example}</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
