export const FetchFleetModelsBodyTag = "fetchFleetModels"
export const FetchFleetModelsBody = () => ({
  query: `{
    fetchFleetModels {
      _id
      name
      fleet_brand
      available_types
      createdAt
      updatedAt
    }
  }`
})

export const AddFleetModelBodyTag = "createFleetModel"
export const AddFleetModelBody = (input: { name: string, fleet_brand: string, available_types: string[] }) => ({
  query: `mutation {
    createFleetModel(input: {
      name: "${input.name}",
      fleet_brand: "${input.fleet_brand}"
      available_types: [${input.available_types.map(type => `"${type}"`)}]
    }) {
      ...on IFleetModelSimple {
        _id
        name
        fleet_brand
        available_types
      }
    }
  }`
})

export const RemoveFleetModelBodyTag = "removeFleetModelByID"
export const RemoveFleetModelBody = (_id: string) => ({
  query: `mutation {
    removeFleetModelByID(_id: "${_id}") {
      ...on IFleetModelSimple {
        _id
        name
        fleet_brand
        available_types
      }
    }
  }`
})