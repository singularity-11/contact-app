import React, { useEffect, useState } from "react";
import { ContactModel } from "../models/ContactModel";
import Contact from "../components/Contact/Contact";
import { Box, Grid, Typography } from "@mui/material";
import { useDialogState } from "../util/useDialogState";
import ContactDialog from "../components/Dialog/ContactDialog";
import { Button } from "../components/Button/Button";
import AddIcon from "../../src/icons/Add.svg";
import { contactService } from "../services/contact.service";

const styles = {
  title: {
    fontFamily: "Glysa",
    fontSize: "32px",
    lineHeight: "48px",
    letterSpacing: "0%",
    color: "white",
    mt: "40px",
  },
  button: {
    display: "flex",
    alignItems: "center",
    height: "40px",
    margin: "10px",
    justifyContent: "center",
    width: "130px",
    borderRadius: "20px",
    fontFamily: "Lexend Deca",
  },
  gridContainer: {
    width: "100%",
    backgroundColor: "#000000",
  },
  addButtonIcon: {
    height: "16px",
  },
};

const ContactPage = () => {
  const [contacts, setContacts] = useState<ContactModel[]>([]);
  const { isOpen, openDialog, closeDialog } = useDialogState<ContactModel>();

  useEffect(() => {
    const fetchContacts = async () => {
      const fetchedContacts = await contactService.getContacts();
      setContacts(fetchedContacts);
    };

    fetchContacts();
  }, []);

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={styles.gridContainer}
      >
        <Grid item mr={70}>
          <Typography mt={1} mb={5} sx={styles.title}>
            Contacts
          </Typography>
        </Grid>

        <Grid item>
          <Button
            onClick={openDialog}
            sx={styles.button}
            startIcon={<img src={AddIcon} alt="AddIcon" style={styles.addButtonIcon} />}
          >
            Add new
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={1}
        sx={styles.gridContainer}
      >
        {contacts.map((contact) => (
          <Grid item key={contact.id} xs={7} ml={32}>
            <Box>
              <Contact contact={contact} />
            </Box>
          </Grid>
        ))}
      </Grid>

      <ContactDialog open={isOpen} onClose={closeDialog} />
    </>
  );
};

export default ContactPage;
