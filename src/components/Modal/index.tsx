import React, { FC } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

interface IModalProps {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const Modal: FC<IModalProps> = ({ open, title, message, onClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} data-testid='modal-button-component'>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};
