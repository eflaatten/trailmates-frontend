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
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { useDropzone } from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { changeProfilePicture } from "../../../api/profile";

const ChangeProfilePicture = ({ open, onClose, refreshProfilePicture}) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
        await changeProfilePicture(file);
        await refreshProfilePicture();
        setLoading(false);
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
        sx: { backgroundColor: "#0e0c24", color: "#ffffff", width: "400px" },
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
              backgroundColor: "#1f1c3b",
              color: "#fff",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#221e42",
                scale: 1.03,
                transition: "0.3s",
              },
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
            color: "#ff1400",
            border: "2px solid #ff1400",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "rgba(255, 20, 0, 0.1)",
              transform: "scale(1.05)",
            },
            transition: "transform 0.3s ease",
          }}
        >
          Cancel
        </Button>

        {!loading && (
          <Button
            onClick={handleUploadProfilePicture}
            sx={{
              color: "#a061d1",
              border: "2px solid #a061d1",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "rgba(160, 97, 209, 0.1)",
                transform: "scale(1.05)",
              },
              transition: "transform 0.3s ease",
            }}
          >
            Upload
          </Button>
        )}
        {loading ? (
          <Button
            disabled
            sx={{
              color: "#a061d1",
              border: "2px solid #a061d1",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "rgba(160, 97, 209, 0.1)",
                transform: "scale(1.05)",
              },
              transition: "transform 0.3s ease",
            }}
          >
            <CircularProgress size={22} sx={{ color: "#a061d1" }} />
            <Typography style={{ color: "#a061d1", mr: "2" }}>
              Uploading...
            </Typography>
          </Button>
        ) : null}
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
  backgroundColor: "#1f1c3b",
  position: "relative",
  transition: "background-color 0.3s, border-color 0.3s",
  "&:hover": {
    backgroundColor: "#221e42",
    borderColor: "#666",
  },
}));

const TrashIconButton = styled(IconButton)({
  position: "absolute",
  bottom: 8,
  right: 8,
  width: 40,
  height: 40,
  backgroundColor: "#1f1c3b",
  color: "red",
  "&:hover": {
    backgroundColor: "#221e42",
  },
});

const toastOptions = {
  position: "top-right",
  height: 80,
  autoClose: 3200,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "dark",
  style: {
    background: "#121212",
    color: "#ffffff",
  },
};