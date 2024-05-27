import React from 'react'; 
import { useEffect, useState } from "react";
import UploadCard from "./UploadCard";
import { Typography } from "@mui/material";
import "../index.css";
import { atom, useRecoilState } from "recoil";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Main, openState } from "./AppNavBar";
import "./coursesStyles.css";
import Skeleton from "@mui/material/Skeleton";

const uploadsState = atom({
  key: "uploadsState",
  default: [],
});

function ShowUpload() {
  const [uploads, setUploads] = useRecoilState(uploadsState);
  const [open] = useRecoilState(openState);
  const [isLoading, setIsLoading] = useState(false);
  const { courseId } = useParams()

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8000/course_upload/${courseId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data)
        setUploads(res.data.uploads);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Main open={open}>
        <Typography
          variant="h4"
          component="div"
          style={{
            flexGrow: 1,
            padding: "10px",
            borderRadius: "4px",
            fontWeight: "bold",
            color: "#101460",
            textAlign: "center",
            marginTop: "70px",
            marginLeft: "210px",
          }}
        >
          Uploads
        </Typography>
        <div className="all-uploads">
          {isLoading ? (
            <div style={{ display: "flex", gap: "20px" }}>
              <Skeleton variant="rectangular" width={345} height={400} />
              <Skeleton variant="rectangular" width={345} height={400} />
              <Skeleton variant="rectangular" width={345} height={400} />
            </div>
          ) : (
            <>
              {uploads.length > 0
                ? uploads.map((upload) => (
                    <UploadCard key={upload.id} upload={upload} courseId={courseId} />
                  ))
                : "Oops! There are still no uploads. Make a new upload so that it can be accessed. "}
            </>
          )}
        </div>
      </Main>
    </>
  );
}

export default ShowUpload;
export { uploadsState };




