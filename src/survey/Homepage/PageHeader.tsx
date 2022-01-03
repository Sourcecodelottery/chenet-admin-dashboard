import { Typography, Button, Grid } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useNavigate } from 'react-router';
import routes from 'src/constants/routes'

function PageHeader() {
  const user =
  {
    name: 'John Doe',
    avatar: '/static/images/avatars/1.jpg'
  };
  const navigate = useNavigate();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Surveys
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your recent surveys
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => navigate(routes.SURVEY.CREATE_SURVEY.ROUTE, {replace: true })}
        >
          Create Survey
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
