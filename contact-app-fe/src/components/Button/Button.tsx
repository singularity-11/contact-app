import React, { forwardRef } from "react";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material/styles";
import { mergeSx } from "../../util/helpers";

export interface ButtonProps extends Omit<MuiButtonProps, "ref"> {
  buttonSx?: SxProps<Theme>;
  progressSx?: SxProps<Theme>;
  className?: string;
  buttonClassName?: string;
  progressClassName?: string;
  loading?: boolean;
  customTestId?: string;
  fullWidth?: boolean;
  transparent?: boolean;
  ml?: number;
}

const styles = {
  root: {
    position: "relative",
    display: "inline-block",
    borderRadius: "10px",
  },
  buttonProgress: {
    position: "absolute",
    top: "calc(50% - 12px)",
    right: "calc(50% - 12px)",
  },
  fullWidth: {
    width: "100%",
  },
  button: {
    backgroundColor: "#3a3638",
    fontFamily: "Lexend Deca",
    textTransform: "none",
    border: "none",
    "&:hover": {
      backgroundColor: "gray",
    },
  },
  transparentButton: {
    backgroundColor: "transparent",
    border: "none",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "transparent",
    },
    boxShadow: "none",
    fontFamily: "Lexend Deca",
  },
};


export const Button = forwardRef<HTMLDivElement, ButtonProps>((props, ref) => {
  const {
    loading,
    disabled,
    sx,
    buttonSx,
    progressSx,
    className,
    fullWidth,
    buttonClassName,
    progressClassName,
    variant = "contained",
    customTestId,
    transparent,
    ml,
    ...rest
  } = props;

  return (
    <Box
      data-testid="button-container"
      ref={ref}
      className={className}
      sx={{
        ...mergeSx(styles.root, fullWidth ? styles.fullWidth : null, sx),
      }}
    >
      <MuiButton
        disabled={loading || disabled}
        className={buttonClassName}
        sx={mergeSx(
          styles.root,
          fullWidth ? styles.fullWidth : null,
          transparent ? styles.transparentButton : styles.button,
          ml !== undefined ? { ml: ml } : null,
          buttonSx,
          sx
        )}
        fullWidth={fullWidth}
        variant={variant}
        {...rest}
      />

      {loading && (
        <CircularProgress
          size={24}
          className={progressClassName}
          sx={mergeSx(styles.buttonProgress, sx)}
        />
      )}
    </Box>
  );
});
