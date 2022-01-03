import { Button, CircularProgress, Container, Box, Grid, TextField, Theme, useTheme, CardMedia, Card } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { INotificationInput } from "src/store/States/Notification/notification.types";
import { createNotification } from "src/store/States/Notification/actions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import { useNavigate } from "react-router";
import { ResponseType } from "src/store/States/Helpers/response.types";
import { fetchAllUsersSimple } from "src/store/States/User/axtion";
import { IUserSimple } from "src/store/States/User/user.types";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import React from "react";
import PropTypes from 'prop-types';
import { Actions, selectNewses } from "src/store/States/News";
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';

export function CreateNotification(props) {
  const navigate = useNavigate();

  const [users, setUsers] = useState([])
  const [isFailed, setIsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // fields
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState([]);
  const [targetedUsers, setTargetedUser] = useState([]);
  const [images, setImages] = useState([])
  // fields error
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [targetedUsersError, setTargetedUserError] = useState(null);

  useEffect(() => {
    fetchAllUsersSimple((error, data) => {
      setUsers(data)
    })
  }, []);

  const createNotificationHandler = async (input: INotificationInput) => {
    setIsLoading(true)
    createNotification(input, (err: any, data: any) => {
      if (data.success) {
        setIsLoading(false)
        navigate('/notifications', { replace: true })
      } else {
        setIsLoading(false)
      }
    })
  }

  const Input = styled('input')({
    display: 'none'
  });

  const CardCover = styled(Card)(
    ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
  );

  const CardCoverAction = styled(Box)(
    ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
  );

  const {
    register: registerCreateNotification,
    handleSubmit: handleCreateNotificationSubmit,
    formState: { errors: createNotificationErrors },
  } = useForm<INotificationInput>();



  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


  function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();

  const handleGenderSelectionChange = (event: SelectChangeEvent<typeof targetedUsers>) => {
    const {
      target: { value },
    } = event;
    setTargetedUser(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const createNotificationForm = () => <form onSubmit={handleCreateNotificationSubmit(createNotificationHandler)}>
    <h1>Create Notification</h1>
    <TextField
      sx={{ width: "60%", mt: 4 }}
      error={((createNotificationErrors.content !== undefined ? createNotificationErrors.content.title : false) || titleError) ? true : false}
      {...registerCreateNotification("content.title", { required: true })}
      type="text"
      label="title"
      variant="outlined"
      value={title ?? ""}
      onChange={(e) => {
        setTitle(e.target.value)
      }}
      helperText={(createNotificationErrors.content !== undefined ? createNotificationErrors.content.title : false) ? <span>This field is required</span> : (titleError ? titleError : null)}
    />
    <TextField
      sx={{ width: "60%", mt: 4 }}
      error={((createNotificationErrors.content !== undefined ? createNotificationErrors.content.description : false) || descriptionError) ? true : false}
      {...registerCreateNotification("content.description", { required: true })}
      label="description"
      onChange={(e) => {
        setDescription(description)
      }}
      helperText={(createNotificationErrors.content !== undefined ? createNotificationErrors.content.description : false) ? <span>This field is required</span> : (descriptionError ? descriptionError : null)}
      variant="outlined"
      type="text"
      multiline
      rows={4}
    />
    <FormControl sx={{ width: "60%", mt: 4 }}>
      <InputLabel id="targeted-users">Targeted Users</InputLabel>
      <Select
        error={(targetedUsersError || createNotificationErrors.targeted_users) ? true : false}
        {...registerCreateNotification("targeted_users", { required: true })}
        labelId="targeted-users"
        id="demo-multiple-chip"
        multiple
        value={targetedUsers}
        onChange={handleGenderSelectionChange}
        input={<OutlinedInput id="select-multiple-chip" label="targeted users" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {users.map((value) => (
          <MenuItem
            key={value._id}
            value={value._id}
            style={getStyles(value, targetedUsers, theme)}
          >
            {value.first_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <Box sx={{ display: 'block', marginTop: 4 }}>
      <Input
        onChange={({ currentTarget: { files } }) => {

        }}
        {...registerCreateNotification("content.images", { required: true })}
        accept="image/*" id="change-cover" multiple type="file" />
      <label htmlFor="change-cover">
        <Button
          startIcon={<UploadTwoToneIcon />}
          variant="contained"
          component="span"
        >
          Images
        </Button>
      </label>
    </Box>
    <Box sx={{ display: 'block' }}>
      <Button sx={{ mt: 4, px: 5 }} variant="contained" color="primary" type="submit">
        {isLoading ? <CircularProgress style={{ color: "white" }} /> : "create"}
      </Button>
    </Box>
  </form>


  return (
    <>
      <Helmet>
        <title>Ethio Lottery</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid
          sx={{ mx: "auto" }}
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            {createNotificationForm()}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default CreateNotification;