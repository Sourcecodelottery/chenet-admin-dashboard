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
import { ICombinationUserJSX } from 'src/models/combination_user_model'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { Role } from 'src/constants/roles'
import IconButton from "@mui/material/IconButton"
import { FullScreenDialog } from "./FullScreenDialog"

interface RecentOrdersTableProps {
  className?: string;
  combination_users: ICombinationUserJSX[];
}

interface Filters {
  role?: Role;
}

const getStatusLabel = (role: Role): JSX.Element => {
  console.log("here", role)
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
    },
    [Role.COMPANY]: {
      text: Role.COMPANY,
      color: 'failed'
    },
  };

  const { text, color }: any = map[role];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  combination_users: ICombinationUserJSX[],
  filters: Filters
): ICombinationUserJSX[] => {
  return combination_users.filter((cryptoOrder) => {
    let matches = true;

    if (filters.role && cryptoOrder.role !== filters.role) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  combination_users: ICombinationUserJSX[],
  page: number,
  limit: number
): ICombinationUserJSX[] => {
  return combination_users.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ combination_users: combination_users }) => {
  const [selectedCombinationUsers, setSelectedCombinationUsers] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCombinationUsers.length > 0;
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

  const handleSelectAllCombinationUsers = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCombinationUsers(
      event.target.checked
        ? combination_users.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCombinationUsers.includes(cryptoOrderId)) {
      setSelectedCombinationUsers((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedCombinationUsers((prevSelected) =>
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

  const filteredCombinationUsers = applyFilters(combination_users, filters);
  const paginatedCombinationUsers = applyPagination(
    filteredCombinationUsers,
    page,
    limit
  );
  const selectedSomeCombinationUsers =
    selectedCombinationUsers.length > 0 &&
    selectedCombinationUsers.length < combination_users.length;
  const selectedAllCombinationUsers =
    selectedCombinationUsers.length === combination_users.length;
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
          title="Recent Combination Users"
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
                  checked={selectedAllCombinationUsers}
                  indeterminate={selectedSomeCombinationUsers}
                  onChange={handleSelectAllCombinationUsers}
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
            {paginatedCombinationUsers.map((combination_userObject) => {
              const isCombinationUserSelected = selectedCombinationUsers.includes(
                combination_userObject.id
              );
              return (
                <TableRow
                  hover
                  key={combination_userObject.id}
                  selected={isCombinationUserSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCombinationUserSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, combination_userObject.id)
                      }
                      value={isCombinationUserSelected}
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
                      {combination_userObject.first_name + " " + combination_userObject.last_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {combination_userObject.email}
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
                      {combination_userObject.phone_number}
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
                      {combination_userObject.createdAt}
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
                      {combination_userObject.address.sub_city + ", " + combination_userObject.address.city}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {combination_userObject.address.sub_city}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(combination_userObject.role)}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View CombinationUser" arrow>
                     <FullScreenDialog user={combination_userObject} />
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
          count={filteredCombinationUsers.length}
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
  combination_users: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  combination_users: []
};

export default RecentOrdersTable;
