import {
  Button, CircularProgress, Container, Grid, TextField, Card,
  CardActions, CardContent, Typography, Checkbox, ListItemIcon,
  ListItemText, makeStyles, FormControlLabel
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { INewsInput } from "src/store/States/News/news.types";
import { createNews } from "src/store/States/News/actions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import { useNavigate } from "react-router";
import { ResponseType } from "src/store/States/Helpers/response.types";
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import React from "react";
import PropTypes from 'prop-types';
import { Actions, selectNewses } from "src/store/States/News";
import routes from 'src/constants/routes'

export function CreateNews(props) {
  const gender = ["MALE", "FEMALE"];


  const navigate = useNavigate();

  const [isFailed, setIsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // fields
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState([]);
  const [minAge, setMinAge] = useState(null);
  const [maxAge, setMaxAge] = useState(null);
  const [sex, setSex] = useState([]);
  const [location, setLocation] = useState(null);
  const [isForAll, setIsForAll] = useState(false);
  // fields error
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [minAgeError, setMinAgeError] = useState(null);
  const [maxAgeError, setMaxAgeError] = useState(null);
  const [sexError, setSexError] = useState(null);
  const [locationError, setLocationError] = useState(null);


  const createNewsHandler = (input: INewsInput) => {
    setIsLoading(true)
    input.targetingOptions.sex = input.targetingOptions.sex.map(value => `${value}`);
    createNews(input, (err: any, data: any) => {
      switch (data.__typename) {
        case ResponseType.ValidationError:
          // setErrorMessminAge(data.errors[0].error_messminAge);
          setIsLoading(false);
          break;
        case ResponseType.ValidationErrors:
          // setErrorMessminAge(data.validation_errors[0].errors[0].error_messminAge);
          setIsLoading(false);
          break;
        case ResponseType.INewsSimple:
          setIsLoading(false)
          // props.SetNewses(data)
          navigate(routes.ADMIN.NEWS.ROUTE, { replace: true })
          break;
      }
    }
    )
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setRole(event.target.value);
  };

  const {
    register: registerCreateNews,
    handleSubmit: handleCreateNewsSubmit,
    formState: { errors: createNewsErrors },
  } = useForm<INewsInput>();



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
  // const [personName, setPersonName] = React.useState<string[]>([]);

  const handleGenderSelectionChange = (event: SelectChangeEvent<typeof sex>) => {
    const {
      target: { value },
    } = event;
    setSex(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const createNewsForm = () => <form onSubmit={handleCreateNewsSubmit(createNewsHandler)}>
    <Card sx={{ minWidth: 275, marginTop: 5, marginRight: 5, padding: 4 }}>
      <CardContent>
        <Typography variant="h3" component="div">
          Create News
        </Typography>
        <Box>
          <TextField
            sx={{ width: "60%", mt: 4 }}
            error={((createNewsErrors.content !== undefined ? createNewsErrors.content.title : false) || titleError) ? true : false}
            {...registerCreateNews("content.title", { required: true })}
            type="text"
            label="title"
            variant="outlined"
            value={title ?? ""}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            helperText={(createNewsErrors.content !== undefined ? createNewsErrors.content.title : false) ? <span>This field is required</span> : (titleError ? titleError : null)}
          />
          <TextField
            sx={{ width: "60%", mt: 4 }}
            error={((createNewsErrors.content !== undefined ? createNewsErrors.content.description : false) || descriptionError) ? true : false}
            {...registerCreateNews("content.description", { required: true })}
            label="description"
            onChange={(e) => {
              setDescription(description)
            }}
            helperText={(createNewsErrors.content !== undefined ? createNewsErrors.content.description : false) ? <span>This field is required</span> : (descriptionError ? descriptionError : null)}
            variant="outlined"
            type="text"
            multiline
            rows={4}
          />
          <Box sx={{ marginTop: 5, color: "primary", fontWeight: "bold" }}>
            Targeted User Options
          </Box>
          <TextField
            value={minAge ?? ""}
            sx={{ width: "60%", mt: 4 }}
            error={(minAgeError || (createNewsErrors.targetingOptions !== undefined ? createNewsErrors.targetingOptions.min_age : false)) ? true : false}
            {...registerCreateNews("targetingOptions.min_age", { required: true })}
            label="minimum minAge"
            type="number"
            variant="outlined"
            onChange={(e) => {
              setMinAge(e.target.value);
            }}
            helperText={(createNewsErrors.targetingOptions !== undefined ? createNewsErrors.targetingOptions.min_age : false) ? <span>This field is required</span> : (minAgeError ? minAgeError : null)}
          />
          <TextField
            value={maxAge ?? ""}
            sx={{ width: "60%", mt: 4 }}
            error={(maxAgeError || (createNewsErrors.targetingOptions !== undefined ? createNewsErrors.targetingOptions.max_age : false)) ? true : false}
            {...registerCreateNews("targetingOptions.max_age", { required: true })}
            label="max minAge"
            type="number"
            variant="outlined"
            onChange={(e) => {
              setMaxAge(e.target.value);
            }}
            helperText={(createNewsErrors.targetingOptions !== undefined ? createNewsErrors.targetingOptions.max_age : false) ? <span>This field is required</span> : (minAgeError ? minAgeError : null)}
          />
          <TextField
            value={location ?? ""}
            sx={{ width: "60%", mt: 4 }}
            error={(locationError || (createNewsErrors.targetingOptions !== undefined ? createNewsErrors.targetingOptions.location : false)) ? true : false}
            {...registerCreateNews("targetingOptions.location", { required: true })}
            label="location"
            type="text"
            variant="outlined"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            helperText={(createNewsErrors.targetingOptions !== undefined ? createNewsErrors.targetingOptions.max_age : false) ? <span>This field is required</span> : (minAgeError ? minAgeError : null)}
          />
          <FormControl sx={{ width: "60%", mt: 4 }}>
            <InputLabel id="gender-selector">Gender</InputLabel>
            <Select
              error={(maxAgeError || (createNewsErrors.targetingOptions !== undefined ? createNewsErrors.targetingOptions.sex : false)) ? true : false}
              {...registerCreateNews("targetingOptions.sex", { required: true })}
              labelId="gender-selector"
              id="demo-multiple-chip"
              multiple
              value={sex}
              onChange={handleGenderSelectionChange}
              input={<OutlinedInput id="select-multiple-chip" label="gender" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {["MALE", "FEMALE"].map((value) => (
                <MenuItem
                  key={value}
                  value={value}
                  style={getStyles(value, sex, theme)}
                >
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'block' }}>
            <FormControlLabel
              control={
                <Checkbox
                  {...registerCreateNews("targetingOptions.isForAll", { required: false })}
                  checked={isForAll}
                  onChange={(e) => {
                    setIsForAll(e.target.checked)
                  }}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />
              }
              label="For All"
            />
          </Box>
          <Box sx={{ display: 'block' }}>
            <Button sx={{ mt: 4, px: 5 }} variant="contained" color="primary" type="submit">
              {isLoading ? <CircularProgress style={{ color: "white" }} /> : "create"}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  </form>

console.log("jnkjbakjbkjbkjb")

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
            {createNewsForm()}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

CreateNews.propTypes = {
  newses: PropTypes.array.isRequired
};

const mapStateToProps = (state: any) => ({
  newses: selectNewses(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  SetNewses: (payload: any) => dispatch(Actions.SetNewses(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNews);
