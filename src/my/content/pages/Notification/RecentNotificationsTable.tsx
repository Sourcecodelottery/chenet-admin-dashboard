import { ChangeEvent, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip, Divider, Box, Card, Checkbox, IconButton, Table, useTheme, Typography,
  TableBody, TableCell, TableHead, TablePagination, TableRow, TableContainer, Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, DialogProps,
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BulkActions from './BulkActions';
import { connect } from 'react-redux'
import { Actions, selectNotifications } from 'src/store/States/Notification';
import { INotificationDoc } from 'src/store/States/Notification/notification.types';
import { useForm } from 'react-hook-form';
import { ResponseType } from 'src/store/States/Helpers/response.types';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router';
import Label from 'src/my/components/Label';
import { FetchNotificationsDoc, removeOneNotification } from 'src/store/States/Notification/actions';
import React from 'react';
import { INewsDoc } from 'src/store/States/News/news.types';

export let selectedIDs = [];


const RecentNotificationsTable = (props: any) => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [notificationNameError, setNotificationNameError] = useState(null);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedNotifications.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [deleteNotification, setDeleteNotification] = useState(null)
  const [notification, setNotification] = useState(null)
  const [openDetailModal, setOpenDetailModal] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm'); const applyPagination = (
    notifications: INotificationDoc[],
    page: number,
    limit: number
  ): INotificationDoc[] => {
    return notifications.slice(page * limit, page * limit + limit);
  };
  const selectedSomeNotifications =
    selectedNotifications.length > 0 &&
    selectedNotifications.length < notifications.length;
  const selectedAllNotifications =
    selectedNotifications.length === notifications.length;
  const theme = useTheme();
  const paginatedNotifications = applyPagination(
    notifications,
    page,
    limit
  );
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // fetch notifications at start up.
  useEffect(() => {
    FetchNotificationsDoc((error: any, data: any) => {
      props.SetNotifications(data)
      setNotifications(data)
    });
  }, []);


  // select all notifications check box
  const handleSelectAllNotifications = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedNotifications(
      event.target.checked
        ? notifications.map((notification) => notification._id)
        : []
    );
    selectedIDs.push(selectedNotifications);
  };

  // check one notification check box.
  const handleSelectOneNotification = (
    event: ChangeEvent<HTMLInputElement>,
    notificationId: string
  ): void => {
    if (!selectedNotifications.includes(notificationId)) {
      setSelectedNotifications((prevSelected) => [
        ...prevSelected,
        notificationId
      ]);
    } else {
      setSelectedNotifications((prevSelected) =>
        prevSelected.filter((id) => id !== notificationId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  // delete notification
  const handleDeleteNotification = () => {
    removeOneNotification({ _id: deleteNotification!._id }, (error, data) => {
      switch (data.__typename) {
        case ResponseType.ValidationError:
          console.log("data base error", data);
          break;
        case ResponseType.INotificationSimple:
          FetchNotificationsDoc((error: any, data: any) => {
            props.SetNotifications(data)
            setNotifications(data)
          });
          break;
      }
    });
    handleCloseAlert()
  }

  //edit notification form
  const { register: registerEdit, handleSubmit: handleEditSubmit, formState: { errors: notificationEditErrors } } = useForm();

  const [openAlert, setOpenAlert] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleShowAlertModal = (notification: INotificationDoc) => {
    setDeleteNotification(notification);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const getStatusLabel = (notification: INotificationDoc): JSX.Element => {
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
    const { text, color }: any = notification._id === null ? map.Active : map.DeActivated;

    return <Label color={color}>{text}</Label>;
  };

  const handleClickOpenDetailModal = (notification: INotificationDoc) => {
    setNotification(notification)
    setOpenDetailModal(true); console.log(notification);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
  };

  return (
    <>
      {/* start detail modal */}
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={openDetailModal}
          onClose={handleCloseDetailModal}
        >
          <DialogTitle sx={{ fontWeight: 'bold', fontSize: 'h2.fontSize' }}>{notification !== null ? notification.content.title : ""}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {notification !== null ? notification.content.description : ""}
            </DialogContentText>
            <Box sx={{ marginTop: 2 }}>
              <Label color="primary">
                <Box sx={{ fontWeight: 'bold' }} component="span" display="inline">
                  {notification ? `sender:   ${notification.sender.first_name} ${notification.sender.last_name}` : ""}
                </Box>
              </Label>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDetailModal}>Close</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      {/* end detail modal */}

      {/* start alert dialog box for delete notification */}
      <Dialog open={openAlert} onClose={handleCloseAlert}>
        <DialogTitle ><Box sx={{ fontWeight: 'bold' }} component="span" display="inline">Alert</Box></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete <Label color="primary"> <Box sx={{ fontWeight: 'bold', }} component="span" display="inline">{deleteNotification ? `${deleteNotification.content.title}` : ""}</Box></Label> Notification?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert}>Cancel</Button>
          <Button onClick={handleDeleteNotification} color="error" autoFocus>
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
                    checked={selectedAllNotifications}
                    indeterminate={selectedSomeNotifications}
                    onChange={handleSelectAllNotifications} />
                </TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Sender</TableCell>
                <TableCell align="center">Detail</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedNotifications.map((notification) => {
                const isNotificationSelected = selectedNotifications.includes(
                  notification._id
                );
                return (
                  <TableRow
                    hover
                    key={notification._id}
                    selected={isNotificationSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isNotificationSelected}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleSelectOneNotification(event, notification._id)}
                        value={isNotificationSelected} />
                    </TableCell>

                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {notification.content.title}
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
                        {`${notification.sender.first_name} ${notification.sender.last_name}`}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Show Detail" arrow>
                        <IconButton
                          onClick={() => handleClickOpenDetailModal(notification)}
                          size="medium"
                        >
                          <VisibilityIcon fontSize="medium" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      {/* <Tooltip title="Edit Notification" arrow>
                        <IconButton
                          onClick={() => {
                            navigate(`/notifications/${notification._id}`, { replace: false });
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
                      </Tooltip> */}
                      <Tooltip title="Delete Notification" arrow>
                        <IconButton
                          onClick={() => {

                            handleShowAlertModal(notification);
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
            count={notifications.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30]} />
        </Box>
      </Card>
    </>
  );
};

RecentNotificationsTable.propTypes = {
  notifications: PropTypes.array
};

const mapStateToProps = (state: any) => ({
  notifications: selectNotifications(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  SetNotifications: (payload: any) => dispatch(Actions.SetNotifications(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecentNotificationsTable);



