import { Slide, useTheme, styled, Card, Tooltip, IconButton, Dialog, AppBar, Toolbar, Typography, Container, Box, Avatar, TextField, Grid } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from "react";
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export function FullScreenDialog(props: any) {
  const user = props.user;
  const theme = useTheme();

  const [openDetail, setOpenDetail] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDetail(true);
  };

  const handleClose = () => {
    setOpenDetail(false);
  };

  const AvatarWrapper = styled(Card)(
    ({ theme }) => `

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

  return (
    <div>
      <Tooltip title="Detail User" arrow>
        <IconButton
          onClick={() => {
            handleClickOpen()
          }}
          sx={{
            '&:hover': { background: theme.colors.primary.lighter },
            color: theme.palette.primary.main
          }}
          color="inherit"
          size="large"
        >
          <VisibilityIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
      <Dialog
        fullScreen
        open={openDetail}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Close
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Card sx={{ marginTop: 3 }}>
            <Container sx={{ margin: 4 }}>
              <Box display="flex" mb={3} mt={3}>
                <Box>
                  <Typography variant="h3" component="h3" gutterBottom>
                    {user.first_name + " " + user.last_name}
                  </Typography>
                </Box>
              </Box>
              <AvatarWrapper sx={{ mt: 1, mb: 5 }}>
                <Avatar variant="rounded" alt={user.first_name} src={user.profile_picture} />
              </AvatarWrapper>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item md={4} xs={12}>
                  <Box sx={{ maxWidth: "80%" }}>
                    <TextField
                      value={user.first_name}
                      type="text"
                      label="first name"
                      disabled
                      variant="standard"
                      fullWidth
                      size="small"
                    />
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box sx={{ maxWidth: "80%" }}>
                    <TextField
                      value={user.middle_name}
                      type="text"
                      label="Middle name"
                      variant="standard"
                      disabled
                      fullWidth
                      size="small"
                    />
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box sx={{ maxWidth: "80%" }}>
                    <TextField
                      value={user.last_name}
                      type="text"
                      label="Last Name"
                      variant="standard"
                      disabled
                      fullWidth
                      size="small"
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
                <Grid item md={3} xs={12}>
                  <Box sx={{ maxWidth: "80%", mt: 4 }}>
                    <TextField
                      value={user.email ?? ""}
                      type="email"
                      label="email"
                      variant="standard"
                      disabled
                      fullWidth
                      size="small"
                    />
                  </Box>
                </Grid>
                <Grid item md={3} xs={12}>
                  <Box sx={{ maxWidth: "80%", mt: 4 }}>
                    <TextField
                      value={user.address.kebele ? user.address.kebele : "not inserted"}
                      type="text"
                      label="Kebele"
                      variant="standard"
                      disabled
                      fullWidth
                      size="small"
                    />
                  </Box>
                </Grid>
                <Grid item md={3} xs={12}>
                  <Box sx={{ maxWidth: "80%", mt: 4 }}>
                    <TextField
                      value={user.address.city ? user.address.city : "not inserted"}
                      type="text"
                      label="City"
                      variant="standard"
                      disabled
                      fullWidth
                      size="small"
                    />
                  </Box>
                </Grid>
                <Grid item md={3} xs={12}>
                  <Box sx={{ maxWidth: "80%", mt: 4 }}>
                    <TextField
                      value={user.address.sub_city ? user.address.sub_city : "not inserted"}
                      type="text"
                      label="Sub City"
                      variant="standard"
                      disabled
                      fullWidth
                      size="small"
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
                      value={user.phone_number}
                      type="text"
                      label="phone number"
                      variant="standard"
                      disabled
                      fullWidth
                      size="small"
                    />
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box sx={{ maxWidth: "80%", mt: 4 }}>
                    <TextField
                      value={user.work_status ? user.work_status : "not inserted"}
                      type="text"
                      label="Work Status"
                      variant="standard"
                      disabled
                      fullWidth
                      size="small"
                    />
                  </Box>
                </Grid>
                <Grid item md={4} xs={12} sx={{ maxWidth: "80%", mt: 4, display: "flex", justifyContent: "stretch" }}>
                  <input type="checkbox" checked={user.truck_available} disabled />
                  <label style={{ marginLeft: 20 }}>Is Truck Available?</label>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ marginTop: 50 }}
              >
                {user.work_load.map((item: any) => (
                  <Grid item md={1} xs={6} style={{ display: "flex", justifyContent: "center" }}>
                    <label style={{ marginRight: 20 }}>{item.date}</label>
                  </Grid>
                ))}
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                {user.work_load.map((item: any) => (
                  <Grid item md={1} xs={6} style={{ display: "flex", justifyContent: "center" }}>
                    <label style={{ marginRight: 20 }}>{item.hours}</label>
                  </Grid>
                ))}
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item md={3} xs={12}>
                  <Box sx={{ maxWidth: "80%", mt: 4 }}>
                    <TextField
                      value={user.gender ? user.gender : "not inserted"}
                      type="text"
                      label="Gender"
                      variant="standard"
                      disabled
                      fullWidth
                      size="small"
                    />
                  </Box>
                </Grid>
                <Grid item md={3} xs={12}>
                  <Box sx={{ maxWidth: "80%", mt: 4 }}>
                    <TextField
                      value={user.birth_date ? user.birth_date : "not inserted"}
                      type="date"
                      label="Birth Date"
                      variant="standard"
                      disabled
                      fullWidth
                      size="small"
                    />
                  </Box>
                </Grid>
                <Grid item md={3} xs={12}>
                  <Box sx={{ maxWidth: "80%", mt: 4 }}>
                    <TextField
                      value={user.license_number ? user.license_number : "not inserted"}
                      type="text"
                      label="License Number"
                      variant="standard"
                      disabled
                      fullWidth
                      size="small"
                    />
                  </Box>
                </Grid>
                <Grid item md={3} xs={12}>
                  <Box sx={{ maxWidth: "80%", mt: 4 }}>
                    <TextField
                      value={user.fleet_brand ? user.fleet_brand : "not inserted"}
                      type="text"
                      label="Fleet Brand"
                      variant="standard"
                      disabled
                      fullWidth
                      size="small"
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
                <Grid item md={3} xs={12}>
                  <Box sx={{ maxWidth: "80%", mt: 4 }}>
                    <TextField
                      value={user.fleet_model ? user.fleet_model : "not inserted"}
                      type="text"
                      label="Fleet Model"
                      variant="standard"
                      disabled
                      fullWidth
                      size="small"
                    />
                  </Box>
                </Grid>
                <Grid item md={3} xs={12}>
                  <Box sx={{ maxWidth: "80%", mt: 4 }}>
                    <TextField
                      value={user.fleet_body_color ? user.fleet_body_color : "not inserted"}
                      type="date"
                      label="Fleet Body Color"
                      variant="standard"
                      disabled
                      fullWidth
                      size="small"
                    />
                  </Box>
                </Grid>
                <Grid item md={3} xs={12}>
                  <Box sx={{ maxWidth: "80%", mt: 4 }}>
                    <TextField
                      value={user.fleet_type ? user.fleet_type : "not inserted"}
                      type="text"
                      label="Fleet Type"
                      variant="standard"
                      disabled
                      fullWidth
                      size="small"
                    />
                  </Box>
                </Grid>
                <Grid item md={3} xs={12}>
                  <Box sx={{ maxWidth: "80%", mt: 4 }}>
                    <TextField
                      value={user.fleet_plate_number ? user.fleet_plate_number : "not inserted"}
                      type="text"
                      label="Fleet Plate Number"
                      variant="standard"
                      disabled
                      fullWidth
                      size="small"
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
                      value={user.bank ? user.bank : "not inserted"}
                      type="text"
                      label="Bank"
                      variant="standard"
                      disabled
                      fullWidth
                      size="small"
                    />
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box sx={{ maxWidth: "80%", mt: 4 }}>
                    <TextField
                      value={user.bank_account ? user.bank_account : "not inserted"}
                      type="date"
                      label="Bank Account"
                      variant="standard"
                      disabled
                      fullWidth
                      size="small"
                    />
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box sx={{ maxWidth: "80%", mt: 4 }}>
                    <TextField
                      value={user.wallet_amount ? user.wallet_amount : "not inserted"}
                      type="text"
                      label="Wallet Amount"
                      variant="standard"
                      disabled
                      fullWidth
                      size="small"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Card>
        </Container >
      </Dialog>
    </div>
  );
}
