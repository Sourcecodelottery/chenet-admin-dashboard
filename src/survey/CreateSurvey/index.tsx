import { Container, Grid, Card, CardHeader, Divider, CardContent, Box, TextField, MenuItem, Button, ButtonGroup } from "@mui/material"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import PageTitle from "src/components/PageTitle"
import PageTitleWrapper from "src/components/PageTitleWrapper"
import { ISurveyType, SurveyInputTypes } from "src/store/States/Survey/survey.types"
import AddIcon from '@mui/icons-material/Add';
import { useForm } from "react-hook-form"
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from "react-router"
import routes from "src/constants/routes"
import { connect } from "react-redux"
import { Actions } from "src/store/States/Survey/"
import { demographyData, targetingOptionsData, genderTypes } from "src/store/States/Survey/demography"

const CreateSurvey = ({ saveMainSurveyBuffer }) => {
  const { register: registerForm, handleSubmit: handleSurveySubmit, formState: { errors: formErrors }, control } = useForm<SurveyInputTypes>();
  const [countryCount, setCountryCount] = useState(1)
  const [regionCount, setRegionCount] = useState(1)
  const [zoneCount, setZoneCount] = useState(1)

  const [educationCount, setEducationCount] = useState(1)
  const [employmentStatusCount, setEmploymentStatusCount] = useState(1)
  const [industryCount, setIndustryCount] = useState(1)
  const [parentalStatusCount, setParentalStatusCount] = useState(1)
  const [maritialStatusCount, setMaritialStatusCount] = useState(1)

  const navigate = useNavigate();

  const onSubmit = (data: SurveyInputTypes) => {
    saveMainSurveyBuffer(data)
    navigate(routes.SURVEY.CREATE_SURVE_CONTENTS.ROUTE, { replace: true })
  }

  const getHelperText = (msgObject: any, idx: number) => {
    return msgObject[idx]?
      msgObject[idx].message? msgObject[idx].message : ""
      : ""
  }

  return (
    <>
      <Helmet>
        <title>Create Survey</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Create Survey"
          subHeading="Create survey dependeing on your demography and targeting options."
          noButton={true}
        />
      </PageTitleWrapper>
      <form onSubmit={handleSurveySubmit(onSubmit)}>
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
                <CardHeader title="Survey Details" />
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
                        error={Boolean(formErrors.title)}
                        helperText={formErrors.title? formErrors.title.message : ""}
                        {...registerForm("title", { required: "Title is required" })}
                      />
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Select Survey Type"
                        error={Boolean(formErrors.surveyType)}
                        helperText={formErrors.surveyType? formErrors.surveyType.message : ""}
                        {...registerForm("surveyType", { required: "Survey Type is required" })}
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
                        error={Boolean(formErrors.description)}
                        helperText={formErrors.description? formErrors.description.message : ""}
                        {...registerForm("description", { required: "Description is required" })}
                        style={{
                          width: 800,
                          height: 100
                        }}
                      />
                      <CardHeader title="Person Specifications" />
                      <Divider />
                      <div>
                        <TextField
                          id="outlined-select-gender"
                          select
                          label="Select Gender"
                          error={Boolean(formErrors.gender)}
                          helperText={formErrors.gender? formErrors.gender.message : ""}
                          {...registerForm("gender", { required: "Gender is required" })}
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
                          error={Boolean(
                            formErrors.ageLimit? formErrors.ageLimit.min : false
                          )}
                          helperText={
                            formErrors.ageLimit?
                              formErrors.ageLimit.min? formErrors.ageLimit.min.message : ""
                              : ""
                          }
                          {...registerForm("ageLimit.min", { required: "Min Age is required" })}
                        >
                        </TextField>
                        <TextField
                          id="outlined-select-max-age"
                          label="Select Max Age"
                          error={Boolean(
                            formErrors.ageLimit? formErrors.ageLimit.max : false
                          )}
                          helperText={
                            formErrors.ageLimit?
                              formErrors.ageLimit.max? formErrors.ageLimit.max.message : ""
                              : ""
                          }
                          {...registerForm("ageLimit.max", { required: "Max Age is required" })}
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
                        {Array(countryCount).fill("").map((_, idx) => (
                          <TextField
                            id="outlined-select-country"
                            select
                            label="Select Country"
                            error={
                              formErrors.demographicDetails?
                                formErrors.demographicDetails.country? Boolean(formErrors.demographicDetails.country): false
                                : false
                            }
                            helperText={
                              formErrors.demographicDetails?
                                formErrors.demographicDetails.country? getHelperText(formErrors.demographicDetails.country, idx): ""
                                : ""
                            }
                            {...registerForm(`demographicDetails.country.${idx}`, { required: "Country is required" })}
                          >
                            {demographyData.countries.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        ))}
                        <ButtonGroup style={{ marginTop: 15 }}>
                          <Button
                            aria-label="reduce"
                            onClick={() => {
                              setCountryCount(Math.max(countryCount - 1, 1));
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </Button>
                          <Button
                            aria-label="increase"
                            onClick={() => {
                              setCountryCount(countryCount + 1);
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </Button>
                        </ButtonGroup>
                      </div>
                      <div aria-label="region-input">
                        {Array(regionCount).fill("").map((_, idx) => (
                          <TextField
                            id="outlined-select-region"
                            select
                            label="Select Region"
                            error={
                              formErrors.demographicDetails?
                                formErrors.demographicDetails.region? Boolean(formErrors.demographicDetails.region): false
                                : false
                            }
                            helperText={
                              formErrors.demographicDetails?
                                formErrors.demographicDetails.region? getHelperText(formErrors.demographicDetails.region, idx): ""
                                : ""
                            }
                            {...registerForm(`demographicDetails.region.${idx}`, { required: "Region is required" })}
                          >
                            {demographyData.regions.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        ))}
                        <ButtonGroup style={{ marginTop: 15 }}>
                          <Button
                            aria-label="reduce"
                            onClick={() => {
                              setRegionCount(Math.max(regionCount - 1, 1));
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </Button>
                          <Button
                            aria-label="increase"
                            onClick={() => {
                              setRegionCount(regionCount + 1);
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </Button>
                        </ButtonGroup>
                      </div>
                      <div aria-label="zone-input">
                        {Array(zoneCount).fill("").map((_, idx) => (
                          <TextField
                            id="outlined-select-zone"
                            select
                            label="Select Zone"
                            error={
                              formErrors.demographicDetails?
                                formErrors.demographicDetails.zone? Boolean(formErrors.demographicDetails.zone): false
                                : false
                            }
                            helperText={
                              formErrors.demographicDetails?
                                formErrors.demographicDetails.zone? getHelperText(formErrors.demographicDetails.zone, idx): ""
                                : ""
                            }
                            {...registerForm(`demographicDetails.zone.${idx}`, { required: "Zone is required" })}
                          >
                            {demographyData.zones.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        ))}
                        <ButtonGroup style={{ marginTop: 15 }}>
                          <Button
                            aria-label="reduce"
                            onClick={() => {
                              setZoneCount(Math.max(zoneCount - 1, 1));
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </Button>
                          <Button
                            aria-label="increase"
                            onClick={() => {
                              setZoneCount(zoneCount + 1);
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </Button>
                        </ButtonGroup>
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
                        {Array(educationCount).fill("").map((_, idx) => (
                          <TextField
                            id="outlined-select-education"
                            select
                            label="Select Education"
                            error={
                              formErrors.targetingOptions?
                                formErrors.targetingOptions.education? Boolean(formErrors.targetingOptions.education): false
                                : false
                            }
                            helperText={
                              formErrors.targetingOptions?
                                formErrors.targetingOptions.education? getHelperText(formErrors.targetingOptions.education, idx): ""
                                : ""
                            }
                            {...registerForm(`targetingOptions.education.${idx}`, { required: "Education is required" })}
                          >
                            {targetingOptionsData.education.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        ))}
                        <ButtonGroup style={{ marginTop: 15 }}>
                          <Button
                            aria-label="reduce"
                            onClick={() => {
                              setEducationCount(Math.max(educationCount - 1, 1));
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </Button>
                          <Button
                            aria-label="increase"
                            onClick={() => {
                              setEducationCount(educationCount + 1);
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </Button>
                        </ButtonGroup>
                      </div>
                      <div aria-label="employment-status-input">
                        {Array(employmentStatusCount).fill("").map((_, idx) => (
                          <TextField
                            id="outlined-select-employment-status"
                            select
                            label="Select Employment Status"
                            error={
                              formErrors.targetingOptions?
                                formErrors.targetingOptions.employmentStatus? Boolean(formErrors.targetingOptions.employmentStatus): false
                                : false
                            }
                            helperText={
                              formErrors.targetingOptions?
                                formErrors.targetingOptions.employmentStatus? getHelperText(formErrors.targetingOptions.employmentStatus, idx): ""
                                : ""
                            }
                            {...registerForm(`targetingOptions.employmentStatus.${idx}`, { required: "Employment Status is required" })}
                          >
                            {targetingOptionsData.employementStatus.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        ))}
                        <ButtonGroup style={{ marginTop: 15 }}>
                          <Button
                            aria-label="reduce"
                            onClick={() => {
                              setEmploymentStatusCount(Math.max(employmentStatusCount - 1, 1));
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </Button>
                          <Button
                            aria-label="increase"
                            onClick={() => {
                              setEmploymentStatusCount(employmentStatusCount + 1);
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </Button>
                        </ButtonGroup>
                      </div>
                      <div aria-label="industry-input">
                        {Array(industryCount).fill("").map((_, idx) => (
                          <TextField
                            id="outlined-select-industry"
                            select
                            label="Select Industry"
                            error={
                              formErrors.targetingOptions?
                                formErrors.targetingOptions.industry? Boolean(formErrors.targetingOptions.industry): false
                                : false
                            }
                            helperText={
                              formErrors.targetingOptions?
                                formErrors.targetingOptions.industry? getHelperText(formErrors.targetingOptions.industry, idx): ""
                                : ""
                            }
                            {...registerForm(`targetingOptions.industry.${idx}`, { required: "Industry is required" })}
                          >
                            {targetingOptionsData.industry.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        ))}
                        <ButtonGroup style={{ marginTop: 15 }}>
                          <Button
                            aria-label="reduce"
                            onClick={() => {
                              setIndustryCount(Math.max(industryCount - 1, 1));
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </Button>
                          <Button
                            aria-label="increase"
                            onClick={() => {
                              setIndustryCount(industryCount + 1);
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </Button>
                        </ButtonGroup>
                      </div>
                      <div aria-label="parental-status-input">
                        {Array(parentalStatusCount).fill("").map((_, idx) => (
                          <TextField
                            id="outlined-select-parental-status"
                            select
                            label="Select Parental Status"
                            error={
                              formErrors.targetingOptions?
                                formErrors.targetingOptions.parentalStatus? Boolean(formErrors.targetingOptions.parentalStatus): false
                                : false
                            }
                            helperText={
                              formErrors.targetingOptions?
                                formErrors.targetingOptions.parentalStatus? getHelperText(formErrors.targetingOptions.parentalStatus, idx): ""
                                : ""
                            }
                            {...registerForm(`targetingOptions.parentalStatus.${idx}`, { required: "Parental Status is required" })}
                          >
                            {targetingOptionsData.parentalStatus.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        ))}
                        <ButtonGroup style={{ marginTop: 15 }}>
                          <Button
                            aria-label="reduce"
                            onClick={() => {
                              setParentalStatusCount(Math.max(parentalStatusCount - 1, 1));
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </Button>
                          <Button
                            aria-label="increase"
                            onClick={() => {
                              setParentalStatusCount(parentalStatusCount + 1);
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </Button>
                        </ButtonGroup>
                      </div>
                      <div aria-label="maritial-status-input">
                        {Array(maritialStatusCount).fill("").map((_, idx) => (
                          <TextField
                            id="outlined-select-maritial-status"
                            select
                            label="Select Maritial Status"
                            error={
                              formErrors.targetingOptions?
                                formErrors.targetingOptions.martialStatus? Boolean(formErrors.targetingOptions.martialStatus): false
                                : false
                            }
                            helperText={
                              formErrors.targetingOptions?
                                formErrors.targetingOptions.martialStatus? getHelperText(formErrors.targetingOptions.martialStatus, idx): ""
                                : ""
                            }
                            {...registerForm(`targetingOptions.martialStatus.${idx}`, { required: "Maritial Status is required" })}
                          >
                            {targetingOptionsData.maritialStatus.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        ))}
                        <ButtonGroup style={{ marginTop: 15 }}>
                          <Button
                            aria-label="reduce"
                            onClick={() => {
                              setMaritialStatusCount(Math.max(maritialStatusCount - 1, 1));
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </Button>
                          <Button
                            aria-label="increase"
                            onClick={() => {
                              setMaritialStatusCount(maritialStatusCount + 1);
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </Button>
                        </ButtonGroup>
                      </div>
                    </div>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <Button
                      sx={{ margin: 1 }} variant="contained" color="primary" type="submit"
                      // onClick={() => navigate(routes.SURVEY.CREATE_SURVE_CONTENTS.ROUTE, { replace: true })}
                    >
                      Create Survey Contents
                    </Button>
                    <Button sx={{ margin: 1 }} variant="contained" color="secondary" type="button">
                      Go Back
                    </Button>
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

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = (dispatch: any) => ({
  saveMainSurveyBuffer: (data: any) => dispatch(Actions.saveMainSurveyBuffer(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateSurvey)