import React, { useState } from "react";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { coursesState } from "./ShowCourses";
import axios from "axios";
import { toast } from "react-hot-toast";

function CourseCard(props) {
  const navigate = useNavigate();
  const [isMoveOver, setIsMoueOver] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [courses, setCourses] = useRecoilState(coursesState);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  function deleteCourse() {
    var userInput = window.prompt("Type DELETE to delete the course: ");
    const id = props.course.id;
    if (userInput === "DELETE") {
      axios
        .delete(`http://localhost:8000/courses_api/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setCourses(courses.filter((course) => course.id !== id));
          toast.success(res.data.message);
          navigate("/courses");
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div>
      <Card
        sx={{
          maxWidth: 345,
          display: "flex",
          flexDirection: "column",
          border: isMoveOver ? "1px solid #bc1c44" : "1px solid lightsteelblue",
          position: "relative",
          marginBottom: "20px", // Added marginBottom for spacing between cards
          height: "100%", // Ensures the card takes full height of its container
        }}
        onMouseOver={() => setIsMoueOver(true)}
        onMouseLeave={() => setIsMoueOver(false)}
        onClick={() => navigate(`/uploads/${props.course.id}`)}
      >
        {props.course.image && (
          <CardMedia
            sx={{ height: 200, width: 350 }}
            image={`http://127.0.0.1:8000/media/image/${props.course.image.split("/").pop()}`}
            title={props.course.title}
          />
        )}
        <CardContent style={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{
              fontWeight: "700",
              color: isMoveOver ? "#bc1c44" : "inherit",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {props.course.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3, // Increase the number of lines to display more content
              WebkitBoxOrient: "vertical",
            }}
          >
            {props.course.description}
          </Typography>
        </CardContent>
        <IconButton
          aria-label="settings"
          onClick={(event) => {
            event.stopPropagation();
            handleMenuOpen(event);
          }}
          sx={{ position: "absolute", top: 0, right: 0, color: "black" }}
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
              navigate(`/UpdateCourse/${props.course.id}`);
            }}
          >
            Update
          </MenuItem>
          <MenuItem
            onClick={(event) => {
              event.stopPropagation();
              handleMenuClose();
              deleteCourse();
            }}
          >
            Delete
          </MenuItem>
          <MenuItem
            onClick={(event) => {
              event.stopPropagation();
              handleMenuClose();
              navigate(`/CreateUpload/${props.course.id}`);
            }}
          >
            Upload
          </MenuItem>
        </Menu>
      </Card>
    </div>
  );
}

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default CourseCard;
