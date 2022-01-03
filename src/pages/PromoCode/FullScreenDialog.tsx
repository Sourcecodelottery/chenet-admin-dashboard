import { Slide, useTheme, styled, Card, Tooltip, IconButton, Grid, Dialog, AppBar, Toolbar, Typography, Container, Box, Avatar, TextField } from "@mui/material";
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
                    {user.user}
                  </Typography>
                </Box>
              </Box>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item md={4} xs={12}>
                  <Box sx={{ maxWidth: "80%", mt: 4 }}>
                    <TextField
                      value={user.user}
                      type="text"
                      label="User"
                      disabled
                      variant="standard"
                      fullWidth
                      size="small"
                    />
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box sx={{ maxWidth: "80%", mt: 4 }}>
                    <TextField
                      value={user.code}
                      type="text"
                      label="Email"
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
                      value={user.coin_amount}
                      type="number"
                      label="Coin Amount"
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
