import React, { ChangeEventHandler, FC } from 'react';
import debounce from 'lodash/debounce';
import { FieldProps } from 'formik';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import Box from '@mui/material/Box';

export interface TextFieldProps extends Partial<FieldProps> {
  showError?: boolean;
  readOnly?: boolean;
  submitOnChange?: boolean;
  submitDelay?: number;
}

export const TextField: FC<TextFieldProps & MuiTextFieldProps> = ({
  field,
  form,
  fullWidth,
  showError = true,
  readOnly,
  variant,
  submitOnChange,
  submitDelay,
  ...props
}) => {
  const onSubmit = debounce(() => {
    if (form) {
      form.handleSubmit(form.values);
    }
  }, submitDelay);

  const onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (e) => {
    if (field && form) {
      form.setFieldValue(field.name, e.target.value);
    }

    if (props.onChange) {
      props.onChange(e);
    }

    if (submitOnChange) {
      onSubmit();
    }
  };

  const getValue = () => {
    if (props.value) {
      return props.value;
    }
    if (field) {
      return field.value;
    }
    return '';
  };

  const isInputReadOnly = props.InputProps?.readOnly || readOnly || false;

  return (
    <Box data-testid="text-field">
      <MuiTextField
        {...field}
        {...props}
        onChange={onChange}
        variant={variant}
        InputProps={{
          ...(props.InputProps || {}),
          readOnly: isInputReadOnly,
        }}
        value={getValue()}
        fullWidth={fullWidth}
      />
    </Box>
  );
};