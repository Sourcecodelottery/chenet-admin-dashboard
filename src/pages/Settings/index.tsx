import { Helmet } from 'react-helmet-async';
import { makeStyles } from "@mui/styles"
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Modal, TextField, MenuItem, Button, CircularProgress } from '@mui/material';
import Footer from 'src/components/Footer';

import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { selectAuth } from 'src/store/States/Auth/reducer';
import HorizontalForm from './HorizontalForm'
import { FetchFleetBrands, AddFleetBrand, RemoveFleetBrand } from 'src/store/States/Settings/Fleet Brand'
import { FetchFleetModels, AddFleetModel, RemoveFleetModel } from 'src/store/States/Settings/Fleet Model'
import { FetchFleetTypes, AddFleetType, RemoveFleetType } from 'src/store/States/Settings/Fleet Type'
import React from 'react';

export interface ModalForm {
  name: string
  type: "text" | "number" | "date"
  select: boolean
  options?: any[]
}

function Settings(props: any) {
  const navigate = useNavigate();
  const [fleet_brands, setFleetBrands] = React.useState([])
  const [fleet_types, setFleetTypes] = React.useState([])
  const [fleet_models, setFleetModels] = React.useState([])

  useEffect(() => {
    FetchFleetBrands({}, (error, data) => {
      if (error) throw error
      setFleetBrands(data)
    })

    FetchFleetModels({}, (error, data) => {
      if (error) throw error
      setFleetModels(data)
    })

    FetchFleetTypes({}, (error, data) => {
      if (error) throw error
      setFleetTypes(data)
    })
  }, [])

  //// if user is not logged in redirect to login.
  useEffect(() => {
    if (!props.isAuthenticated)
      navigate("/login", { replace: true });
  }, []);

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }

  const useStyles = makeStyles((theme: any) => ({
    paper: {
      position: "absolute",
      width: 300,
      backgroundColor: theme.palette.background.paper,
      padding: 20
    }
  }));

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [formData, setFormData] = React.useState<ModalForm[]>([])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const DialogBar: React.FC<{
    formData: ModalForm[],
    buttonText: string,
    modelTitle: string,
    modelDescription?: string,
    options?: any[],
    onSubmit: (data: any, modalType: string) => void,
    isLoading: boolean,
    modalType: string
    isDeleteDialog: boolean
    yesHandler: () => void
    noHandler: () => void
  }> = ({
    formData, buttonText, modelTitle, modelDescription,
    options, onSubmit, isLoading, modalType, isDeleteDialog,
    noHandler, yesHandler
  }) => {
    const [form, setForm] = React.useState<any>({})
    return (
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <h2>{modelTitle}</h2>
          <p>{modelDescription ? modelDescription : ""} </p>
          {isDeleteDialog ? (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <h2>Are you sure you want to remove this {modalType}?</h2>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                <Button onClick={yesHandler}>Yes</Button>
                <Button onClick={noHandler}>No</Button>
              </div>
            </div>
        )
            : formData.map(data => (
        data.select ? <>
          <TextField select
            onChange={(event) => setForm({
              ...form, [data.name]: event.target.value
            })}>
            {data.options.map(item => (
              <MenuItem value={item._id}>{item.name}</MenuItem>
            ))}
          </TextField>
          <br />
        </> : <>
          <TextField variant="outlined" name={data.name}
            onChange={(event) => setForm({
              ...form, [data.name]: event.target.value
            })} />
          <br />
        </>
            ))}
        {!Boolean(isDeleteDialog) && <Button
          onClick={() => onSubmit(form, modalType)}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress style={{ color: "blue" }} /> : buttonText}
        </Button>}
      </div>
      </Modal >
    )
}

const [modalType, setModalType] = React.useState<string>()

const triggerModal = (__modalType: string) => {
  setIsDeleteDialog(false)
  switch (__modalType) {
    case "FLEET_BRAND": {
      setModalTitle("Add Fleet Brand")
      setButtonText("Create Fleet Brand")
      setFormData([{
        name: 'name', select: false, type: "text"
      }])
      break
    }

    case "FLEET_MODEL": {
      setModalTitle("Add Fleet Model")
      setButtonText("Create Fleet Model")
      setFormData([
        { name: 'name', select: false, type: "text" },
        { name: 'fleet_brand', select: true, type: "text", options: fleet_brands },
        { name: 'available_types', select: true, type: "text", options: fleet_types },
      ])
      break
    }

    case "FLEET_TYPE": {
      setModalTitle("Add Fleet Type")
      setButtonText("Create Fleet Type")
      setFormData([{
        name: 'name', select: false, type: "text"
      }])
      break
    }
  }
  setModalType(__modalType)
  handleOpen()
}

const handleSubmit = (data: any, __modalType: string) => {
  setIsLoading(true);
  switch (__modalType) {
    case "FLEET_BRAND": {
      AddFleetBrand(data.name, (err: any, data: any) => {
        if (err) throw err
        setFleetBrands(fleet_brands.concat(data))
        setIsLoading(false);
        handleClose()
      })
      break
    }

    case "FLEET_MODEL": {
      AddFleetModel({
        available_types: [data.available_types],
        fleet_brand: data.fleet_brand,
        name: data.name
      }, (err, data) => {
        if (err) throw err
        setFleetModels(fleet_models.concat(data))
        setIsLoading(false);
        handleClose()
      })
      break
    }

    case "FLEET_TYPE": {
      AddFleetType(data.name, (err: any, data: any) => {
        if (err) throw err
        setFleetTypes(fleet_types.concat(data))
        setIsLoading(false);
        handleClose()
      })
      break
    }

    default: { }
  }
}

const [isLoading, setIsLoading] = React.useState<boolean>(false)
const [modalTitle, setModalTitle] = React.useState<string>("")
const [buttonText, setButtonText] = React.useState<string>("")
const [isDeleteDialog, setIsDeleteDialog] = React.useState<boolean>(true)
const [currentItem, setCurrentItem] = React.useState<any>({})

const yesHandler = () => {
  switch(modalType) {
    case "FLEET_BRAND": {
      RemoveFleetBrand(currentItem._id, (err: any, data: any) => {
        if (err) throw err
        if (data._id) {
          setFleetBrands(fleet_brands.filter(fleet_brand => fleet_brand._id !== data._id))
          handleClose()
        }
      })
      break
    }

    case "FLEET_MODEL": {
      RemoveFleetModel(currentItem._id, (err: any, data: any) => {
        if (err) throw err
        if (data._id) {
          setFleetModels(fleet_models.filter(fleet_model => fleet_model._id !== data._id))
          handleClose()
        }
      })
      break
    }

    case "FLEET_TYPE": {
      RemoveFleetType(currentItem._id, (err: any, data: any) => {
        if (err) throw err
        if (data._id) {
          setFleetTypes(fleet_types.filter(fleet_type => fleet_type._id !== data._id))
          handleClose()
        }
      })
      break
    }

    default: {}
  }
}

const noHandler = () => {
  handleClose()
}


return (
  <>
    <Helmet>
      <title>Settings</title>
    </Helmet>
    <PageTitleWrapper>
      {/* <PageHeader /> */}
    </PageTitleWrapper>
    <DialogBar
      formData={formData}
      buttonText={buttonText}
      modelTitle={modalTitle}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      modalType={modalType}
      isDeleteDialog={isDeleteDialog}
      yesHandler={yesHandler}
      noHandler={noHandler}
    />
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          <div style={{ marginBottom: 40 }}>
            <HorizontalForm
              add_title="Add New Fleet Brand"
              data={fleet_brands}
              title="Fleet Brands"
              addFunction={() => triggerModal("FLEET_BRAND")}
              closeFunction={(data: any) => {
                setCurrentItem(data)
                setModalType("FLEET_BRAND")
                setIsDeleteDialog(true)
                handleOpen()
              }}
            />
          </div>
          <div style={{ marginBottom: 40 }}>
            <HorizontalForm
              add_title="Add New Fleet Model"
              data={fleet_models}
              title="Fleet Models"
              addFunction={() => triggerModal("FLEET_MODEL")}
              closeFunction={(data: any) => {
                setCurrentItem(data)
                setModalType("FLEET_MODEL")
                setIsDeleteDialog(true)
                handleOpen()
              }}
            />
          </div>
          <div>
            <HorizontalForm
              add_title="Add New Fleet Type"
              data={fleet_types}
              title="Fleet Types"
              addFunction={() => triggerModal("FLEET_TYPE")}
              closeFunction={(data: any) => {
                setCurrentItem(data)
                setModalType("FLEET_TYPE")
                setIsDeleteDialog(true)
                handleOpen()
              }}
            />
          </div>
        </Grid>
      </Grid>
    </Container>
    <Footer />
  </>
);

}

const mapStateToProps = (state: any) => selectAuth(state);

export default connect(mapStateToProps)(Settings);
