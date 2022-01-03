export const FetchFleetTypesBodyTag = "fetchFleetTypes"
export const FetchFleetTypesBody = () => ({
  query: `{
    fetchFleetTypes {
      _id
      name
      createdAt
      updatedAt
    }
  }`
})

export const AddFleetTypeBodyTag = "createFleetType"
export const AddFleetTypeBody = (name: string) => ({
  query: `mutation {
    createFleetType(input: {
      name: "${name}"
    }) {
      ...on IFleetTypeSimple {
        _id
        name
        createdAt
        updatedAt
      }
    }
  }`
})

export const RemoveFleetTypeBodyTag = "removeFleetTypeByID"
export const RemoveFleetTypeBody = (_id: string) => ({
  query: `mutation {
    removeFleetTypeByID(_id: "${_id}") {
      ...on IFleetTypeSimple {
        _id
        name
        createdAt
        updatedAt
      }
    }
  }`
})