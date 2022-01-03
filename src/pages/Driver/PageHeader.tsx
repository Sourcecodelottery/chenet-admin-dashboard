import { Typography, Button, Grid } from '@mui/material';
import { useNavigate } from "react-router"
import routes from "src/constants/routes"

function PageHeader() {
  const user =
  {
    name: 'Catherine Pike',
    avatar: 'https://thispersondoesnotexist.com/image'
  };

  const navigate = useNavigate();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Drivers
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your drivers
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="outlined" sx={{ margin: 1 }} onClick={() => navigate(routes.ADMIN.CREATE_DRIVER.ROUTE, { replace: true })}>
          Add Driver
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
