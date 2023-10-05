import React, { FC, MouseEventHandler, ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import { Button } from "../Button/Button";

interface FormFooterProps {
  onCancel?: () => void;
  onSubmit?: MouseEventHandler;
  loading?: boolean;
  saveTitle?: ReactNode;
  showCancel?: boolean;
}

const styles = {
  button: {
    justifyContent: "right",
    ml: 2,
  },
  buttonTitle: {
    color: "white",
    fontFamily: "Lexend Deca",
  },
};

export const FormFooter: FC<FormFooterProps> = ({
  onCancel,
  onSubmit,
  saveTitle,
  showCancel = true,
}) => {
  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      {showCancel && (
        <Button transparent ml={3} onClick={onCancel}>
          <Typography sx={styles.buttonTitle}>Cancel</Typography>
        </Button>
      )}
      <Button onClick={onSubmit} type="submit" sx={styles.button}>
        <Typography sx={styles.buttonTitle}>{saveTitle}</Typography>
      </Button>
    </Box>
  );
};
