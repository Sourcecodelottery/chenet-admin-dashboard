import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  Grid,
  Button
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

interface Props {
  followers: any[]
}

const Feed: React.FC<Props> = ({ followers }) => {
  const feed = [
    {
      name: 'Munroe Dacks',
      jobtitle: 'Senior Cost Accountant',
      company: 'Trudoo',
      avatar: '/static/images/avatars/1.jpg'
    },
    {
      name: 'Gunilla Canario',
      jobtitle: 'Associate Professor',
      company: 'Buzzdog',
      avatar: '/static/images/avatars/2.jpg'
    },
    {
      name: 'Rowena Geistmann',
      jobtitle: 'Pharmacist',
      company: 'Yozio',
      avatar: '/static/images/avatars/3.jpg'
    },
    {
      name: 'Ede Stoving',
      jobtitle: 'VP Product Management',
      company: 'Cogibox',
      avatar: '/static/images/avatars/4.jpg'
    },
    {
      name: 'Crissy Spere',
      jobtitle: 'Social Worker',
      company: 'Babbleblab',
      avatar: '/static/images/avatars/5.jpg'
    },
    {
      name: 'Michel Greatbanks',
      jobtitle: 'Research Assistant III',
      company: 'Aimbu',
      avatar: '/static/images/avatars/6.jpg'
    }
  ];

  return (
    <Card>
      <CardHeader title="Followers Feed" />
      <Divider />
      <Box p={2}>
        <Grid container spacing={0}>
        {followers.length === 0? <h2>No Known Followers</h2> : followers.map(singleFeed => ({ ...feed[0], ...singleFeed })).map((singleFeed) => (
            <Grid key={singleFeed._id} item xs={12} sm={6} lg={4}>
              <Box p={3} display="flex" alignItems="flex-start">
                <Avatar src={singleFeed.profile_picture} />
                <Box pl={2}>
                  <Typography gutterBottom variant="subtitle2">
                    {singleFeed.fleet_model}
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    {singleFeed.first_name + " " + singleFeed.last_name}
                  </Typography>
                  <Typography color="text.primary" sx={{ pb: 2 }}>
                    {singleFeed.license_number}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddTwoToneIcon />}
                  >
                    Follow
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
}

export default Feed;
