import { ChangeEvent, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip, Divider, Box, Card, Checkbox, IconButton, Table, useTheme, Typography,
  TableBody, TableCell, TableHead, TablePagination, TableRow, TableContainer, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField,
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { connect } from 'react-redux'
import { selectAccounts, FetchAccounts, Fetch as _FetchAccounts, Remove } from 'src/store/States/Account';
import { IAccountSimple } from 'src/store/States/Account/account.types';
import { removeOneAccount } from 'src/store/States/Account/actions';
import { useForm } from 'react-hook-form';
import { ResponseType } from 'src/store/States/Helpers/response.types';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router';
import Label from 'src/my/components/Label';

export let selectedIDs = [];


const RecentAccountsTable = (props: any) => {
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);
  const [accountNameError, setAccountNameError] = useState(null);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedAccounts.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [deleteAccount, setDeleteAccount] = useState(null)
  const [account, setAccount] = useState(null)
  const applyPagination = (
    accounts: IAccountSimple[],
    page: number,
    limit: number
  ): IAccountSimple[] => {
    return accounts.slice(page * limit, page * limit + limit);
  };
  const selectedSomeAccounts =
    selectedAccounts.length > 0 &&
    selectedAccounts.length < accounts.length;
  const selectedAllAccounts =
    selectedAccounts.length === accounts.length;
  const theme = useTheme();
  const paginatedAccounts = applyPagination(
    accounts,
    page,
    limit
  );
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // fetch accounts at start up.
  useEffect(() => {
    props.FetchAccounts();
    setAccounts(props.accounts)
  }, []);


  // rerender the UI if account changes
  useEffect(() => {
    setAccounts(props.accounts)
    setAccount(account)
  }, [props.accounts, setAccounts])

  // select all accounts check box
  const handleSelectAllAccounts = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedAccounts(
      event.target.checked
        ? accounts.map((account) => account._id)
        : []
    );
    selectedIDs.push(selectedAccounts);
  };

  // check one account check box.
  const handleSelectOneAccount = (
    event: ChangeEvent<HTMLInputElement>,
    accountId: string
  ): void => {
    if (!selectedAccounts.includes(accountId)) {
      setSelectedAccounts((prevSelected) => [
        ...prevSelected,
        accountId
      ]);
    } else {
      setSelectedAccounts((prevSelected) =>
        prevSelected.filter((id) => id !== accountId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  // delete account
  const handleDeleteAccount = () => {
    removeOneAccount({ _id: deleteAccount!._id }, (error, data) => {
      switch (data.__typename) {
        case ResponseType.ValidationError:
          console.log("data base error", data);
          break;
        case ResponseType.ValidationErrors:
          console.log('ValidationErrors', data)
          break;
        case ResponseType.IAccountSimple:
          props.FetchAccounts()
          break;
      }
    });
    handleCloseAlert()
  }

  //edit account form
  const { register: registerEdit, handleSubmit: handleEditSubmit, formState: { errors: accountEditErrors } } = useForm();

  const [openAlert, setOpenAlert] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleShowAlertModal = (account: IAccountSimple) => {
    setDeleteAccount(account);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const getStatusLabel = (account: IAccountSimple): JSX.Element => {
    const map = {
      DeActivated: {
        text: 'DeActivated',
        color: 'error'
      },
      Active: {
        text: 'Active',
        color: 'success'
      },
    };
    const { text, color }: any = account.is_active ? map.Active : map.DeActivated;

    return <Label color={color}>{text}</Label>;
  };


  return (
    <>
      {/* start alert dialog box for delete account */}
      <Dialog open={openAlert} onClose={handleCloseAlert}>
        <DialogTitle ><Box sx={{ fontWeight: 'bold' }} component="span" display="inline">Alert</Box></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Deactivate <Label color="primary"> <Box sx={{ fontWeight: 'bold' }} component="span" display="inline">{deleteAccount ? `${deleteAccount.first_name} ${deleteAccount.last_name}` : ""}</Box></Label> Account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert}>Cancel</Button>
          <Button onClick={handleDeleteAccount} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* end of alert dialog*/}

      <Card>
        {selectedBulkActions && (
          <Box flex={1} p={2}>
            <BulkActions />
          </Box>
        )}
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={selectedAllAccounts}
                    indeterminate={selectedSomeAccounts}
                    onChange={handleSelectAllAccounts} />
                </TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedAccounts.map((account) => {
                const isAccountSelected = selectedAccounts.includes(
                  account._id
                );
                return (
                  <TableRow
                    hover
                    key={account._id}
                    selected={isAccountSelected}
                  >
                    <TableCell padding="checkbox">
                      {
                        account.role === "SUPER_ADMIN" ? "" :
                          <>
                            <Checkbox
                              color="primary"
                              checked={isAccountSelected}
                              onChange={(event: ChangeEvent<HTMLInputElement>) => handleSelectOneAccount(event, account._id)}
                              value={isAccountSelected} />
                          </>}
                    </TableCell>

                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {account.first_name}
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
                        {account.last_name}
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
                        {account.phone_number}
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
                        {account.email}
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
                        {account.role.replace("_", " ")}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {getStatusLabel(account)}
                    </TableCell>
                    <TableCell align="right">
                      {
                        account.role === "SUPER_ADMIN" ?
                          <Label color="error">can't edit</Label> :
                          <><Tooltip title="Edit Account" arrow>
                            <IconButton
                              onClick={() => {
                                navigate(`/accounts/${account._id}`, { replace: false });
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
                              <EditTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip><Tooltip title="Deactivate Account" arrow>
                              <IconButton
                                onClick={() => {

                                  handleShowAlertModal(account);
                                }}
                                sx={{
                                  '&:hover': { background: theme.colors.error.lighter },
                                  color: theme.palette.error.main
                                }}
                                color="inherit"
                                size="small"
                              >
                                <DeleteTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip></>
                      }
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
            count={accounts.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30]} />
        </Box>
      </Card></>
  );
};

RecentAccountsTable.propTypes = {
  accounts: PropTypes.array.isRequired
};

const mapStateToProps = (state: any) => ({
  accounts: selectAccounts(state)
})

const mapDispatchToProps = (dispatch: any) => ({
  FetchAccounts: () => dispatch(_FetchAccounts(FetchAccounts())),
  RemoveAccount: (_id: string) => dispatch(Remove({ _id }))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentAccountsTable)



