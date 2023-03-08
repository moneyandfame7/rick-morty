import { Button, Dialog, DialogContent, DialogProps, DialogTitle, Typography } from "@mui/material";
import { FC } from "react";
import { GoogleIcon } from "./GoogleIcon";
import { GitHub } from "@mui/icons-material";


export const SocialLoginModal: FC<DialogProps> = ({ open, onClose }) => {

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Choose one of these social networks:</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Button variant="outlined" startIcon={<GoogleIcon />} fullWidth>Login in with Google</Button>
        <Button variant="outlined" startIcon={<GitHub />}>Login in with GitHub</Button>
      </DialogContent>
    </Dialog>
  );
};