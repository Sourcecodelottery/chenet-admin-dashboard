import { Alert, TextField, Card, CardHeader, Typography, CardContent, Button } from "@mui/material";
import styled from "@mui/styled-engine";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form"
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { LoginUser } from "src/store/States/Auth/actions";
import { Authenticate, selectAuth } from "src/store/States/Auth/reducer";
import { ILoginInput } from "src/store/States/Auth/user.types";
import routes from "src/constants/routes"

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

type LoginInputs = {
  email: string;
  password: string;
}

// const for response types
enum type {
  "ValidationErrors" = "ValidationErrors",
  "ValidationError" = "ValidationError",
  "IAccountSimple" = "IAccountSimple",
};

function UserAuth(props: any) {

  const { register: registerLogin, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState(null);

  //// check if user is already logged in
  // useEffect(() => {
  //   if (props.isAuthenticated)
  //     navigate("/categories", { replace: true });
  // }, [])

  const onSubmitLoginForm = (input: ILoginInput) => {
    setIsLoading(true)
    LoginUser(input, (err: any, data: any, headers: any) => {
      console.log("hh", data)
      switch (data.__typename) {
        case type.ValidationError:
          setValidationError(data.errors[0].error_message);
          setIsLoading(false);
          break;
        case type.ValidationErrors:
          console.log(data)
          setIsLoading(false);
          break;
        case type.IAccountSimple:
          console.log("successfully logged in")
          setIsLoading(false)
          props.AuthenticateUser(data)
          navigate(routes.ADMIN.BROKER.ROUTE, { replace: true });
      }
    })
  }

  const LoginForm = () => <form onSubmit={handleLoginSubmit(onSubmitLoginForm)}>
    {validationError ? <Alert severity="error">{validationError}</Alert> : null}
    <div className="content">
      <TextField
        sx={{ mt: 2 }}
        error={loginErrors.email ? true : false}
        {...registerLogin("email", { required: true })}
        type="email"
        label="email"
        variant="standard"
        helperText={loginErrors.email && <span>This field is required</span>}
      />

    </div>
    <div className="content">
      <TextField
        error={loginErrors.password ? true : false}
        sx={{ mt: 2 }}
        {...registerLogin("password", { required: true })}
        type="password"
        label="password"
        variant="standard"
        helperText={loginErrors.password && <span>This field is required</span>}
      />
    </div>
    <div className="action">
      <Button sx={{ mt: 2 }} variant="contained" type="submit">Login</Button>
    </div>
  </form>

  return (
    <>
      <Helmet>
        <title>Ethio Lottery</title>
      </Helmet>
      <MainContent>
        <Box sx={{ boxShadow: 5 }}>
          <Card sx={{ minWidth: 445 }}>
            <CardHeader
              avatar={
                <Typography variant="h2" component="div">
                  Login
                </Typography>
              }
            />
            <CardContent>
              <CardContent>
                {LoginForm()}
              </CardContent>
            </CardContent>
          </Card>
        </Box>
      </MainContent>

    </>
  );

}

const mapStateToProps = (state: any) => selectAuth(state);

const mapDispatchToProps = (dispatch: any) => ({
  AuthenticateUser: (user: any) => dispatch(Authenticate(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(UserAuth);
