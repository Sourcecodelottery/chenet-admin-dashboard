import { ChangeEvent, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip, Divider, Box, Card, Checkbox, IconButton, Table, useTheme, Typography,
  TableBody, TableCell, TableHead, TablePagination, TableRow, TableContainer, Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, DialogProps,
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BulkActions from './BulkActions';
import { connect } from 'react-redux'
import { Actions, selectNewses } from 'src/store/States/News';
import { INewsDoc, INewsSimple } from 'src/store/States/News/news.types';
import { useForm } from 'react-hook-form';
import { ResponseType } from 'src/store/States/Helpers/response.types';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router';
import Label from 'src/my/components/Label';
import { FetchNewsesDoc, removeOneNews } from 'src/store/States/News/actions';
import React from 'react';

export let selectedIDs = [];


const RecentNewsTable = (props: any) => {
  const navigate = useNavigate();

  // fetch newses at start up.
  useEffect(() => {
    console.log('fetching newses');
    FetchNewsesDoc((error: any, data: any) => {
      props.SetNewses(data)
      setNewses(data)
    });
  }, []);


  const [newses, setNewses] = useState([]);
  const [newsNameError, setNewsNameError] = useState(null);
  const [selectedNewses, setSelectedNewses] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedNewses.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [deleteNews, setDeleteNews] = useState(null)
  const [news, setNews] = useState(null)

  const [openAlert, setOpenAlert] = useState(false);
  const [openDetailModal, setOpenDetailModal] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');
  const applyPagination = (
    newses: INewsDoc[],
    page: number,
    limit: number
  ): INewsDoc[] => {
    return newses.slice(page * limit, page * limit + limit);
  };
  const selectedSomeNewses =
    selectedNewses.length > 0 &&
    selectedNewses.length < newses.length;
  const selectedAllNewses =
    selectedNewses.length === newses.length;
  const theme = useTheme();
  const paginatedNewses = applyPagination(
    newses,
    page,
    limit
  );
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));




  // fetch newses at start up.
  useEffect(() => {
  }, [setNews, news]);

  // select all newses check box
  const handleSelectAllNewses = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedNewses(
      event.target.checked
        ? newses.map((news) => news._id)
        : []
    );
    selectedIDs.push(selectedNewses);
  };

  // check one news check box.
  const handleSelectOneNews = (
    event: ChangeEvent<HTMLInputElement>,
    newsId: string
  ): void => {
    if (!selectedNewses.includes(newsId)) {
      setSelectedNewses((prevSelected) => [
        ...prevSelected,
        newsId
      ]);
    } else {
      setSelectedNewses((prevSelected) =>
        prevSelected.filter((id) => id !== newsId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  // delete news
  const handleDeleteNews = () => {
    removeOneNews({ _id: deleteNews!._id }, (error, data) => {
      switch (data.__typename) {
        case ResponseType.ValidationError:
          console.log("data base error", data);
          break;
        case ResponseType.INewsSimple:
          FetchNewsesDoc((error: any, data: any) => {
            props.SetNewses(data)
            setNewses(data)
          });
          break;
      }
    });
    handleCloseAlert()
  }

  const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const handleFullWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullWidth(event.target.checked);
  }

  //edit news form
  const { register: registerEdit, handleSubmit: handleEditSubmit, formState: { errors: newsEditErrors } } = useForm();

  const handleShowAlertModal = (news: INewsDoc) => {
    setDeleteNews(news);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleClickOpenDetailModal = (news: INewsDoc) => {
    setNews(news)
    setOpenDetailModal(true); console.log(news);
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
          aria-labelledby="responsive-dialog-title"
          onClose={handleCloseDetailModal}
        >
          <DialogTitle sx={{ fontWeight: 'bold', fontSize: 'h2.fontSize' }}>{news !== null ? news.content.title : ""}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {news !== null ? news.content.description : ""}
            </DialogContentText>
            {/* <DialogContentText> */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Min Age</TableCell>
                    <TableCell align="center">Max Age</TableCell>
                    <TableCell align="center">Location</TableCell>
                    <TableCell align="center">Gender</TableCell>
                    <TableCell align="center">For All</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    hover
                    key={news !== null ? news._id : ""}
                  >
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {news !== null ? news.targetingOptions.max_age : ""}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {news !== null ? news.targetingOptions.min_age : ""}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {news !== null ? news.targetingOptions.location : ""}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {news !== null ? news.targetingOptions.sex : ""}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {news !== null ? (news.targetingOptions.isForAll ? "true" : "false") : ""}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {/* </DialogContentText> */}
            <Box sx={{ marginTop: 2 }}>
              <Label color="primary">
                <Box sx={{ fontWeight: 'bold' }} component="span" display="inline">
                  {news ? `sender:   ${news.sender.first_name} ${news.sender.last_name}` : ""}
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

      {/* start alert dialog box for delete news */}
      <Dialog open={openAlert} onClose={handleCloseAlert}>
        <DialogTitle ><Box sx={{ fontWeight: 'bold' }} component="span" display="inline">Alert</Box></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete <Label color="primary"> <Box sx={{ fontWeight: 'bold' }} component="span" display="inline">{deleteNews ? `${deleteNews.content.title}` : ""}</Box></Label> News?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert}>Cancel</Button>
          <Button onClick={handleDeleteNews} color="error" autoFocus>
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
                    checked={selectedAllNewses}
                    indeterminate={selectedSomeNewses}
                    onChange={handleSelectAllNewses} />
                </TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Sender</TableCell>
                <TableCell align="center">Detail</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedNewses.map((news) => {
                const isNewsSelected = selectedNewses.includes(
                  news._id
                );
                return (
                  <TableRow
                    hover
                    key={news._id}
                    selected={isNewsSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isNewsSelected}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleSelectOneNews(event, news._id)}
                        value={isNewsSelected} />
                    </TableCell>

                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {news.content.title}
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
                        {`${news.sender.first_name} ${news.sender.last_name}`}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Show Detail" arrow>
                        <IconButton
                          onClick={() => handleClickOpenDetailModal(news)}
                          size="medium"
                        >
                          <VisibilityIcon fontSize="medium" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      {/* <Tooltip title="Edit News" arrow>
                        <IconButton
                          onClick={() => {
                            navigate(`/newses/${news._id}`, { replace: false });
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
                      <Tooltip title="Delete News" arrow>
                        <IconButton
                          onClick={() => {

                            handleShowAlertModal(news);
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
            count={newses.length}
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

RecentNewsTable.propTypes = {
  newses: PropTypes.array.isRequired
};

const mapStateToProps = (state: any) => ({
  newses: selectNewses(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  SetNewses: (payload: any) => dispatch(Actions.SetNewses(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecentNewsTable);



