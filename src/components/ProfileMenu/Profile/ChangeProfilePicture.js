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
import { toast, toastOptions } from '../../../assets/hotToast';
import { changeProfilePicture } from "../../../api/profile";

const ChangeProfilePicture = ({ open, onClose, refreshProfilePicture}) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const onDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    setIsFileUploaded(true);
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
    setIsFileUploaded(false);
  };

  const handleUploadProfilePicture = async () => {
    if (file) {
      try {
        setLoading(true);
        await changeProfilePicture(file);
        await refreshProfilePicture();
        setLoading(false);
        onClose();
        toast.success("Profile picture uploaded successfully!", toastOptions);
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Failed to upload profile picture!", toastOptions);
      }
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
        sx: { backgroundColor: "#181C1F", color: "#ffffff", width: "400px" },
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
              backgroundColor: "#a5adc1",
              color: "#fff",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#a5adc1",
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
            border: "1px solid #ff1400",
            "&:hover": {
              backgroundColor: "transparent",
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
              color: "white !important",
              backgroundColor: "#6369ff",
              opacity: isFileUploaded ? 1 : 0.5,
              "&:hover": {
                backgroundColor: "#6369ff",
                transform: isFileUploaded ? "scale(1.05)" : "none",
                cursor: isFileUploaded ? "pointer" : "default",
              },
              transition: "transform 0.3s ease",
            }}
            disabled={!isFileUploaded}
          >
            Upload
          </Button>
        )}
        {loading ? (
          <Button
            disabled
            sx={{
              color: "#a061d1",
              backgroundColor: "#6369ff",
              "&:hover": {
                backgroundColor: "#6369ff",
              },
              gap: "4px",
            }}
          >
            <CircularProgress size={22} sx={{ color: "#fff" }} />
            <Typography style={{ color: "#fff", mr: "4" }}>
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
  backgroundColor: "#0E1113",
  position: "relative",
  transition: "background-color 0.3s, border-color 0.3s",
  "&:hover": {
    backgroundColor: "#181C1F",
    borderColor: "#666",
  },
}));

const TrashIconButton = styled(IconButton)({
  position: "absolute",
  bottom: 8,
  right: 8,
  width: 40,
  height: 40,
  backgroundColor: "#181C1F",
  color: "red",
  "&:hover": {
    backgroundColor: "#222629",
  },
});
