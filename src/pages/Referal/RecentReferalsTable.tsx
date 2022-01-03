import { FC, ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';
import Label from 'src/components/Label';
import { IReferalJSX } from 'src/models/referal_code_model'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { Role } from 'src/constants/roles'
import IconButton from "@mui/material/IconButton"
import { FullScreenDialog } from "./FullScreenDialog"
import { ReferalStatus } from 'src/constants/interfaces'

interface RecentOrdersTableProps {
  className?: string;
  referals: IReferalJSX[];
}

interface Filters {
  role?: Role;
}

const applyFilters = (
  referals: IReferalJSX[],
  filters: Filters
): IReferalJSX[] => {
  return referals.filter((referal) => {
    let matches = true;

    return matches;
  });
};

const applyPagination = (
  referals: IReferalJSX[],
  page: number,
  limit: number
): IReferalJSX[] => {
  return referals.slice(page * limit, page * limit + limit);
};

const getStatusLabel = (referalStatus: ReferalStatus): JSX.Element => {
  const map = {
    [ReferalStatus.CLAIMED]: {
      text: ReferalStatus.CLAIMED,
      color: 'error'
    },
    [ReferalStatus.UNCLAIMED]: {
      text: ReferalStatus.UNCLAIMED,
      color: 'success'
    },
  };

  const { text, color }: any = map[referalStatus];

  return <Label color={color}>{text}</Label>;
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ referals }) => {
  const [selectedReferals, setSelectedReferals] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedReferals.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    role: null
  });

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllReferals = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedReferals(
      event.target.checked
        ? referals.map((referal) => referal.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    referalId: string
  ): void => {
    if (!selectedReferals.includes(referalId)) {
      setSelectedReferals((prevSelected) => [
        ...prevSelected,
        referalId
      ]);
    } else {
      setSelectedReferals((prevSelected) =>
        prevSelected.filter((id) => id !== referalId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredReferals = applyFilters(referals, filters);
  const paginatedReferals = applyPagination(
    filteredReferals,
    page,
    limit
  );
  const selectedSomeReferals =
    selectedReferals.length > 0 &&
    selectedReferals.length < referals.length;
  const selectedAllReferals =
    selectedReferals.length === referals.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.role || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {Object.values(ReferalStatus).map(status => ({ id: status, name: status })).map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Recent Referals"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllReferals}
                  indeterminate={selectedSomeReferals}
                  onChange={handleSelectAllReferals}
                />
              </TableCell>
              <TableCell>User From</TableCell>
              <TableCell>User To</TableCell>
              <TableCell>Coin Amount</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedReferals.map((referalObject) => {
              const isReferalSelected = selectedReferals.includes(
                referalObject.id
              );
              return (
                <TableRow
                  hover
                  key={referalObject.id}
                  selected={isReferalSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isReferalSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, referalObject.id)
                      }
                      value={isReferalSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {referalObject.user_from}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {referalObject.user_to}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {referalObject.coin_amount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {referalObject.token}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {getStatusLabel(referalObject.status)}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Referal" arrow>
                      <FullScreenDialog user={referalObject} />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredReferals.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  referals: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  referals: []
};

export default RecentOrdersTable;