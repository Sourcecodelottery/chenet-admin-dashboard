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
import { ICompanyJSX } from 'src/models/company_model'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { Role } from 'src/constants/roles'
import IconButton from "@mui/material/IconButton"
import { FullScreenDialog } from "./FullScreenDialog"

interface RecentOrdersTableProps {
  className?: string;
  companys: ICompanyJSX[];
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
  companys: ICompanyJSX[],
  filters: Filters
): ICompanyJSX[] => {
  return companys.filter((cryptoOrder) => {
    let matches = true;

    if (filters.role && cryptoOrder.role !== filters.role) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  companys: ICompanyJSX[],
  page: number,
  limit: number
): ICompanyJSX[] => {
  return companys.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ companys: companys }) => {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCompanies.length > 0;
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

  const handleSelectAllCompanies = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCompanies(
      event.target.checked
        ? companys.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCompanies.includes(cryptoOrderId)) {
      setSelectedCompanies((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedCompanies((prevSelected) =>
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

  const filteredCompanies = applyFilters(companys, filters);
  const paginatedCompanies = applyPagination(
    filteredCompanies,
    page,
    limit
  );
  const selectedSomeCompanies =
    selectedCompanies.length > 0 &&
    selectedCompanies.length < companys.length;
  const selectedAllCompanies =
    selectedCompanies.length === companys.length;
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
          title="Recent Companies"
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
                  checked={selectedAllCompanies}
                  indeterminate={selectedSomeCompanies}
                  onChange={handleSelectAllCompanies}
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
            {paginatedCompanies.map((companyObject) => {
              const isCompanySelected = selectedCompanies.includes(
                companyObject.id
              );
              return (
                <TableRow
                  hover
                  key={companyObject.id}
                  selected={isCompanySelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCompanySelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, companyObject.id)
                      }
                      value={isCompanySelected}
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
                      {companyObject.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {companyObject.email}
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
                      {companyObject.phone_number}
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
                      {companyObject.createdAt}
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
                      {companyObject.address.sub_city + ", " + companyObject.address.city}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {companyObject.address.sub_city}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(companyObject.role)}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Company" arrow>
                     <FullScreenDialog user={companyObject} />
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
          count={filteredCompanies.length}
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
  companys: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  companys: []
};

export default RecentOrdersTable;
