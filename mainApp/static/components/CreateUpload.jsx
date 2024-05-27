import React, { useEffect, useState } from "react";
import UploadForm from "./UploadForm";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

function CreateUpload(props) {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [probSet, setProbSet] = useState("");
  const [vidFile, setVidFile] = useState("");

  useEffect(() => {
    if (props.isUpdate) {
      setTitle(props.upload.title || "");
      setDescription(props.upload.description || "");
      setCourse(props.upload.course || "");
      setProbSet(props.upload.probSet || "");
      setVidFile(props.upload.vidFile || "");
      setCourse(props.upload.courseId || "");
    }
  }, [props.upload]);

  function createUpload(courseId) {
    fetch(`http://localhost:8000/course_upload/${courseId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        description,
        course,
        probSet,
        vidFile,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
        setDescription("");
        setTitle("");
        setCourse("");
        setVidFile("");
        setProbSet("");
        navigate(`/uploads/${courseId}`);
      })
      .catch((err) => console.log(err));
  }

  function updateUpload(courseId) {
    fetch(`http://localhost:8000/upload/${props.upload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        description,
        course,
        probSet,
        vidFile,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
        console.log(`courseId:${course}`);
        navigate(`/uploads/${course}`);
      })
      .catch((err) => console.log(err));
  }

  return (
    <UploadForm
      isUpdate={props.isUpdate}
      createUpload={createUpload}
      updateUpload={updateUpload}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      course={course}
      setCourse={setCourse}
      probSet={probSet}
      setProbSet={setProbSet}
      vidFile={vidFile}
      setVidFile={setVidFile}
      courseId={courseId}
    />
  );
}

export default CreateUpload;