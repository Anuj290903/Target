import React, { useEffect, useState } from "react";
import UploadForm from "./UploadForm";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

function CreateUpload(props) {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [probSet, setProbSet] = useState(null);
  const [vidFile, setVidFile] = useState(null);

  useEffect(() => {
    if (props.isUpdate) {
      setTitle(props.upload.title || "");
      setDescription(props.upload.description || "");
      setCourse(props.upload.course || "");
      setProbSet(props.upload.probSet || null);
      setVidFile(props.upload.vidFile || null);
      setCourse(props.upload.courseId || "");
    }
  }, [props.upload]);

  function createUpload(courseId) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (vidFile) formData.append('vidFile', vidFile);
    if (probSet) formData.append('probSet', probSet);
    for (let pair of formData.entries()) {
      console.log(pair[0]+ ': ' + pair[1]); 
  }
    fetch(`http://localhost:8000/course_upload_api/${courseId}`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
        setDescription("");
        setTitle("");
        setCourse("");
        setVidFile(null);
        setProbSet(null);
        navigate(`/uploads/${courseId}`);
      })
      .catch((err) => console.log(err));
  }

  function updateUpload(courseId) {
    const formData = new FormData();
    formData.append('title', title);
    if (description) formData.append('description', description);
    if (vidFile) formData.append('vidFile', vidFile);
    if (probSet) formData.append('probSet', probSet);
    for (let pair of formData.entries()) {
      console.log(pair[0]+ ': ' + pair[1]); 
  }
  axios.post(`http://localhost:8000/upload_api/${props.upload.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.data)
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