import React from "react";
import { useEffect } from "react";
import CourseCard from "./CourseCard";
import { Typography } from "@mui/material";
import "../index.css";
import { atom, useRecoilState } from "recoil";
import { Main, openState } from "./AppNavBar";
import "./coursesStyles.css";
import Skeleton from "@mui/material/Skeleton";
import { useGetAPI } from "./useGetAPI";
import "bootstrap/dist/css/bootstrap.min.css";

const coursesState = atom({
  key: "coursesState",
  default: [],
});

function ShowCourses() {
  const [courses, setCourses] = useRecoilState(coursesState);
  const [open] = useRecoilState(openState);
  const [courseData, courseError, isLoading] = useGetAPI("http://localhost:8000/courses_api");

  useEffect(() => {
    if (courseData && courseData.courses) setCourses(courseData.courses);
  }, [courseData, setCourses]);

  return (
    <>
      <Main open={open}>
        <div className="shift-right"> 
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
            marginBottom: "20px", // Added marginBottom for spacing
          }}
        >
          Courses
        </Typography>
        <div className="container">
          <div className="row" style={{ marginBottom: "20px" }}> {/* Added marginBottom for row spacing */}
            {isLoading ? (
              <div className="d-flex justify-content-center">
                <Skeleton variant="rectangular" width={345} height={400} />
                <Skeleton variant="rectangular" width={345} height={400} />
                <Skeleton variant="rectangular" width={345} height={400} />
              </div>
            ) : (
              <>
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <div className="col-lg-4 col-md-6 mb-4" key={course.id} style={{ marginBottom: "20px" }}> {/* Added marginBottom for card spacing */}
                      <CourseCard course={course} />
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <p className="text-center">
                      Oops! Courses are still not available. Make a new course so that it can be accessed.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        </div>
      </Main>
    </>
  );
}

export default ShowCourses;
export { coursesState };
