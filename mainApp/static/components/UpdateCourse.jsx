import React, { useEffect, useState } from "react";
import CreateCourse from "./CreateCourse";
import { useParams } from "react-router-dom";

function UpdateCourse() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
    imageLink: "",
    published: false
  });

  useEffect(() => {
    fetch(`http://localhost:8000/courses/${courseId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourse({
          id: data.course.id || "",
          title: data.course.title || "",
          description: data.course.description || "",
          price: data.course.price || "",
          imageLink: data.course.imageLink || "",
          published: data.course.published || false,
        });
      })
      .catch((err) => console.log(err));
  }, [courseId]);

  return (
    <div>
      <CreateCourse course={course} isUpdate={true} />
    </div>
  );
}

export default UpdateCourse;
