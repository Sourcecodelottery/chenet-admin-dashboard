import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
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
import { ISurveyJSX } from 'src/models/survey_model';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ViewIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { ISurveyType } from 'src/store/States/Survey/survey.types';
import routes from 'src/constants/routes'
import { useNavigate } from 'react-router'
import { Actions } from "src/store/States/Survey/"
import { connect } from "react-redux"

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: ISurveyJSX[];
  saveSelectedSurvey?: (payload: string) => void;
}

interface Filters {
  surveyType?: ISurveyType;
}

const getStatusLabel = (amount: number): JSX.Element => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  return <Label color="success">{amount}</Label>;
};

const applyFilters = (
  cryptoOrders: ISurveyJSX[],
  filters: Filters
): ISurveyJSX[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    if (filters.surveyType && String(cryptoOrder.surveyType) !== filters.surveyType) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: ISurveyJSX[],
  page: number,
  limit: number
): ISurveyJSX[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ cryptoOrders, saveSelectedSurvey }) => {

  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    surveyType: null
  });

  const surveyTypes = [
    {
      id: 'PRIVATE',
      name: 'PRIVATE'
    },
    {
      id: 'PUBLIC',
      name: 'PUBLIC'
    },
    {
      id: 'FOR_SALE',
      name: 'FOR_SALE'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      surveyType: value
    }));
  };

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked
        ? cryptoOrders.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedCryptoOrders((prevSelected) =>
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

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  const paginatedSurveys = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < cryptoOrders.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders.length === cryptoOrders.length;
  const theme = useTheme();

  const navigate = useNavigate();

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
                <InputLabel>Survey Type</InputLabel>
                <Select
                  value={filters.surveyType || 'all'}
                  onChange={handleStatusChange}
                  label="Survey Type"
                  autoWidth
                >
                  {surveyTypes.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Current Surveys"
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
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell>
              <TableCell>Survey Title</TableCell>
              <TableCell>Selected Gender</TableCell>
              <TableCell>Survey Type</TableCell>
              <TableCell align="right">Demography</TableCell>
              <TableCell align="right">Surveys Completed</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSurveys.slice(0).reverse().map((surveyObject) => {
              const isSurveySelected = selectedCryptoOrders.includes(
                surveyObject.id
              );
              return (
                <TableRow
                  hover
                  key={surveyObject.id}
                  selected={isSurveySelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isSurveySelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, surveyObject.id)
                      }
                      value={isSurveySelected}
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
                      {surveyObject.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {surveyObject.ageLimit}
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
                      {surveyObject.gender}
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
                      {surveyObject.surveyType}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {/* {surveyObject.sourceDesc} */}
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
                      {surveyObject.country}
                      {surveyObject.region}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {surveyObject.zone}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(surveyObject.completedSurveys)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View Survey" arrow>
                      <IconButton
                        onClick={() => {
                          saveSelectedSurvey(surveyObject.id)
                          navigate(routes.SURVEY.SINGLE_SURVEY.ROUTE, { replace: true })
                        }}
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <ViewIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {/* <Tooltip title="Edit Survey" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip> */}
                    <Tooltip title="Delete Survey" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
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
          count={filteredCryptoOrders.length}
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
  cryptoOrders: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  cryptoOrders: []
};

const mapStateToProps = (state: any, ownProps: any) => ({ ...ownProps })

const mapDispatchToProps = (dispatch: any) => ({
  saveSelectedSurvey: (payload: string) => dispatch(Actions.saveSelectedSurvey(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentOrdersTable);