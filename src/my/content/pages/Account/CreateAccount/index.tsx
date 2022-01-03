import { Button, CircularProgress, Container, Box, Grid, MenuItem, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IAccountInput, Role } from "src/store/States/Account/account.types";
import { createAccount } from "src/store/States/Account/actions";
import { Fetch as _FetchAccounts, FetchAccounts } from 'src/store/States/Account';
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import { useNavigate } from "react-router";

export function CreateAccount(props) {
  const navigate = useNavigate();

  // const for response types
  enum type {
    "ValidationErrors" = "ValidationErrors",
    "ValidationError" = "ValidationError",
    "IAccountSimple" = "IAccountSimple",
  };

  const [categories, setCategories] = useState([])
  const [isFailed, setIsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // fields
  const [name, setName] = useState(null);
  const [role, setRole] = useState(null);
  const [password, setPassword] = useState(null);
  const [body, setBody] = useState(null);
  const [title, setTitle] = useState(null);
  // fields error
  const [firstNameError, setNameError] = useState(null);
  const [lastNameError, setCategoryError] = useState(null);
  const [emailError, setAccountAmountError] = useState(null);
  const [bodyError, setBodyError] = useState(null);
  const [PhoneError, setTitleError] = useState(null);

  const createAccountHandler = (input: IAccountInput) => {
    setIsLoading(true)

    createAccount(input, (err: any, data: any) => {
      switch (data.__typename) {
        case type.ValidationError:
          // setErrorMessage(data.errors[0].error_message);
          setIsLoading(false);
          break;
        case type.ValidationErrors:
          // setErrorMessage(data.validation_errors[0].errors[0].error_message);
          setIsLoading(false);
          break;
        case type.IAccountSimple:
          setIsLoading(false)
          navigate('/accounts', { replace: true })
          break;
      }
      console.log(data);
    })
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };

  const {
    register: registerCreateAccount,
    handleSubmit: handleCreateAccountSubmit,
    formState: { errors: createAccountErrors },
  } = useForm<IAccountInput>();


  const createAccountForm = () => <form onSubmit={handleCreateAccountSubmit(createAccountHandler)}>
    <h1>Create Account</h1>
    <TextField
      sx={{ width: "60%", mt: 2 }}
      error={(createAccountErrors.first_name || firstNameError) ? true : false}
      {...registerCreateAccount("first_name", { required: true })}
      type="text"
      label="first name"
      variant="standard"
      onChange={(e) => {
        setName(e.target.value)
      }}
      helperText={createAccountErrors.first_name ? <span>This field is required</span> : (firstNameError ? firstNameError : null)}
    />
    <TextField
      sx={{ width: "60%", mt: 2 }}
      error={(createAccountErrors.last_name || lastNameError) ? true : false}
      {...registerCreateAccount("last_name", { required: true })}
      label="last name"
      onChange={handleChange}
      helperText={createAccountErrors.last_name ? <span>This field is required</span> : (lastNameError ? lastNameError : null)}
      variant="standard"
    >
    </TextField>
    <TextField
      sx={{ width: "60%", mt: 4 }}
      error={(emailError || createAccountErrors.email) ? true : false}
      {...registerCreateAccount("email", { required: true })}
      label="email"
      type="email"
      variant="standard"
      helperText={createAccountErrors.email ? <span>This field is required</span> : (emailError ? emailError : null)}
    />
    <TextField
      sx={{ width: "60%", mt: 2 }}
      error={(PhoneError || createAccountErrors.phone_number) ? true : false}
      {...registerCreateAccount("phone_number", { required: true })}
      type="text"
      label="phone number"
      variant="standard"
      onChange={(e) => {
        setName(e.target.value)
      }}
      helperText={createAccountErrors.phone_number ? <span>This field is required</span> : (PhoneError ? PhoneError : null)}
    />
    <TextField
      select
      value={role ?? ""}
      sx={{ width: "60%", mt: 4 }}
      error={(bodyError || createAccountErrors.role) ? true : false}
      {...registerCreateAccount("role", { required: true })}
      label="role"
      onChange={(e) => setRole(e.target.value)}
      rows={4}
      helperText={createAccountErrors.role ? <span>This field is required</span> : (bodyError ? bodyError : null)}
    >
      {Role.map((role) => (
        <MenuItem key={role.role} value={role.role}>
          {role.role}
        </MenuItem>
      ))}
    </TextField>
    <TextField
      sx={{ width: "60%", mt: 2 }}
      error={(PhoneError || createAccountErrors.password) ? true : false}
      {...registerCreateAccount("password", { required: true })}
      type="password"
      label="password"
      variant="standard"
      onChange={(e) => {
        setPassword(e.target.value)
      }}
      helperText={createAccountErrors.password ? <span>This field is required</span> : (PhoneError ? PhoneError : null)}
    />
    <Box sx={{ display: 'block' }}>
      <Button sx={{ mt: 2, px: 5 }} variant="contained" color="primary" type="submit">
        {isLoading ? <CircularProgress style={{ color: "white" }} /> : "create"}
      </Button>
    </Box>
  </form>


  return (
    <>
      <Helmet>
        <title>Ethio Lottery</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid
          sx={{ mx: "auto" }}
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            {createAccountForm()}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = (dispatch: any) => ({
  FetchAccounts: () => dispatch(_FetchAccounts(FetchAccounts())),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)