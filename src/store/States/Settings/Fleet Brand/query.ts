export const FetchFleetBrandsBodyTag = "fetchFleetBrands"
export const FetchFleetBrandsBody = () => ({
  query: `{
    fetchFleetBrands {
      _id
      name
      createdAt
      updatedAt
    }
  }`
})

export const AddFleetBrandBodyTag = "createFleetBrand"
export const AddFleetBrandBody = (name: string) => ({
  query: `mutation {
      createFleetBrand(input: {
          name: "${name}"
      }) {
      ...on IFleetBrandSimple {
        _id
        name
        createdAt
        updatedAt
      }
    }
  }`
})

export const RemoveFleetBrandBodyTag = "removeFleetBrandByID"
export const RemoveFleetBrandBody = (_id: string) => ({
  query: `mutation {
    removeFleetBrandByID(_id: "${_id}") {
      ...on IFleetBrandSimple {
        _id
        name
        createdAt
        updatedAt
      }
    }
  }`
})