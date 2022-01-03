// fetch all notifications
export const fetchUsersSimpleTag = "fetchUsers";

export const fetchUsersBody = () => ({
  query: `{
    fetchUsers {
        _id
        role
        phone_number
        email
        service_id
        phone_number
    }
}`
});