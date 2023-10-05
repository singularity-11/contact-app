import React from "react";
import { Field } from "formik";

interface TextFieldProps {
  label: string;
  name: string;
}

const TextField = ({ name, label }: TextFieldProps) => {
  return (
    <div className="form-group">
      <label className="mb-1">{label}</label>
      <Field name={name} type="text" className="form-control" />
    </div>
  );
};

export default TextField;
