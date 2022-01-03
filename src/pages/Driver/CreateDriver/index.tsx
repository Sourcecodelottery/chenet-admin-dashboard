import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { Container, Card, CircularProgress, Box, TextField, MenuItem, Button, CardContent } from '@mui/material';
import PageOne from "./PageOne"
import PageTwo from "./PageTwo"
import PageThree from "./PageThree"
import { useForm } from "react-hook-form"
import { IDriverInput, IDriverJSX } from "src/models/driver_model"
import { Gender, Bank } from "src/constants/interfaces"
import Axios from 'axios';
import endPoints from 'src/constants/endPoints';
import FormData from 'form-data'
import { AddDriver } from "src/store/States/Driver"
import { FetchFleetTypes } from 'src/store/States/Settings/Fleet Type/'
import { FetchFleetModels } from 'src/store/States/Settings/Fleet Model'
import { FetchFleetBrands } from 'src/store/States/Settings/Fleet Brand'
import routes from 'src/constants/routes'
import { useNavigate } from 'react-router'

const uuid = () => {
  return Math.random().toString()
}

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#784af4',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }),
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Driver Information', 'Fleet Information', 'Wallet'];

export default function CustomizedSteppers() {
  const [fleet_types, setFleetTypes] = React.useState([])
  const [fleet_models, setFleetModels] = React.useState([])
  const [fleet_brands, setFleetBrands] = React.useState([])

  const navigate = useNavigate();

  const requiredValues = {
    0: {
      first_name: true,
      middle_name: false,
      last_name: true,
      phone_number: true,
      email: true,
      kebele: true,
      city: true,
      sub_city: true,
      gender: true,
      birth_date: true,
      license_number: true,
      profile_picture: false,
      profile_picture_data: false
    },
    [1]: {
      truck_available: false,
      fleet_brand: true, // Needs table
      fleet_model: true, // Needs table
      fleet_body_color: true,
      fleet_type: true, // Needs table
      fleet_plate_number: true,
      vehicle_photos: false,
      vehicle_photos_data: false,
    },
    [2]: {
      bank: true,
      bank_account: true,
      telebirr_id: true,
      wallet_amount: true,
    }
  }

  const [errors, setErrors] = React.useState([])
  const [activeStep, setActiveStep] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false);
  let initIdx = uuid()
  const [formData, setFormData] = React.useState<any>({
    vehicle_photos_data: [{ idx: initIdx, value: "" }] as any[],
    vehicle_photos: [{ idx: initIdx, value: "https://thispersondoesnotexist.com/image" }],
    profile_picture: "" as any,
    profile_picture_data: {}
  })
  const [errorData, setErrorData] = React.useState<any>({})

  const removeVehiclePicture = (idx: string) => {
    setFormData({
      ...formData,
      vehicle_photos: formData.vehicle_photos.filter(picture => picture.idx !== idx),
      vehicle_photos_data: formData.vehicle_photos_data.filter(picture => picture.idx !== idx),
    })
  }

  const addVehiclePicture = () => {
    let idx = uuid()
    setFormData({
      ...formData, vehicle_photos: formData.vehicle_photos.concat({
        idx,
        value: "https://thispersondoesnotexist.com/image"
      }),
      vehicle_photos_data: formData.vehicle_photos_data.concat({
        idx,
        value: "https://thispersondoesnotexist.com/image"
      })
    })
  }

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    if (name === "truck_available") {
      setFormData({ ...formData, [name]: event.target.checked })
    } else {
      setFormData({ ...formData, [name]: value })
    }
    if (value.length > 0) {
      setErrors(errors.filter(error => error.name !== name))
    } else if (requiredValues[activeStep][name]) {
      setErrors(errors.concat({ name, value: `${name} is required` }))
    }
  }

  const handleProfilePicture = (event) => {
    const reader = new FileReader()
    reader.onload = function (e) {
      setFormData({
        ...formData,
        profile_picture: e.target.result,
        profile_picture_data: event.target.files[0]
      })
    };

    reader.readAsDataURL(event.target.files[0])
  }

  const handleVehiclePictures = (event: any, idx: string) => {
    const reader = new FileReader()
    reader.onload = function (e) {
      setFormData({
        ...formData,
        vehicle_photos: formData.vehicle_photos.map((data: any) => idx === data.idx ? { ...data, value: e.target.result } : data),
        vehicle_photos_data: formData.vehicle_photos_data.map((data: any) => idx === data.idx ? { ...data, value: event.target.files[0] } : data)
      })
    };

    reader.readAsDataURL(event.target.files[0])
  }

  const nextPage = () => {
    let _errors = []
    const formKeys = Object.keys(formData)
    const formValues = Object.values(formData)
    Object.keys(requiredValues[activeStep]).forEach((requiredKey, idx) => {
      const foundIndex = formKeys.findIndex(key => key === requiredKey)
      if (foundIndex < 0 && Object.values(requiredValues[activeStep])[idx]) {
        _errors.push({ name: requiredKey, value: `${requiredKey} is required` })
      } else if (Object.values(requiredValues[activeStep])[idx] && formValues[foundIndex] === '') {
        _errors.push({ name: requiredKey, value: `${requiredKey} is required` })
      }
    })
    if (_errors.length === 0) {
      setActiveStep(Math.min(2, activeStep + 1))
      if (activeStep === 2) {
        createDriver()
      }
    }
    setErrors(_errors)
  }

  React.useEffect(() => {
    FetchFleetTypes({}, (err, data) => {
      if (err) throw err
      setFleetTypes(data)
    })

    FetchFleetModels({}, (err, data) => {
      if (err) throw err
      setFleetModels(data)
    })

    FetchFleetBrands({}, (err, data) => {
      if (err) throw err
      setFleetBrands(data)
    })

  }, [])


  const createDriver = () => {
    const _formData = new FormData()
    _formData.append('profile_picture', formData.profile_picture_data)
    let headersList = {
      "Accept": "*/*",
    }

    let reqOptions: any = {
      url: "http://localhost:3009/upload",
      method: "POST",
      headers: headersList,
      data: _formData,
    }

    Axios.request(reqOptions).then(function (_response) {
      if (_response.data.uri[0]) {
        setFormData({
          ...formData, profile_picture: _response.data.uri[0]
        })
        const NewformData = new FormData()
        formData.vehicle_photos_data.forEach((picture, idx) => NewformData.append(`${idx}`, picture.value))

        reqOptions = {
          url: "http://localhost:3009/upload",
          method: "POST",
          headers: headersList,
          data: NewformData,
        }
        Axios.request(reqOptions).then(function (response) {
          if (response.data.uri) {
            setFormData({
              ...formData, vehicle_photos: response.data.uri
            })
            setIsLoading(true)
            console.log("jkj", formData)
            AddDriver({
              email: formData.email,
              first_name: formData.first_name,
              middle_name: formData.middle_name,
              last_name: formData.last_name,
              password: "password",
              phone_number: formData.phone_number,
              address: {
                city: formData.city,
                kebele: formData.kebele,
                sub_city: formData.sub_city,
              },
              bank: formData.bank,
              bank_account: formData.bank_account,
              birth_date: formData.birth_date,
              fleet_body_color: formData.fleet_body_color,
              fleet_brand: formData.fleet_brand,
              fleet_model: formData.fleet_model,
              fleet_plate_number: formData.fleet_plate_number,
              fleet_type: formData.fleet_type,
              gender: formData.gender,
              license_number: formData.license_number,
              profile_picture: _response.data.uri[0],
              truck_available: formData.truck_available,
              vehicle_photos: response.data.uri,
              wallet_amount: 12
            }, (error, data) => {
              setIsLoading(false)
              if (data.validation_errors) {
                let error = {}
                data.validation_errors.map(item => {
                  error[item.error_path] = item.errors[0].error_message
                })
                setErrorData(error)
              }
              if (data._id) {
                navigate(routes.ADMIN.DRIVER.ROUTE, { replace: true })
              }
            })
          }
        })
      }
    })
  }

  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={4}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Container>
          <h3>Create Driver</h3>
          <Card sx={{ marginTop: 3 }}>
            <Container sx={{ margin: 4 }}>
              {activeStep === 0 &&
                <PageOne
                  errors={errors}
                  errorData={errorData}
                  setErrors={setErrors}
                  handleChange={handleChange}
                  formData={formData}
                  handleProfilePicture={handleProfilePicture}
                />}
              {activeStep === 1 &&
                <PageTwo
                  errors={errors}
                  errorData={errorData}
                  fleet_types={fleet_types}
                  fleet_brands={fleet_brands}
                  fleet_models={fleet_models}
                  setErrors={setErrors}
                  handleChange={handleChange}
                  formData={formData}
                  handleVehiclePictures={handleVehiclePictures}
                  addVehiclePicture={addVehiclePicture}
                  removeVehiclePicture={removeVehiclePicture}
                />}
              {activeStep === 2 && <PageThree
                errors={errors}
                errorData={errorData}
                setErrors={setErrors}
                handleChange={handleChange}
                formData={formData}
              />}
            </Container>
          </Card>
          <Card style={{ marginTop: 40 }}>
            <CardContent>
              <Box
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                style={{ display: "flex", justifyContent: "space-evenly" }}
              >
                <Button
                  sx={{ margin: 1 }} variant="contained" color="primary" type="submit"
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                >
                  Previous
                </Button>
                <Button sx={{ margin: 1 }} variant="contained" color="secondary" type="button"
                  onClick={() => nextPage()}
                  disabled={errors.length > 0 || isLoading}
                >
                  {isLoading ? <CircularProgress /> :
                    activeStep === 2 ? "Create Driver" : "Next"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Stack>
    </>
  );
}