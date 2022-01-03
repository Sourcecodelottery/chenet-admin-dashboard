import { ILoginInput, IUserInput, IUserEdit, IUserDoc } from "./user.types"

export type { IUserInput, ILoginInput, IUserEdit, IUserDoc }

export const SignUpBody = (input: IUserInput) => ({
  query: `mutation{ 
    createAccount(input:{
        first_name: "${input.first_name}",
        last_name: "${input.last_name}",
        phone_number: "${input.phone_number}",
        email: "${input.email}",
        role: "${input.role}",
        password: "${input.password}"
    }) { 
        ... on IAccountSimple{ 
          _id
          first_name
          last_name
          phone_number
          email
          role
        } 
        ... on ValidationError{ 
          error_path 
          errors{ 
            error_code 
            error_message 
             
          } 
        } 
        ... on SystemError{ 
          error_code 
          error_message 
        } 
    } 
  }`
})

export const SignUpTag = "createAccount"

export const LoginBody = ({ email, password }: ILoginInput) => ({
  query: `mutation {
    loginAccount(input:{email: "${email}", password: "${password}"}) {
      __typename
      ... on IAccountSimple{
          _id first_name last_name email phone_number role
       }
      ... on ValidationErrors {
        validation_errors {
          error_path errors {
            error_message error_code
          }
        }
      }
      ... on ValidationError {
        error_path errors {
          error_code error_message
        }
      }
    }
  }`
});

export const SignOutTag = "signOut";

export const SignOutBody = () => ({
  query: `mutation {
    signOutAccount{
      __typename,
      ...on UnAuthorizationError{
        status
        error_message
      }
    }
  }`
});

export const LoginTag = "loginAccount"

export const ActivateUserDetailBody = (_id: string) => ({
  query: `mutation {
    editUser(input: {
        _id: "${_id}",
        hasUserDetail: true
    }) {
        _id
        hasUserDetail
    }
}`
})

export const EditTag = "editUser"

export const EditUserBody = (input: IUserEdit) => ({
  query: `mutation {
    editUser(input: {
      _id: "${input._id}",
      name: "${input.name}",
      email: "${input.email}",
      phoneNumber: "${input.phoneNumber}",
      password: "${input.password}"
    }) {
      _id
      name
      phoneNumber
      email
      password
      userType
      hasUserDetail
      error {
        type
        message
      }
      createdAt
      updatedAt
      }
    }`
})

export const FetchUserCountBody = () => ({
  query: `{
    fetchUserCount
  }`
})

export const FetchUserCountTag = "fetchUserCount"


export const SendTextBody = (phoneNumber: string) => ({
  query: `mutation {
    sendText(
      username: "AC261f71f93af91490b74344b5f1530ced",
      password: "a2814971b46ccb2eaaf79de5ddf70f9b",
      serviceID: "VA3681b48f0c64f46434bfa1c6146e9e48",
      phoneNumber: "${phoneNumber}"
    ) {
      message
      error {
        value
        message
      }
    }
  }`
})

export const SendTextTag = "sendText"


export const VerifyBody = (phoneNumber: string, code: string) => ({
  query: `mutation {
    verify(
      username: "AC261f71f93af91490b74344b5f1530ced",
      password: "a2814971b46ccb2eaaf79de5ddf70f9b",
      serviceID: "VA3681b48f0c64f46434bfa1c6146e9e48",
      phoneNumber: "${phoneNumber}"
      code: "${code}"
    ) {
      message
      error {
        value
        message
      }
    }
  }`
})

export const VerifyTag = "verify"

