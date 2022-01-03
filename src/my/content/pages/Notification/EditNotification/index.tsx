import { Button, CircularProgress, Container, Box, Grid, MenuItem, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IAccountEdit, Status, Role } from "src/store/States/Account/account.types";
import { editAccount, fectchAccountByID } from "src/store/States/Account/actions";
import { Fetch as _FetchAccounts, FetchAccounts } from 'src/store/States/Account';
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import { useNavigate, useParams } from "react-router";

export function EditNotification(props) {
  const navigate = useNavigate();
  const { id } = useParams();

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
  const [firstName, setFirstName] = useState(null);
  const [role, setRole] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [isActive, setIsActive] = useState(null);
  // fields error
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const [roleError, setRoleError] = useState(null);
  const [isActiveError, setIsActiveError] = useState(null);

  useEffect(() => {
    fectchAccountByID({ _id: id }, (error, data) => {
      console.log(data)
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email);
      setPhoneNumber(data.phone_number);
      setRole(data.role);
      setIsActive(data.is_active);
    })
  }, []);

  const createAccountHandler = (input: IAccountEdit) => {
    setIsLoading(true)
    input._id = id;
    input.is_active = (isActive === "false") ? false : true;
    // input.image = ["thisIsImage.jpeg"]
    editAccount(input, (err: any, data: any) => {
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
  };

  const {
    register: registerEditAccount,
    handleSubmit: handleEditAccountSubmit,
    formState: { errors: editAccountErrors },
  } = useForm<IAccountEdit>();

  const checkDescriptionError = (data: any, tagName: string) => {
    if (data !== undefined) {
      if (data[tagName]) {
        return <span>This field is required</span>
      }
    }
    return false;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };


  const editAccountForm = () => <form onSubmit={handleEditAccountSubmit(createAccountHandler)}>
    <h1>Edit Account</h1>
    <TextField
      sx={{ width: "60%", mt: 2 }}
      error={(editAccountErrors.first_name || firstNameError) ? true : false}
      {...registerEditAccount("first_name", { required: true })}
      type="text"
      label="first name"
      variant="standard"
      value={firstName ?? ""}
      onChange={(e) => {
        setFirstName(e.target.value)
      }}
      helperText={editAccountErrors.first_name ? <span>This field is required</span> : (firstNameError ? firstNameError : null)}
    />
    <TextField
      value={lastName ?? ""}
      sx={{ width: "60%", mt: 2 }}
      error={(editAccountErrors.last_name || lastNameError) ? true : false}
      {...registerEditAccount("last_name", { required: true })}
      label="last name"
      onChange={(e) => {
        setLastName(e.target.value)
      }} helperText={editAccountErrors.last_name ? <span>This field is required</span> : (lastNameError ? lastNameError : null)}
      variant="standard"
    >
    </TextField>
    <TextField
      value={email ?? ""}
      sx={{ width: "60%", mt: 4 }}
      error={(emailError || editAccountErrors.email) ? true : false}
      {...registerEditAccount("email", { required: true })}
      label="email"
      type="email"
      variant="standard"
      onChange={(e) => {
        setEmail(e.target.value)
      }} helperText={editAccountErrors.email ? <span>This field is required</span> : (emailError ? emailError : null)}
    />
    <TextField
      value={phoneNumber ?? ""}
      sx={{ width: "60%", mt: 2 }}
      error={(phoneNumberError || editAccountErrors.phone_number) ? true : false}
      {...registerEditAccount("phone_number", { required: true })}
      type="text"
      label="phone number"
      variant="standard"
      onChange={(e) => {
        setPhoneNumber(e.target.value)
      }}
      helperText={editAccountErrors.phone_number ? <span>This field is required</span> : (phoneNumberError ? phoneNumberError : null)}
    />
    <TextField
      select
      value={role ?? ""}
      sx={{ width: "60%", mt: 4 }}
      error={(roleError || editAccountErrors.role) ? true : false}
      {...registerEditAccount("role", { required: true })}
      label="role"
      onChange={(e) => setRole(e.target.value)}
      rows={4}
      helperText={editAccountErrors.role ? <span>This field is required</span> : (roleError ? roleError : null)}
    >
      {Role.map((role) => (
        <MenuItem key={role.role} value={role.role}>
          {role.role}
        </MenuItem>
      ))}
    </TextField>
    <TextField
      select
      value={`${isActive}`}
      sx={{ width: "60%", mt: 4 }}
      error={(isActiveError || editAccountErrors.is_active) ? true : false}
      {...registerEditAccount("is_active", { required: true })}
      label="status"
      onChange={(e) => setIsActive(e.target.value)}
      rows={4}
      helperText={editAccountErrors.is_active ? <span>This field is required</span> : (isActiveError ? isActiveError : null)}
    >
      {Status.map((status) => (
        <MenuItem key={status.name} value={`${status.value}`}>
          {status.name}
        </MenuItem>
      ))}
    </TextField>
    <Box sx={{ display: 'block' }}>
      <Button sx={{ mt: 2, px: 5 }} variant="contained" color="primary" type="submit">
        {isLoading ? <CircularProgress style={{ color: "white" }} /> : "Update"}
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
            {editAccountForm()}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = (dispatch: any) => ({
  FetchAccountsDoc: () => dispatch(_FetchAccounts(FetchAccounts())),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditNotification)