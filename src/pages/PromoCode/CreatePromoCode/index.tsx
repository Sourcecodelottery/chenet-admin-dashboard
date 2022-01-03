import { Container, Card, Box, Grid, TextField, FormControl, FormControlLabel, Radio, RadioGroup, Button, CircularProgress, MenuItem, Checkbox } from "@mui/material"
import { useEffect, useState } from 'react'
import { fetchAllUsersSimple } from "src/store/States/User/action";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { Role } from "src/constants/roles";

const CreatePromoCode = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetchAllUsersSimple((_error, data) => {
      setUsers(data)
    })
  }, []);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [gender, setGender] = useState(null);
  const [role, setRole] = useState("");
  const [reset, setReset] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [isForAll, setIsForAll] = useState(false)
  const [maleChecked, setMaleChecked] = useState(false)
  const [femaleChecked, setFemaleChecked] = useState(false)
  interface IUserOption {
    readonly value: string;
    readonly label: string;
    readonly gender: string;
    readonly role: string;
  }

  const userOptions: IUserOption[] = users.map(user =>
  ({
    value: user._id,
    label: user.first_name + ' ' + user.last_name,
    gender: user.gender !== null ? user.gender : null,
    role: user.role !== null ? user.role : null,
  }));

  const animatedComponents = makeAnimated();

  useEffect(() => {
    let data = userOptions;
    let isFiltered: boolean = false;
    if (reset) {
      data = [];
      isFiltered = true;
    }

    if (role) {
      data = data.filter(user => user.role === role);
      isFiltered = true;
    }

    if (gender === 'male') {
      data = data.filter(user => user.gender === 'MALE');
      isFiltered = true;
    } else if (gender === "female") {
      data = data.filter(user => user.gender === 'FEMALE');
      isFiltered = true;
    }

    if (isForAll) {
      setFemaleChecked(false)
      setMaleChecked(false)
      setGender("")
      setRole("")
      data = userOptions
      isFiltered = true;
    }

    if (isFiltered) {
      setSelectedUsers(data);
    }
    
  }, [gender, reset, role, isForAll, setFemaleChecked, setMaleChecked, setRole, setGender]);
  return (
    <Container>
      <h3>Create Promo Code</h3>
      <Card sx={{ marginTop: 3 }}>
        <Container sx={{ margin: 4 }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item md={12} xs={12}>
              <Box sx={{ maxWidth: "80%", mt: 4 }}>
                <TextField
                  type="number"
                  label="Coin Amount"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              </Box>
            </Grid>
            <Grid item md={12} xs={12}>
              <FormControl sx={{ width: "60%", mt: 4 }}>
                <Select
                  closeMenuOnSelect={false}
                  value={selectedUsers}
                  components={animatedComponents}
                  options={userOptions}
                  isMulti
                  onChange={(e) => { setSelectedUsers(e) }}
                />
              </FormControl><br />
              <FormControl component="fieldset">
                <RadioGroup row aria-label="gender"
                  value={gender ?? ""}
                  name="row-radio-buttons-group"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" checked={femaleChecked} onChange={() => {
                    setFemaleChecked(!femaleChecked)
                    setMaleChecked(femaleChecked)
                  }} />
                  <FormControlLabel value="male" control={<Radio />} label="Male" checked={maleChecked} onChange={() => {
                    setMaleChecked(!maleChecked)
                    setFemaleChecked(maleChecked)
                  }} />
                </RadioGroup>
                <TextField select variant="outlined" label="Role" value={role} onChange={(event) => setRole(event.target.value)}>
                  {Object.values(Role).map(role => (
                    <MenuItem key={role} value={role}>{String(role).replace("_", " ")}</MenuItem>
                  ))}
                </TextField>
              </FormControl>
              <Box sx={{ display: 'block' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isForAll}
                      onChange={(e) => {
                        setIsForAll(e.target.checked)
                      }}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                    />
                  }
                  label="Select All"
                  onClick={() => {
                    console.log("lol", isForAll)
                    if (isForAll) {
                      setSelectedUsers([])
                    }
                    setIsForAll(!isForAll)
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ display: 'block' }}>
            <Button disabled={isLoading} sx={{ mt: 4, px: 5 }} variant="contained" color="primary" type="button" onClick={() => null}>
              {isLoading ? <CircularProgress style={{ color: "white" }} /> : "Create Promo Code"}
            </Button>
          </Box>
        </Container>
      </Card>
    </Container>
  )
}

export default CreatePromoCode