import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import RecentNotifications from './RecentNotifications';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { selectAuth } from 'src/store/States/Auth/reducer';

function Notifications(props: any) {
  const navigate = useNavigate();

  //// if user is not logged in redirect to login.
  useEffect(() => {
    if (!props.isAuthenticated)
      navigate("/login", { replace: true });
  }, []);

  return (
    <>
      <Helmet>
        <title>Ethio Lottery</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentNotifications />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );

}

const mapStateToProps = (state: any) => selectAuth(state);

export default connect(mapStateToProps)(Notifications);
