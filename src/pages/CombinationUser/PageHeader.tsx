import { Typography, Grid } from '@mui/material';

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
          Combination User
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your brokers
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;