import { Container, Grid, Card, CardHeader, Divider, CardContent, Box, TextField, MenuItem, Button, ButtonGroup } from "@mui/material"
import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import PageTitle from "src/components/PageTitle"
import PageTitleWrapper from "src/components/PageTitleWrapper"
import { IGender, ISurvey, ISurveyType, SurveyInputTypes } from "src/store/States/Survey/survey.types"
import { useNavigate } from "react-router"
import routes from "src/constants/routes"
import { connect } from "react-redux"
import { Actions, selectSelectedSurvey, FetchOneSurvey } from "src/store/States/Survey/"
import { demographyData, targetingOptionsData, genderTypes } from "src/store/States/Survey/demography"
import ViewIcon from "@mui/icons-material/RemoveRedEyeRounded"

const CreateSurvey = ({ saveSelectedSurveyContents, selectedSurvey }) => {
  const [surveyDetails, setSurveyDetails] = useState<ISurvey>({
    _id: "",
    title: "",
    description: "",
    gender: IGender.MALE,
    demographicDetails: {
      country: [], region: [], zone: []
    },
    ageLimit: {
      max: 0, min: 0
    },
    ownerID: "",
    targetingOptions: {
      education: [],
      employmentStatus: [],
      industry: [],
      martialStatus: [],
      parentalStatus: []
    },
    admins: [],
    surveyType: ISurveyType.PUBLIC,
    consumerUsers: [],
    consumerLimit: 0,
    unitCost: 0
  })

  const navigate = useNavigate();

  const getHelperText = (msgObject: any, idx: number) => {
    return msgObject[idx] ?
      msgObject[idx].message ? msgObject[idx].message : ""
      : ""
  }

  useEffect(() => {
    FetchOneSurvey(selectedSurvey, (err: any, data: ISurvey) => {
      if (err) throw err
      setSurveyDetails(data)
    })
  }, [])

  return (
    <>
      <Helmet>
        <title>View Survey</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="View Survey"
          subHeading="View survey dependeing on your demography and targeting options."
          noButton={true}
        />
      </PageTitleWrapper>
      <form>
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>
              <Card>
                <Grid
                  direction="row"
                  justifyContent="space-between"
                  alignItems="stretch"
                  display="flex"
                >
                  <CardHeader title="Survey Details" />
                  <Button
                    sx={{ margin: 1 }} variant="contained" color="primary" type="button"
                    onClick={() => {
                      // saveSelectedSurveyContents(survey)
                      navigate(routes.SURVEY.SINGLE_SURVEY_CONTENTS.ROUTE, { replace: true })}}
                  >
                    <ViewIcon fontSize="small" />
                    View Survey Question
                  </Button>
                </Grid>
                <Divider />
                <CardContent>
                  <Box
                    component="data"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                  >
                    <div>
                      <TextField
                        id="outlined-helperText"
                        label="Title"
                        disabled
                        value={surveyDetails.title}
                      />
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Select Survey Type"
                        disabled
                        value={surveyDetails.surveyType}
                      >
                        {Object.values(ISurveyType).map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                      <br />
                      <TextField
                        id="outlined-helperText"
                        label="Description"
                        style={{
                          width: 800,
                          height: 100
                        }}
                        disabled
                        value={surveyDetails.description}
                      />
                      <CardHeader title="Person Specifications" />
                      <Divider />
                      <div>
                        <TextField
                          id="outlined-select-gender"
                          select
                          label="Select Gender"
                          disabled
                          value={surveyDetails.gender}
                        >
                          {genderTypes.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          id="outlined-select-min-age"
                          label="Select Min Age"
                          type="number"
                          disabled
                          value={surveyDetails.ageLimit.min}
                        >
                        </TextField>
                        <TextField
                          type="number"
                          id="outlined-select-max-age"
                          label="Select Max Age"
                          value={surveyDetails.ageLimit.min}
                          disabled
                        >
                        </TextField>
                      </div>
                    </div>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Your Demography" />
                <Divider />
                <CardContent>
                  <Box
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                  >
                    <div>
                      <div aria-label="country-input">
                        {surveyDetails.demographicDetails.country.map((value, idx) => (
                          <TextField
                            id="outlined-select-country"
                            select
                            label="Select Country"
                            value={value}
                            disabled
                          >
                            {demographyData.countries.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        ))}
                      </div>
                      <div aria-label="region-input">
                        {surveyDetails.demographicDetails.region.map((value, idx) => (
                          <TextField
                            id="outlined-select-region"
                            select
                            label="Select Region"
                            value={value}
                            disabled
                          >
                            {demographyData.regions.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        ))}
                      </div>
                      <div aria-label="zone-input">
                        {surveyDetails.demographicDetails.zone.map((value, idx) => (
                          <TextField
                            id="outlined-select-zone"
                            select
                            label="Select Zone"
                            value={value}
                            disabled
                          >
                            {demographyData.zones.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        ))}
                      </div>
                    </div>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Your Targeting Options" />
                <Divider />
                <CardContent>
                  <Box
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                  >
                    <div>
                      <div aria-label="education-input">
                        {surveyDetails.targetingOptions.education.map((value, idx) => (
                          <TextField
                            id="outlined-select-education"
                            select
                            label="Select Education"
                            value={value}
                            disabled
                          >
                            {targetingOptionsData.education.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        ))}
                      </div>
                      <div aria-label="employment-status-input">
                        {surveyDetails.targetingOptions.employmentStatus.map((value, idx) => (
                          <TextField
                            id="outlined-select-employment-status"
                            select
                            label="Select Employment Status"
                            value={value}
                            disabled
                          >
                            {targetingOptionsData.employementStatus.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        ))}
                      </div>
                      <div aria-label="industry-input">
                        {surveyDetails.targetingOptions.industry.map((value, idx) => (
                          <TextField
                            id="outlined-select-industry"
                            select
                            label="Select Industry"
                            value={value}
                            disabled
                          >
                            {targetingOptionsData.industry.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        ))}
                      </div>
                      <div aria-label="parental-status-input">
                        {surveyDetails.targetingOptions.parentalStatus.map((value, idx) => (
                          <TextField
                            id="outlined-select-parental-status"
                            select
                            label="Select Parental Status"
                            value={value}
                            disabled
                          >
                            {targetingOptionsData.parentalStatus.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        ))}
                      </div>
                      <div aria-label="maritial-status-input">
                        {surveyDetails.targetingOptions.martialStatus.map((value, idx) => (
                          <TextField
                            id="outlined-select-maritial-status"
                            select
                            label="Select Maritial Status"
                            value={value}
                            disabled
                          >
                            {targetingOptionsData.maritialStatus.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        ))}
                      </div>
                    </div>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </form>
    </>
  )
}

const mapStateToProps = (state: any) => ({
  selectedSurvey: selectSelectedSurvey(state)
})

const mapDispatchToProps = (dispatch: any) => ({
  saveSelectedSurveyContents: (data: any) => dispatch(Actions.saveSelectedSurveyContents(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateSurvey)