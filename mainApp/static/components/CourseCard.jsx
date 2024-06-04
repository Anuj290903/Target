import React, { useState } from "react";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { coursesState } from "./ShowCourses";
import axios from "axios";
import { toast } from "react-hot-toast";

function CourseCard(props) {
  const navigate = useNavigate();
  const [isMoveOver, setIsMoueOver] = useState(false);
  const [courses, setCourses] = useRecoilState(coursesState);

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
          height: 400,
          display: "flex",
          flexDirection: "column",
          border: isMoveOver ? "1px solid #bc1c44" : "1px solid lightsteelblue",
        }}
        onMouseOver={() => setIsMoueOver(true)}
        onMouseLeave={() => setIsMoueOver(false)}
      >
        {props.course.image && <CardMedia
          sx={{ height: 200, width: 350 }}
          image={`http://127.0.0.1:8000/media/image/${props.course.image.split('/').pop()}`}
          title={props.course.title}
        /> }
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
            {props.course.title}
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
            {props.course.description}
          </Typography>
        </CardContent>
        <div style={{ margin: "auto", marginTop: "auto" }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "green", marginRight: "5px" }}
            onClick={() => navigate(`/UpdateCourse/${props.course.id}`)}
          >
            Update
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#bc1c44" }}
            onClick={() => deleteCourse()}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#bc1c44" }}
            onClick={() => navigate(`/CreateUpload/${props.course.id}`)}
          >
            Upload
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#bc1c44" }}
            onClick={() => navigate(`/uploads/${props.course.id}`)}
          >
            View
          </Button>
        </div>
      </Card>
    </div>
  );
}

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default CourseCard;
