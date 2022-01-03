import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import { Grid, Container } from '@mui/material';
import ProfileCover from './ProfileCover';
import RecentActivity from './RecentActivity';
import Feed from './Feed';
import PopularTags from './PopularTags';
import MyCards from './MyCards';
import Addresses from './Addresses';
import { useParams } from 'react-router';
import { FetchOneUserBrokerByID, FetchPreferenceCount } from 'src/store/States/Broker/';
import { FetchMyReviews } from 'src/store/States/Review/'
import { FetchBrokerConnections, FetchConnectionCompanies } from 'src/store/States/Connection'
import { FetchBrokerFollowers } from 'src/store/States/Driver/'
import React from 'react';

function ManagementUserProfile() {
  const params = useParams()
  const [brokerData, setBrokerData] = React.useState<any>({})
  const [followers, setFollowers] = React.useState<any[]>([])
  const [companies, setCompanies] = React.useState<any[]>([])
  React.useEffect(() => {
    FetchOneUserBrokerByID(params.id, (err, data) => {
      if (err) throw err
      setBrokerData(data)
    })
  }, [params.id])

  React.useEffect(() => {
    if (brokerData.service_id) {
      FetchMyReviews(brokerData.service_id, (err, data) => {
        if (err) throw err
        FetchPreferenceCount(brokerData.service_id, (_err, _data) => {
          if (_err) throw _err
          FetchBrokerConnections(brokerData.service_id, (__err, __data) => {
            if (__err) throw __err
            setBrokerData({
              ...brokerData,
              preference_count: _data.amount,
              review_amount: data.length,
              connections_count: __data.length
            })
          })
        })
      })
    }
  }, [brokerData.service_id, setBrokerData])

  React.useEffect(() => {
    if (brokerData.service_id) {
      FetchBrokerFollowers(brokerData.service_id, (err, followers) => {
        if (err) throw err
        FetchConnectionCompanies(brokerData.service_id, (_err, companies) => {
          if (err) throw err
          setFollowers(followers)
          setCompanies(companies)
        })
      })
    }
  }, [brokerData.service_id, setCompanies, setFollowers])

  const user = {
    savedCards: 7,
    name: 'Catherine Pike',
    coverImg: '/static/images/placeholders/covers/5.jpg',
    avatar: '/static/images/avatars/4.jpg',
    description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage',
    jobtitle: 'Web Developer',
    location: 'Barcelona, Spain',
    followers: '465'
  };

  return (
    <>
      <Helmet>
        <title>User Details - Management</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <ProfileCover
              user={{
                ...user,
                ...brokerData,
                name: brokerData.first_name + " " + brokerData.last_name
              }}
              connections_count={brokerData.connections_count}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <RecentActivity
              review_amount={Number(brokerData.review_amount)}
              preference_count={Number(brokerData.preference_count)}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Feed followers={followers} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularTags companies={companies} />
          </Grid>
          {/* <Grid item xs={12} md={7}>
            <MyCards />
          </Grid> */}
          <Grid item xs={12} md={12}>
            <Addresses />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementUserProfile;
