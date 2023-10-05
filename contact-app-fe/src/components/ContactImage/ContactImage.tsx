import classNames from "classnames";
import React from "react";
import classes from "./ContactImage.module.scss";

interface ContactImageProps {
  url?: string;
  small?: boolean;
  className?: string;
}

const ContactImage = ({ small, url, className }: ContactImageProps) => {
  return (
    <div
      className={classNames(
        classes.ContactImage,
        { [classes.Small]: small },
        className
      )}
      style={{ backgroundImage: `url(${url})` }}
    />
  );
};

export default ContactImage;
