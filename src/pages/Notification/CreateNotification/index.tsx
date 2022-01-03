import {
  Button, CircularProgress, Container, Box, Grid, TextField, Theme, useTheme, CardMedia, Card,
  RadioGroup, FormControlLabel, Radio
} from "@mui/material";
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
import { fetchAllUsersSimple } from "src/store/States/User/action";
import { IUserSimple } from "src/store/States/User/user.types";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import Chip from '@mui/material/Chip';
import React from "react";
import PropTypes from 'prop-types';
import { Actions, selectNewses } from "src/store/States/News";
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import routes from 'src/constants/routes'
import FormData from 'form-data'
import Axios from 'axios'
import endPoints from 'src/constants/endPoints'

export function CreateNotification(_props) {
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
  const [reset, setReset] = useState(false);

  useEffect(() => {
    fetchAllUsersSimple((_error, data) => {
      setUsers(data)
    })
  }, []);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [gender, setGender] = useState(null);

  useEffect(() => {
    let data = userOptions;
    let isFiltered: boolean = false;
    if (reset) {
      data = [];
      isFiltered = true;
    }
    if (selectAll) {
      setSelectedUsers(data);
      isFiltered = true;
    }
    if (gender === 'male') {
      data = data.filter(user => user.gender === 'MALE');
      isFiltered = true;
    } else if (gender === "female") {
      data = data.filter(user => user.gender === 'FEMALE');
      isFiltered = true;
    }

    if (isFiltered) {
      setSelectedUsers(data);
    }
  }, [gender, selectAll, reset]);

  interface IUserOption {
    readonly value: string;
    readonly label: string;
    readonly gender: string;
  }

  const userOptions: IUserOption[] = users.map(user =>
  ({
    value: user._id,
    label: user.first_name + ' ' + user.last_name,
    gender: user.gender !== null ? user.gender : null,
  }));

  const animatedComponents = makeAnimated();

  const createNotificationHandler = async (input: INotificationInput) => {
    setIsLoading(true)
    // createNotification(input, (_err: any, data: any) => {
    //   if (data.success) {
    //     setIsLoading(false)
    //     navigate(routes.ADMIN.NOTIFICATION.ROUTE, { replace: true })
    //   } else {
    //     setIsLoading(false)
    //   }
    // })
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

  const createNotificationHandle = () => {
    const _formData = new FormData()
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      _formData.append(`notification:${i}`, image)
    }
    let headersList = {
      "Accept": "*/*",
    }

    let reqOptions: any = {
      url: endPoints.uploadURL,
      method: "POST",
      headers: headersList,
      data: _formData,
    }

    Axios.request(reqOptions).then(function (_response) {
      if (_response.data.uri.length === images.length) {
        createNotification({
          content: {
            description: String(description), images: _response.data.uri, title
          },
          targeted_users: targetedUsers
        }, (_err: any, data: any) => {
          if (data._id) {
            setIsLoading(false)
            navigate(routes.ADMIN.NOTIFICATION.ROUTE, { replace: true })
          } else {
            setIsLoading(false)
          }
        })
      }
    })
  }

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
      onChange={(_e) => {
        setDescription(description)
      }}
      helperText={(createNotificationErrors.content !== undefined ? createNotificationErrors.content.description : false) ? <span>This field is required</span> : (descriptionError ? descriptionError : null)}
      variant="outlined"
      type="text"
      multiline
      rows={4}
    />
    <FormControl sx={{ width: "60%", mt: 4 }}>
      <Select
        closeMenuOnSelect={false}
        value={selectedUsers}
        components={animatedComponents}
        options={userOptions}
        isMulti
        onChange={(e) => { setSelectedUsers(e) }}
      />
    </FormControl><br />
    <FormControl component="fieldset">
      <RadioGroup row aria-label="gender"
        value={gender ?? ""}
        name="row-radio-buttons-group"
        onChange={(e) => {
          setGender(e.target.value);
        }}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
      </RadioGroup>
    </FormControl>
    <Box sx={{ display: 'block', marginTop: 4 }}>
      <Input
        onChange={({ currentTarget: { files } }) => {
          const payload = files as unknown as any[]
          setImages(payload)
        }}
        // {...registerCreateNotification("content.images", { required: true })}
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
      <Button sx={{ mt: 4, px: 5 }} variant="contained" color="primary" type="button" onClick={() => createNotificationHandle()}>
        {isLoading ? <CircularProgress style={{ color: "white" }} /> : "Create"}
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