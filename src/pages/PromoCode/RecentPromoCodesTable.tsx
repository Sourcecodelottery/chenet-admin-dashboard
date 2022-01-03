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
import { IPromoCodeJSX } from 'src/models/promo_code_model'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { Role } from 'src/constants/roles'
import IconButton from "@mui/material/IconButton"
import { FullScreenDialog } from "./FullScreenDialog"

interface RecentOrdersTableProps {
  className?: string;
  promo_codes: IPromoCodeJSX[];
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
  promo_codes: IPromoCodeJSX[],
  filters: Filters
): IPromoCodeJSX[] => {
  return promo_codes.filter((cryptoOrder) => {
    let matches = true;

    return matches;
  });
};

const applyPagination = (
  promo_codes: IPromoCodeJSX[],
  page: number,
  limit: number
): IPromoCodeJSX[] => {
  return promo_codes.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ promo_codes }) => {
  const [selectedPromoCodes, setSelectedPromoCodes] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedPromoCodes.length > 0;
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

  const handleSelectAllPromoCodes = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedPromoCodes(
      event.target.checked
        ? promo_codes.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedPromoCodes.includes(cryptoOrderId)) {
      setSelectedPromoCodes((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedPromoCodes((prevSelected) =>
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

  const filteredPromoCodes = applyFilters(promo_codes, filters);
  const paginatedPromoCodes = applyPagination(
    filteredPromoCodes,
    page,
    limit
  );
  const selectedSomePromoCodes =
    selectedPromoCodes.length > 0 &&
    selectedPromoCodes.length < promo_codes.length;
  const selectedAllPromoCodes =
    selectedPromoCodes.length === promo_codes.length;
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
          title="Recent PromoCodes"
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
                  checked={selectedAllPromoCodes}
                  indeterminate={selectedSomePromoCodes}
                  onChange={handleSelectAllPromoCodes}
                />
              </TableCell>
              <TableCell>User</TableCell>
              <TableCell>Coin Amount</TableCell>
              <TableCell>Code</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPromoCodes.map((promo_codeObject) => {
              const isPromoCodeSelected = selectedPromoCodes.includes(
                promo_codeObject.id
              );
              return (
                <TableRow
                  hover
                  key={promo_codeObject.id}
                  selected={isPromoCodeSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isPromoCodeSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, promo_codeObject.id)
                      }
                      value={isPromoCodeSelected}
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
                      {promo_codeObject.user}
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
                      {promo_codeObject.coin_amount}
                    </Typography>
                  </TableCell><TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {promo_codeObject.code}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View PromoCode" arrow>
                     <FullScreenDialog user={promo_codeObject} />
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
          count={filteredPromoCodes.length}
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
  promo_codes: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  promo_codes: []
};

export default RecentOrdersTable;
