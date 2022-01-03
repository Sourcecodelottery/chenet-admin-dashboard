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
import { IDriverJSX } from 'src/models/driver_model'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { Role } from 'src/constants/roles'
import IconButton from "@mui/material/IconButton"
import { FullScreenDialog } from "./FullScreenDialog"

interface RecentOrdersTableProps {
  className?: string;
  drivers: IDriverJSX[];
}

interface Filters {
  role?: Role;
}

const getStatusLabel = (role: Role): JSX.Element => {
  const map = {
    [Role.BROKER]: {
      text: Role.BROKER,
      color: 'error'
    },
    [Role.DRIVER]: {
      text: Role.DRIVER,
      color: 'success'
    },
    [Role.COMBINATION_USER]: {
      text: Role.COMBINATION_USER,
      color: 'warning'
    }
  };

  const { text, color }: any = map[role];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  brokers: IDriverJSX[],
  filters: Filters
): IDriverJSX[] => {
  return brokers.filter((cryptoOrder) => {
    let matches = true;

    if (filters.role && cryptoOrder.role !== filters.role) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  brokers: IDriverJSX[],
  page: number,
  limit: number
): IDriverJSX[] => {
  return brokers.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ drivers: brokers }) => {
  const [selectedBrokers, setSelectedBrokers] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedBrokers.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    role: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'Completed'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'failed',
      name: 'Failed'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      role: value
    }));
  };

  const handleSelectAllBrokers = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedBrokers(
      event.target.checked
        ? brokers.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedBrokers.includes(cryptoOrderId)) {
      setSelectedBrokers((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedBrokers((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredBrokers = applyFilters(brokers, filters);
  const paginatedBrokers = applyPagination(
    filteredBrokers,
    page,
    limit
  );
  const selectedSomeBrokers =
    selectedBrokers.length > 0 &&
    selectedBrokers.length < brokers.length;
  const selectedAllBrokers =
    selectedBrokers.length === brokers.length;
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
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Recent Brokers"
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
                  checked={selectedAllBrokers}
                  indeterminate={selectedSomeBrokers}
                  onChange={handleSelectAllBrokers}
                />
              </TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Joined In</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBrokers.map((brokerObject) => {
              const isBrokerSelected = selectedBrokers.includes(
                brokerObject.id
              );
              return (
                <TableRow
                  hover
                  key={brokerObject.id}
                  selected={isBrokerSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isBrokerSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, brokerObject.id)
                      }
                      value={isBrokerSelected}
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
                      {brokerObject.first_name + " " + brokerObject.last_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {brokerObject.email}
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
                      {brokerObject.phone_number}
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
                      {brokerObject.createdAt}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {" "}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {brokerObject.address.sub_city + ", " + brokerObject.address.city}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {brokerObject.address.sub_city}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(brokerObject.role)}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Broker" arrow>
                     <FullScreenDialog user={brokerObject} />
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
          count={filteredBrokers.length}
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
  drivers: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  drivers: []
};

export default RecentOrdersTable;
