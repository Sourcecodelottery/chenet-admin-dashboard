import { Grid, Box, TextField, MenuItem } from "@mui/material"

interface Props {
  errors: any[]
  setErrors: (errors: any[]) => void
  handleChange: (data: any) => void
  formData: any
  errorData: any
}

const PageThree: React.FC<Props> = ({ handleChange, formData, errorData }) => {
  const getError = (name: string) => {
    const keys = Object.keys(errorData)
    const values = Object.values(errorData) as unknown as string[]
    const index = keys.findIndex(error => error === name)
    return index >= 0 ? { error: true, value: values[index].replace("_", " ") } : { error: false, value: "" }
  }
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={3} xs={12}>
          <Box sx={{ maxWidth: "80%", mt: 4 }}>
            <TextField
              select
              label="Bank"
              variant="outlined"
              fullWidth
              size="small"
              name="bank"
              onChange={handleChange}
              value={formData.bank}
              error={Boolean(getError("bank").value)}
              helperText={getError("bank").value}
            >
              {["AWASH_INTERNATIONAL_BANK",
                "COMMERCIAL_BANK_OF_ETHIOPIA"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </TextField>
          </Box>
        </Grid>
        <Grid item md={3} xs={12}>
          <Box sx={{ maxWidth: "80%", mt: 4 }}>
            <TextField
              type="text"
              label="Bank Account"
              variant="outlined"
              fullWidth
              size="small"
              name="bank_account"
              onChange={handleChange}
              value={formData.bank_account}
              error={Boolean(getError("bank_account").value)}
              helperText={getError("bank_account").value}
            />
          </Box>
        </Grid>
        <Grid item md={3} xs={12}>
          <Box sx={{ maxWidth: "80%", mt: 4 }}>
            <TextField
              type="text"
              label="Wallet Amount"
              variant="outlined"
              fullWidth
              size="small"
              name="wallet_amount"
              onChange={handleChange}
              value={formData.wallet_amount}
              error={Boolean(getError("wallet_amount").value)}
              helperText={getError("wallet_amount").value}
            />
          </Box>
        </Grid>
        <Grid item md={3} xs={12}>
          <Box sx={{ maxWidth: "80%", mt: 4 }}>
            <TextField
              type="text"
              label="Tele Birr ID"
              variant="outlined"
              fullWidth
              size="small"
              name="telebirr_id"
              onChange={handleChange}
              value={formData.telebirr_id}
              error={Boolean(getError("telebirr_id").value)}
              helperText={getError("telebirr_id").value}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default PageThree