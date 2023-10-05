import React, { useState } from "react";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import ContactImage from "../ContactImage/ContactImage";
import { ContactModel } from "../../models/ContactModel";
import { contactService } from "../../services/contact.service";
import ContactDialog from "../Dialog/ContactDialog";
import { useDialogState } from "../../util/useDialogState";
import MoreIcon from "../../icons/More.svg";
import DeleteIcon from "../../icons/Delete.svg";
import EditIcon from "../../icons/Settings.svg";

interface ContactProps {
  contact: ContactModel;
  className?: string;
}

export const commonTextStyle: React.CSSProperties = {
  fontFamily: "Lexend Deca",
  color: "white",
  fontSize: "12px",
};

const contactStyle: React.CSSProperties = {
  ...commonTextStyle,
  display: "flex",
  alignItems: "center",
  position: "relative",
};

const nameStyle: React.CSSProperties = {
  ...commonTextStyle,
  fontSize: "16px",
  fontWeight: "bold",
};

const iconStyle: React.CSSProperties = {
  position: "absolute",
  alignItems: "center",
  top: "30%",
  right: 270,
  opacity: 0,
  transition: "opacity 0.3s",
  cursor: "pointer",
};

const menuStyle = {
  "&:hover": {
    backgroundColor: "rgba(128, 128, 128, 0.5)",
  },
  color: "white",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const menuItemStyle = {
  ".MuiMenu-list": {
    p: 0,
  },
};

const Contact = ({ contact }: ContactProps) => {
  const { id, img, name, phone } = contact;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const {
    isOpen: isEditOpen,
    openDialog: openEditDialog,
    closeDialog: closeEditDialog,
  } = useDialogState();

  const handleDelete = async () => {
    await contactService.deleteContact(Number(id));
    window.location.reload();
  };

  return (
    <div
      style={contactStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ContactImage url={img} />
      <div style={{ marginLeft: "1rem" }}>
        <div style={nameStyle}>{name}</div>
        <Box style={commonTextStyle}>{phone}</Box>
      </div>
      <div
        style={{
          ...iconStyle,
          ...(isHovered ? { opacity: 1 } : {}),
        }}
        onClick={handleMenuClick}
      >
        <img src={MoreIcon} alt="MoreIcon" width="20" height="20" />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{ sx: { backgroundColor: "#333" } }}
        sx={menuItemStyle}
      >
        <MenuItem onClick={openEditDialog} sx={menuStyle}>
          <img src={EditIcon} alt="EditIcon" width="20" height="20" />
          <Typography variant="caption" sx={commonTextStyle}>
            Edit
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={menuStyle}>
          <img src={DeleteIcon} alt="DeleteIcon" width="20" height="20" />
          <Typography variant="caption" sx={commonTextStyle}>
            Remove
          </Typography>
        </MenuItem>
      </Menu>

      <ContactDialog
        open={isEditOpen}
        onClose={closeEditDialog}
        item={contact}
      />
    </div>
  );
};

export default Contact;
