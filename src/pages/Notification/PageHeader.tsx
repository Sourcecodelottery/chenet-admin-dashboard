import { Typography, Button, Grid } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useNavigate } from 'react-router';
import routes from 'src/constants/routes'

function PageHeader() {
  const navigate = useNavigate();
  
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Notification
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => {
            navigate(routes.ADMIN.CREATE_NOTIFICATION.ROUTE, { replace: false });
          }}
        >
          Create Notification
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;