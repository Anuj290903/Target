import React, { useEffect, useState } from "react";
import CourseForm from "./CourseForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

function CreateCourse(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [published, setPublished] = useState(false);
  const csrfToken = useSelector((state) => state.csrf.token)

  useEffect(() => {
    if (props.isUpdate) {
      setTitle(props.course.title || "");
      setDescription(props.course.description || "");
      setPrice(props.course.price || "");
      setImage(props.course.image || null);
      setPublished(props.course.published || false);
    }
  }, [props.course]);

  function createCourse() {
    const formData = new FormData()
    formData.append("title", title)
    if (description) formData.append("description", description)
    formData.append("price", price)
    formData.append("published", published)
    if (image) formData.append("image", image)
    fetch("http://localhost:8000/courses_api", {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: "JWT " + localStorage.getItem("access"),
        'X-CSRFToken': csrfToken,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
        setDescription("");
        setImage(null);
        setTitle("");
        setPrice("");
        setPublished(false);
        navigate("/courses");
      })
      .catch((err) => console.log(err));
  }

  function updateCourse() {
    const formData = new FormData()
    formData.append("title", title)
    if (description) formData.append("description", description)
    formData.append("price", price)
    formData.append("published", published)
    if (image) formData.append("image", image)
    fetch(`http://localhost:8000/courses_api/${props.course.id}`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: "JWT " + localStorage.getItem("access"),
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
        navigate("/courses");
      })
      .catch((err) => console.log(err));
  }

  return (
    <CourseForm
      isUpdate={props.isUpdate}
      createCourse={createCourse}
      updateCourse={updateCourse}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      price={price}
      setPrice={setPrice}
      image={image}
      setImage={setImage}
      published={published}
      setPublished={setPublished}
    />
  );
}

export default CreateCourse;
