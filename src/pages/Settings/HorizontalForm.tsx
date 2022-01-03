import {
  Button,
  Card,
  Grid,
  Box,
  CardContent,
  Typography,
  Avatar,
  Tooltip,
  CardActionArea,
  IconButton
} from '@mui/material';

import { styled } from '@mui/material/styles';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import CloseIcon from '@mui/icons-material/CloseRounded';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
        background: transparent;
        margin-left: -${theme.spacing(0.5)};
        margin-bottom: ${theme.spacing(1)};
        margin-top: ${theme.spacing(2)};
`
);

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[100]};
        }
`
);

interface Props {
  data: any[]
  add_title: string
  title: string
  addFunction: () => void
  closeFunction: (data: any) => void
}

const HorizontalForm: React.FC<Props> = ({ data, add_title, title, addFunction, closeFunction }) => {

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pb: 3 }}
      >
        <Typography variant="h3">{title}</Typography>
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => addFunction()}
        >
          {add_title}
        </Button>
      </Box>
      <Grid container spacing={3} style={{ overflowX: "scroll", width: "100%" }}>
        {data.map(item => (
          <Grid xs={12} sm={6} md={3} item>
            <Card sx={{ px: 1 }}>
              <CardContent>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <AvatarWrapper>
                    <img
                      alt="BTC"
                      src="/static/images/placeholders/logo/bitcoin.png"
                    />
                  </AvatarWrapper>
                  <Tooltip title={`Remove ${add_title}`.replace("Add New", "")}>
                    <IconButton onClick={() => closeFunction(item)}>
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <Typography variant="h5" noWrap>
                  {item.name}
                </Typography>
                <Typography variant="subtitle1" noWrap>
                  2020
                </Typography>
                <Box sx={{ pt: 3 }}>
                  <Typography variant="h3" gutterBottom noWrap>
                    {item.name}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid xs={12} sm={6} md={3} item>
          <Tooltip arrow title={add_title}>
            <CardAddAction>
              <CardActionArea sx={{ px: 1 }} onClick={() => addFunction()}>
                <CardContent>
                  <AvatarAddWrapper>
                    <AddTwoToneIcon fontSize="large" />
                  </AvatarAddWrapper>
                </CardContent>
              </CardActionArea>
            </CardAddAction>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
}

export default HorizontalForm;
