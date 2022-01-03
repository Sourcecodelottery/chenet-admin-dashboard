import { IDriverInput } from "./driver.types"

export const FetchBrokerFollowersBodyTag = "fetchBrokerFollowers"
export const FetchBrokerFollowersBody = (_id: string) => ({
    query: `{
        fetchBrokerFollowers(_id: "${_id}") {
            _id
            first_name
            middle_name
            last_name
            profile_picture
        }
    }`
})

export const FetchDriversBody = () => ({
  query: `{
    fetchUserDrivers {
      _id
      first_name 
      middle_name
      last_name 
      email 
      role 
      phone_number 
      profile_picture 
      address {
        kebele city sub_city
      }
      preferred_brokers 
      blocked_brokers 
      preferred_works 
      truck_available 
      preferred_companies 
      blocked_companies 
      work_load {
        date hours
      }
      work_status 
      work_list 
      available_work_time {
        day start_at ended_at
      }
      preference_count
      gender
      birth_date 
      license_number 
      fleet_brand 
      fleet_model 
      fleet_body_color 
      fleet_type 
      fleet_plate_number 
      vehicle_photos
      bank
      bank_account 
      wallet_amount
      createdAt
      updatedAt
  }
}`
})

export const FetchDriverTag = "fetchUserDrivers"

export const AddDriverTag = "createDriver"
export const AddDriverBody = (input: IDriverInput) => ({
  query: `mutation{
    createDriver(
        input: { 
            first_name: "${input.first_name}"
            middle_name: "${input.middle_name}"
            last_name: "${input.last_name}"
            truck_available: ${Boolean(input.truck_available)}
            phone_number: "${input.phone_number}"
            email: "${input.email}"
            address: {
                sub_city: "${input.address.sub_city}"
                city: "${input.address.city}"
                kebele: "${input.address.kebele}"
            }
            license_number: "${input.license_number}"
            fleet_brand: "${input.fleet_brand}"
            fleet_model: "${input.fleet_model}"
            fleet_body_color: "${input.fleet_body_color}"
            fleet_type: "${input.fleet_type}"
            fleet_plate_number: "${input.fleet_plate_number}"
            vehicle_photos: [${input.vehicle_photos.map(picture => `"${picture}"`)}]
            bank: ${input.bank}
            gender: ${input.gender}
            bank_account: "${input.bank_account}"
            wallet_amount: ${input.wallet_amount}
            profile_picture: "${input.profile_picture}"
        }
    ) {
        ... on ValidationError {
            errors {
                error_code
                error_message
            }
            error_path
        }
        
        ...on ValidationErrors {
            validation_errors {
                error_path
                errors {
                    error_code
                    error_message
                }
            }
        }
        
        ... on SystemError {
            error_code
            error_message
            error_resource
            error_source
        }
        ... on IDriverSimple {
            _id
            first_name
            middle_name
            last_name
            email
            phone_number
            address {
                kebele city sub_city
            }
            preferred_brokers
            blocked_brokers
            preferred_works
            truck_available
            preferred_companies
            blocked_companies
            work_load {
                date
                hours
            }
            work_status
            work_list
            available_work_time {
                day
                start_at
                ended_at
            }
            preference_count
            license_number
            fleet_brand
            fleet_model
            fleet_body_color
            fleet_type
            fleet_plate_number
            vehicle_photos
            bank
            gender
            bank_account
            wallet_amount
            profile_picture
            createdAt
            updatedAt
        }
    }
}`
})