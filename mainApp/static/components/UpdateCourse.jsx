import React, { useEffect, useState } from "react";
import CreateCourse from "./CreateCourse";
import { useParams } from "react-router-dom";
import { useGetAPI } from "./useGetAPI";

function UpdateCourse() {
  const { courseId } = useParams();
  const [data, error, isLoading] = useGetAPI(`http://localhost:8000/courses_api/${courseId}`)
  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
    published: false
  });
  useEffect(() => {
    if (data && data.course) setCourse({
        id: data.course.id || "",
        title: data.course.title || "",
        description: data.course.description || "",
        price: data.course.price || "",
        image: data.course.image || null,
        published: data.course.published || false,
      });  
  }, [data]);

  return (
    <div>
      <CreateCourse course={course} isUpdate={true} />
    </div>
  );
}

export default UpdateCourse;
