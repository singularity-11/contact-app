import React, { FC, useState } from "react";
import { Formik, Form, Field, FormikValues } from "formik";
import * as yup from "yup";
import { Grid, Box, Typography } from "@mui/material";
import { ContactModel } from "../../models/ContactModel";
import { FormFooter } from "../FormFooter/FormFooter";
import { Dialog } from "./Dialog";
import { TextField } from "../Text/Text";
import { contactService } from "../../services/contact.service";
import { Button } from "../Button/Button";
import profileImage from "../../icons/Size=Big.png";
import EditIcon from "../../icons/Settings.svg";
import AddIcon from "../../icons/Add.svg";
import photoImageUrl from "../../icons/Size=Big.png";
import { commonTextStyle } from "../Contact/Contact";

const styles = {
  button: {
    justifyContent: "left",
    fontFamily: "Lexend Deca",
    borderRadius: "20px",
    marginLeft: "30px",
  },
  fileInput: {
    display: "none",
  },
  field: {
    width: "85%",
    backgroundColor: "rgba(53, 53, 54, 0.5)",
    borderRadius: "10px",
    border: "1px solid #383838",
    mt: "5px",
    ".MuiOutlinedInput-input": {
      color: "white",
      fontFamily: "Lexend Deca",
    },
    "& input::placeholder": {
      color: "white",
      fontFamily: "Lexend Deca",
    },
    "& input::focus": {
      outline: "none",
      border: "1px solid #ccc",
    },
    "& fieldset": {
      border: "none",
    },
  },
  imageContainer: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "left",
    overflow: "hidden",
  },
  gridItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  gridItemTitle: {
    color: "white",
    fontFamily: "Lexend Deca",
  },
  dialog: {
    backgroundColor: "#211f20",
    color: "white",
    fontSize: "24px",
    lineHeight: "40px",
    letterSpacing: "0%",
  },
  box: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "left",
    px: "20px",
    mt: "20px",
  },
  selectedImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "50%",
  },
};

interface ContactDialogProps {
  open: boolean;
  onClose: () => void;
  fetch?: () => void;
  item?: ContactModel | null;
}

const ContactDialog: FC<ContactDialogProps> = ({
  open,
  onClose,
  item,
  fetch,
}) => {
  const initialValues: ContactModel = {
    name: item?.name || "",
    email: item?.email || "",
    phone: item?.phone || "",
    img: item?.img || profileImage,
  };

  const [selectedImage, setSelectedImage] = useState(initialValues.img);

  const handleImageChange = (e: any) => {
    if (e.target) {
      const fileInput = e.target as HTMLInputElement;

      if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
          const result = event.target?.result as string;

          if (result) {
            setSelectedImage(result);
          }
        };

        reader.readAsDataURL(file);
      }
    }
  };

  const onSubmit = async (values: FormikValues) => {
    if (selectedImage !== photoImageUrl) {
      values.img = selectedImage;
    } else {
      values.img = "";
    }

    if (item?.id) {
      await contactService.updateContact(item?.id, values);
    } else {
      await contactService.createContact(values);
    }

    onClose();
    window.location.reload();
  };

  return (
    <Dialog
      maxWidth={"xs"}
      open={open}
      onClose={onClose}
      title={item ? "Edit contact" : "Add contact"}
      PaperProps={{
        style: {
          backgroundColor: "#211f20",
          color: "white",
          fontSize: "24px",
          lineHeight: "40px",
          letterSpacing: "0%",
        },
      }}
      content={
        <Box>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={yup.object().shape({
              name: yup.string(),
              email: yup.string(),
              phone: yup.string(),
              img: yup.string(),
            })}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box sx={styles.box}>
                  <Box id="imageContainer" style={styles.imageContainer}>
                    <img
                      src={selectedImage}
                      alt="SelectedImage"
                      style={styles.selectedImage}
                    />
                  </Box>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={styles.fileInput}
                    id="imageInput"
                  />
                  <Button
                    onClick={() => {
                      const input = document.getElementById("imageInput");

                      if (input) {
                        input.click();
                      }
                    }}
                    sx={styles.button}
                    startIcon={
                      item ? (
                        <img
                          src={EditIcon}
                          alt="EditIcon"
                          style={{ height: "16px" }}
                        />
                      ) : (
                        <img
                          src={AddIcon}
                          alt="AddIcon"
                          style={{ height: "16px" }}
                        />
                      )
                    }
                  >
                    {item ? "Change picture" : "Add picture"}
                  </Button>
                </Box>
                <Grid container spacing={2} m={1}>
                  <Grid item xs={6} sx={styles.gridItem}></Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={commonTextStyle}>
                      Name
                    </Typography>
                    <Field
                      component={TextField}
                      name="name"
                      placeholder="Jamie Wright"
                      sx={styles.field}
                    />
                  </Grid>
                  <Grid item xs={12} mt={1}>
                    <Typography variant="subtitle1" sx={commonTextStyle}>
                      Phone Number
                    </Typography>
                    <Field
                      component={TextField}
                      variant="outlined"
                      name="phone"
                      placeholder="+01 254 5678"
                      sx={styles.field}
                    />
                  </Grid>
                  <Grid item xs={12} mt={1}>
                    <Typography variant="subtitle1" sx={commonTextStyle}>
                      Email address
                    </Typography>
                    <Field
                      component={TextField}
                      variant="outlined"
                      name="email"
                      placeholder="jamie.wright@gmail.com"
                      sx={styles.field}
                    />
                  </Grid>
                </Grid>
                <Box mb={1} mt={2}>
                  <FormFooter
                    onCancel={onClose}
                    saveTitle={<span>Done</span>}
                    loading={isSubmitting}
                  />
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      }
    ></Dialog>
  );
};

export default ContactDialog;
