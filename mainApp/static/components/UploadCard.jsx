import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { uploadsState } from "./ShowUpload";
import axios from "axios";
import { toast } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';

function UploadCard(props) {
  const navigate = useNavigate();
  const [isMoveOver, setIsMoueOver] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [uploads, setUploads] = useRecoilState(uploadsState);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  function deleteUpload() {
    var userInput = window.prompt("Type DELETE to delete the course: ");
    const id = props.upload.id;
    if (userInput === "DELETE") {
      axios
        .delete(`http://localhost:8000/upload_api/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setUploads(uploads.filter((upload) => upload.id !== id));
          toast.success(res.data.message);
          navigate(`/uploads/${props.courseId}`);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="col-md-4 mb-4">
      <Card
        className={`shadow ${isMoveOver ? "border-danger" : "border-light"}`}
        style={{
          cursor: "pointer",
          overflow: "hidden",
          position: "relative",
          width: "100%",
        }}
        onMouseOver={() => setIsMoueOver(true)}
        onMouseLeave={() => setIsMoueOver(false)}
      >
        {props.upload.vidFile && props.upload.vidFile !== '{}' && (
          <CardMedia
            component="video"
            controls
            src={`http://127.0.0.1:8000/media/video/${props.upload.vidFile.split('/').pop()}`}
            title={props.upload.title}
            style={{ height: 200, cursor: "pointer", width: "100%" }}
            onClick={(event) => {
              event.stopPropagation();
              event.currentTarget.play();
            }}
          />
        )}
        <CardContent>
          <Typography
            className="h2 text-center"
            style={{
              fontWeight: "700",
              color: isMoveOver ? "#dc3545" : "inherit",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {props.upload.title}
          </Typography>
          <Typography
            className="text-center"
            style={{
              fontWeight: "400",
              fontFamily: "inherit",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {props.upload.description}
          </Typography>
          {props.upload.probSet && (
            <div className="text-center mt-2">
              <a
                href={`http://127.0.0.1:8000/media/pdf/${props.upload.probSet.split('/').pop()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary btn-sm"
              >
                View Attachment
              </a>
            </div>
          )}
        </CardContent>
        <IconButton
          aria-label="settings"
          onClick={(event) => {
            event.stopPropagation();
            handleMenuOpen(event);
          }}
          style={{ position: "absolute", top: 10, right: 10, color: "black" }}
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={(event) => {
              event.stopPropagation();
              handleMenuClose();
              navigate(`/UpdateUpload/${props.upload.id}`);
            }}
          >
            Update
          </MenuItem>
          <MenuItem
            onClick={(event) => {
              event.stopPropagation();
              handleMenuClose();
              deleteUpload();
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </Card>
    </div>
  );
}

UploadCard.propTypes = {
  upload: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    probSet: PropTypes.string,
    vidFile: PropTypes.string,
  }).isRequired,
  courseId: PropTypes.string.isRequired,
};

export default UploadCard;
