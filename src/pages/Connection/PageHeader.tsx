import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {

  const user =
  {
    name: 'Catherine Pike',
    avatar: 'https://thispersondoesnotexist.com/image'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Companies
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your companies
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
