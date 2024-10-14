import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { useDropzone } from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { changeProfilePicture } from "../../../api/profile";

const ChangeProfilePicture = ({ open, onClose }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    setIsDragging(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFile(null);
  };

  const handleUploadProfilePicture = async () => {
    if (file) {
      try {
        await changeProfilePicture(file); 
        onClose();
        toast.success("Profile picture uploaded successfully!", { ...toastOptions });
        
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Failed to upload profile picture!", { ...toastOptions });
      }
    } else {
      toast.warn("Please select a file to upload!", { ...toastOptions }); 
    }
  };

  useEffect(() => {
    if (!open) {
      setFile(null);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { backgroundColor: "#1e1e1e", color: "#ffffff", width: "400px" },
      }}
    >
      <DialogTitle>Change Profile Picture</DialogTitle>
      <DialogContent>
        <DottedCircle {...getRootProps()} isDragging={isDragging}>
          <input {...getInputProps()} />
          {file ? (
            <>
              <Avatar
                src={URL.createObjectURL(file)}
                sx={{ width: "100%", height: "100%" }}
                alt='Uploaded Profile'
              />
              <TrashIconButton onClick={handleRemoveFile} size='small'>
                <DeleteIcon />
              </TrashIconButton>
            </>
          ) : (
            <Typography>{isDragging ? "Drop here" : "Drag n Drop"}</Typography>
          )}
        </DottedCircle>
        <Typography
          align='center'
          variant='body1'
          sx={{ margin: "20px 0", color: "#999" }}
        >
          or
        </Typography>
        <Box textAlign='center'>
          <Button
            variant='contained'
            component='label'
            sx={{
              backgroundColor: "#333",
              color: "#fff",
              "&:hover": { backgroundColor: "#555" },
            }}
          >
            Upload a file
            <input
              type='file'
              hidden
              onChange={(e) => onDrop(e.target.files)}
            />
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            color: "#ffffff",
            "&:hover": { backgroundColor: "#333" },
          }}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={handleUploadProfilePicture}
          sx={{
            backgroundColor: "#2196F3",
            color: "#fff",
            "&:hover": { backgroundColor: "#1976D2" },
          }}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeProfilePicture;

const DottedCircle = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDragging",
})(({ isDragging }) => ({
  border: `2px dashed ${isDragging ? "#4caf50" : "#555"}`,
  borderRadius: "50%",
  width: "150px",
  height: "150px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  color: isDragging ? "#4caf50" : "#777",
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: "#333",
  position: "relative",
  transition: "background-color 0.3s, border-color 0.3s",
  "&:hover": {
    backgroundColor: "#444",
    borderColor: "#666",
  },
}));

const TrashIconButton = styled(IconButton)({
  position: "absolute",
  bottom: 8,
  right: 8,
  width: 40,
  height: 40,
  backgroundColor: "#222",
  color: "red",
  "&:hover": {
    backgroundColor: "#333",
  },
});

const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "dark",
  style: {
    background: "#000000",
    color: "#ffffff",
  },
};