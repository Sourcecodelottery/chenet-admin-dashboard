import { Grid, Box, TextField, MenuItem, Avatar, styled, IconButton, Card } from "@mui/material"
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';

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
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const Input = styled('input')({
  display: 'none'
});

interface Props {
  errors: any[]
  setErrors: (errors: any[]) => void
  handleChange: (data: any) => void
  handleProfilePicture: (data: any) => void
  formData: any
  errorData: any
}

const PageOne: React.FC<Props> = ({ handleChange, formData, handleProfilePicture, errorData, errors }) => {
  const getError = (payload: string | number) => {
    if (Object.keys(errorData).length > 0) {
      const keys = Object.keys(errorData)
      const values = Object.values(errorData) as unknown as string[]
      const index = keys.findIndex(error => error === payload)
      return index >= 0 ? { error: true, value: values[index].replace("_", " ") } : { error: false, value: "" }
    }

    const index = errors.findIndex(error => error.name === payload)
    return index >= 0 ? errors[index] : {}
  }

  return (
    <div style={{ paddingTop: 50 }}>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={"user.name"} src={
          formData.profile_picture ? formData.profile_picture :
            "https://thispersondoesnotexist.com/image"
        } />
        <ButtonUploadWrapper>
          <Input
            id="icon-button-file"
            name="icon-button-file"
            type="file"
            onChange={handleProfilePicture}
          />
          <label htmlFor="icon-button-file">
            <IconButton component="span" color="primary">
              <UploadTwoToneIcon />
            </IconButton>
          </label>
        </ButtonUploadWrapper>
      </AvatarWrapper>
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
              label="First Name"
              variant="outlined"
              fullWidth
              size="small"
              name="first_name"
              onChange={handleChange}
              value={formData.first_name}
              error={getError("first_name").value}
              helperText={getError("first_name").value}
            />
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box sx={{ maxWidth: "80%", mt: 4 }}>
            <TextField
              type="text"
              label="Middle Name"
              variant="outlined"
              fullWidth
              size="small"
              onChange={handleChange}
              name="middle_name"
              value={formData.middle_name}
              error={getError("middle_name").value}
              helperText={getError("middle_name").value}
            />
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box sx={{ maxWidth: "80%", mt: 4 }}>
            <TextField
              type="text"
              label="Last Name"
              variant="outlined"
              fullWidth
              size="small"
              onChange={handleChange}
              name="last_name"
              value={formData.last_name}
              error={getError("last_name").value}
              helperText={getError("last_name").value}
            />
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
              type="email"
              label="Email"
              variant="outlined"
              fullWidth
              size="small"
              name="email"
              onChange={handleChange}
              value={formData.email}
              error={getError("email").value}
              helperText={getError("email").value}
            />
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box sx={{ maxWidth: "80%", mt: 4 }}>
            <TextField
              select
              label="Driver Sex"
              variant="outlined"
              fullWidth
              size="small"
              name="gender"
              onChange={handleChange}
              value={formData.gender}
              error={getError("gender").value}
              helperText={getError("gender").value}
            >
              {["MALE", "FEMALE"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box sx={{ maxWidth: "80%", mt: 4 }}>
            <TextField
              type="date"
              label="Driver Date of Birth"
              variant="outlined"
              fullWidth
              size="small"
              name="birth_date"
              onChange={handleChange}
              value={formData.birth_date}
              error={getError("birth_date").value}
              helperText={getError("birth_date").value}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={6} xs={12}>
          <Box sx={{ maxWidth: "80%", mt: 4 }}>
            <TextField
              type="email"
              label="License Number"
              variant="outlined"
              fullWidth
              size="small"
              onChange={handleChange}
              name="license_number"
              value={formData.license_number}
              error={getError("license_number").value}
              helperText={getError("license_number").value}
            />
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box sx={{ maxWidth: "80%", mt: 4 }}>
            <TextField
              type="email"
              label="Phone Number"
              variant="outlined"
              fullWidth
              size="small"
              onChange={handleChange}
              name="phone_number"
              value={formData.phone_number}
              error={getError("phone_number").value}
              helperText={getError("phone_number").value}
            />
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
              label="City"
              variant="outlined"
              fullWidth
              size="small"
              onChange={handleChange}
              name="city"
              value={formData.city}
              error={getError("city").value}
              helperText={getError("city").value}
            />
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box sx={{ maxWidth: "80%", mt: 4 }}>
            <TextField
              label="Sub-City"
              variant="outlined"
              fullWidth
              size="small"
              onChange={handleChange}
              name="sub_city"
              value={formData.sub_city}
              error={getError("sub_city").value}
              helperText={getError("sub_city").value}
            />
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box sx={{ maxWidth: "80%", mt: 4 }}>
            <TextField
              label="Kebele"
              variant="outlined"
              fullWidth
              size="small"
              onChange={handleChange}
              name="kebele"
              value={formData.kebele}
              error={getError("kebele").value}
              helperText={getError("kebele").value}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default PageOne