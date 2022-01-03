import {
  Typography,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListSubheader,
  ListItemText,
  Avatar,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';


const ListWrapper = styled(List)(
  () => `
      .MuiListItem-root {
        border-radius: 0;
        margin: 0;
      }
`
);

interface Props {
  companies: any[]
}

const PopularTags: React.FC<Props> = ({ companies }) => {
  const theme = useTheme();
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Working with" />
      <Divider />
      <ListWrapper disablePadding>
        {companies.length === 0? <h2 style={{ paddingLeft: 20 }}>No Known Companies</h2> : companies.map(company => (
          <>
            <Divider />
            <ListItem button>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    width: 38,
                    height: 38,
                    background: `${theme.colors.info.main}`,
                    color: `${theme.palette.info.contrastText}`
                  }}
                  src={company.profile_picture}
                >
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{
                  variant: 'h5',
                  color: `${theme.colors.alpha.black[100]}`
                }}
                primary={company.name}
              />
            </ListItem>
          </>
        ))}
      </ListWrapper>
    </Card>
  );
}

export default PopularTags;
