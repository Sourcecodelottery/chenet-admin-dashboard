import { Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router'

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import routes from 'src/constants/routes';

function PageHeader() {
  const navigate = useNavigate();
  const user =
  {
    name: 'Catherine Pike',
    avatar: 'https://thispersondoesnotexist.com/image'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Promo Codes
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your promo codes
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="outlined" sx={{ margin: 1 }} onClick={() => navigate(routes.ADMIN.CREATE_PROMO_CODE.ROUTE, { replace: true })}>
          Add Promo Code
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
