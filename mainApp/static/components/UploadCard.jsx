import React, { useState } from "react";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { uploadsState } from "./ShowUpload";
import axios from "axios";
import { toast } from "react-hot-toast";

function UploadCard(props) {
  // 
  // Just before Card Content if image is there <CardMedia
  //           sx={{ height: 200, width: 350 }}
  //           image={props.course.imageLink}
  //           title={props.course.title}
  //          /> 
  const navigate = useNavigate();
  const [isMoveOver, setIsMoueOver] = useState(false);
  const [uploads, setUploads] = useRecoilState(uploadsState);

  function deleteUpload() {
    var userInput = window.prompt("Type DELETE to delete the course: ");
    const id = props.upload.id;
    if (userInput === "DELETE") {
      axios
        .delete(`http://localhost:8000/upload/${id}`, {
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
    <div>
      <Card
        sx={{
          maxWidth: 345,
          height: 400,
          display: "flex",
          flexDirection: "column",
          border: isMoveOver ? "1px solid #bc1c44" : "1px solid lightsteelblue",
        }}
        onMouseOver={() => setIsMoueOver(true)}
        onMouseLeave={() => setIsMoueOver(false)}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{
              fontWeight: "700",
              color: isMoveOver && "#bc1c44",
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
            gutterBottom
            variant="subtitle1"
            component="div"
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
            {props.upload.description && props.upload.description }
          </Typography>
        </CardContent>
        <div style={{ margin: "auto", marginTop: "auto" }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "green", marginRight: "5px" }}
            onClick={() => navigate(`/UpdateUpload/${props.upload.id}`)}
          >
            Update
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#bc1c44" }}
            onClick={() => deleteUpload()}
          >
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
}

UploadCard.propTypes = {
  upload: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  courseId: PropTypes.string.isRequired,
};

export default UploadCard;
