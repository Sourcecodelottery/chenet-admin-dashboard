import { Grid, Box, TextField, Avatar, Card, styled, IconButton, Button, MenuItem } from "@mui/material"
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/RemoveCircleOutlineRounded'

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    margin-top: 20px;
    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
      margin-top: -110px;

  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);


interface Props {
  errors: any[]
  setErrors: (errors: any[]) => void
  handleChange: (data: any) => void
  handleVehiclePictures: (data: any, idx: string) => void
  addVehiclePicture: () => void
  removeVehiclePicture: (idx: string) => void
  formData: any
  errorData: any
  fleet_types: any[]
  fleet_models: any[]
  fleet_brands: any[]
}

const Input = styled('input')({
  display: 'none'
});

// bottom: ${theme.spacing(13)};

const PageTwo: React.FC<Props> = ({
  handleChange,
  formData,
  errors,
  handleVehiclePictures,
  addVehiclePicture,
  removeVehiclePicture,
  fleet_types,
  fleet_models,
  fleet_brands,
  errorData
}) => {
  const getError = (name: string) => {
    const keys = Object.keys(errorData)
    const values = Object.values(errorData) as unknown as string[]
    const index = keys.findIndex(error => error === name)
    return index >= 0 ? { error: true, value: values[index].replace("_", " ") } : { error: false, value: "" }
  }
  
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={4} xs={12}>
          <Box sx={{ maxWidth: "80%", mt: 4 }}>
            <TextField
              select
              type="text"
              label="Fleet Brand"
              variant="outlined"
              fullWidth
              size="small"
              name="fleet_brand"
              onChange={handleChange}
              value={formData.fleet_brand}
              error={Boolean(getError("fleet_brand").value)}
              helperText={getError("fleet_brand").value}
            >
              {fleet_brands.map(fleet_brand => (
                <MenuItem value={fleet_brand._id}>{fleet_brand.name}</MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box sx={{ maxWidth: "80%", mt: 4 }}>
            <TextField
              type="text"
              select
              label="Fleet Model"
              variant="outlined"
              fullWidth
              size="small"
              name="fleet_model"
              onChange={handleChange}
              value={formData.fleet_model}
              error={Boolean(getError("fleet_model").value)}
              helperText={getError("fleet_model").value}
            >
              {fleet_models.map(fleet_brand => (
                <MenuItem value={fleet_brand._id}>{fleet_brand.name}</MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box sx={{ maxWidth: "80%", mt: 4 }}>
            Is Truck Available?
            <input type="checkbox" name="truck_available" checked={formData.truck_available} onChange={handleChange} />
            {getError("fleet_model").error && <label style={{ color: 'red' }}>{getError("fleet_model").value}</label>}
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={4} xs={12}>
          <Box sx={{ maxWidth: "80%", mt: 4 }}>
            <TextField
              type="text"
              label="Fleet Body Color"
              variant="outlined"
              fullWidth
              size="small"
              name="fleet_body_color"
              onChange={handleChange}
              value={formData.fleet_body_color}
              error={Boolean(getError("fleet_body_color").value)}
              helperText={getError("fleet_body_color").value}
            />
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box sx={{ maxWidth: "80%", mt: 4 }}>
            <TextField
              select
              label="Fleet Type"
              variant="outlined"
              fullWidth
              size="small"
              name="fleet_type"
              onChange={handleChange}
              value={formData.fleet_type}
              error={Boolean(getError("fleet_type").value)}
              helperText={getError("fleet_type").value}
            >
              {fleet_types.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box sx={{ maxWidth: "80%", mt: 4 }}>
            <TextField
              label="Fleet Plate Number"
              variant="outlined"
              fullWidth
              size="small"
              name="fleet_plate_number"
              onChange={handleChange}
              value={formData.fleet_plate_number}
              error={Boolean(getError("fleet_plate_number").value)}
              helperText={getError("fleet_plate_number").value}
            />
          </Box>
        </Grid>
      </Grid>
      <div style={{ display: "flex", flexDirection: "row", marginTop: 140 }}>
        <h4 style={{ marginTop: -20 }}>Vehicle Photo</h4>
        {formData.vehicle_photos.map(picture => (
          <AvatarWrapper>
            <Avatar variant="rounded" alt={"user.name"} src={picture.value} />
            <ButtonUploadWrapper>
              <Input
                id={`${picture.idx}-icon-button-file`}
                name={`${picture.idx}-icon-button-file`}
                type="file"
                onChange={event => {
                  console.log("fetched")
                  handleVehiclePictures(event, picture.idx)
                }}
              />
              <IconButton component="span" color="error" style={{ marginBottom: 150, backgroundColor: "red" }} onClick={() => removeVehiclePicture(picture.idx)}>
                <RemoveIcon />
              </IconButton>
              <label htmlFor={`${picture.idx}-icon-button-file`}>
                <IconButton component="span" color="primary">
                  <UploadTwoToneIcon />
                </IconButton>
              </label>
            </ButtonUploadWrapper>
          </AvatarWrapper>
        ))}
        <Button
          aria-label="increase"
          onClick={() => {
            addVehiclePicture()
          }}
        >
          <AddIcon fontSize="small" />
        </Button>
      </div>

    </>
  )
}

export default PageTwo