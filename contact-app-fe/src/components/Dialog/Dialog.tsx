import React, { FC, Ref } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiDialog, { DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import LinearProgress from "@mui/material/LinearProgress";
import { useTheme } from "@mui/material/styles";

const styles = {
  hidden: {
    visibility: "hidden",
  },
  title: {
    width: "100%",
    fontFamily: "Glysa",
    ml: "10px",
  },
};

export interface DialogProps extends Omit<MuiDialogProps, "title" | "content"> {
  open: boolean;
  onClose: (
    e: React.SyntheticEvent<any>,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => void;
  title: React.ReactNode;
  content: React.ReactNode;
  titleAddon?: React.ReactNode;
  actions?: React.ReactNode;
  contentClass?: string;
  showCloseButton?: boolean;
  loading?: boolean;
}

export const Dialog: FC<DialogProps> = React.forwardRef(
  (
    {
      open,
      onClose,
      actions,
      title,
      content,
      titleAddon,
      contentClass,
      showCloseButton = true,
      loading,
      ...props
    },
    ref: Ref<any>
  ) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

    return (
      <MuiDialog
        data-testid="dialog"
        ref={ref}
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        {...props}
      >
        <LinearProgress sx={!loading ? styles.hidden : null} />
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography sx={styles.title} variant="h6">
              {title}
            </Typography>
            {titleAddon}
          </Box>
        </DialogTitle>
        <DialogContent className={contentClass}>{content}</DialogContent>
        {actions && (
          <DialogActions data-testid="dialog-actions">{actions}</DialogActions>
        )}
      </MuiDialog>
    );
  }
);
