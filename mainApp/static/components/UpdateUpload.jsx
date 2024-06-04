import React, { useEffect, useState } from "react";
import CreateUpload from "./CreateUpload";
import { useParams } from "react-router-dom";
import { useGetAPI } from "./useGetAPI";

function UpdateUpload() {
  const { uploadId } = useParams();
  const [data, error, isLoading] = useGetAPI(`http://localhost:8000/upload_api/${uploadId}`);
  const [upload, setUpload] = useState({
    id: uploadId,
    title: "",
    description: "",
    probSet: null,
    vidFile: null,
    courseId: "",
  });

  useEffect(() => {
    if (data && data.upload) setUpload({
      id: data.upload.id || "",
      title: data.upload.title || "",
      description: data.upload.description || "",
      probSet: data.upload.probSet || "",
      vidFile: data.upload.vidFile || null,
      courseId: data.upload.course || null,
    });
  }, [data]);

  return (
    <div>
      <CreateUpload upload={upload} isUpdate={true} />
    </div>
  );
}

export default UpdateUpload;
