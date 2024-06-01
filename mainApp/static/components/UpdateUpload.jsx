import React, { useEffect, useState } from "react";
import CreateUpload from "./CreateUpload";
import { useParams } from "react-router-dom";

function UpdateUpload() {
  const { uploadId } = useParams();
  const [upload, setUpload] = useState({
    id: uploadId,
    title: "",
    description: "",
    probSet: null,
    vidFile: null,
    courseId: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8000/upload/${uploadId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setUpload({
          id: data.upload.id || "",
          title: data.upload.title || "",
          description: data.upload.description || "",
          probSet: data.upload.probSet || "",
          vidFile: data.upload.vidFile || null,
          courseId: data.upload.course || null,
        });
      })
      .catch((err) => console.log(err));
  }, [uploadId]);

  return (
    <div>
      <CreateUpload upload={upload} isUpdate={true} />
    </div>
  );
}

export default UpdateUpload;
