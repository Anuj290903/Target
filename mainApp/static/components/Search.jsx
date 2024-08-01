import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useGetAPI } from "./useGetAPI";
import { Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { Main } from "./AppNavBar";
import { useSelector } from 'react-redux';
import UploadCard from "./UploadCard";
import "./coursesStyles.css";
import "../index.css";

function Search() {
    const { query } = useParams();
    const [results, setResults] = useState([]);
    const open = useSelector((state) => state.navbar.isOpen);
    const [data, error, isLoading] = useGetAPI(`http://localhost:8000/search_api/${query}`);
    useEffect(() => {
        if (data && data.results) setResults(data.results);
        console.log(data);
    }, [data]);

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
            Results
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
                {results.length > 0
                    ? results.map((result) => (
                        <UploadCard key={result.id} upload={result} courseId={toString(result.course_id)} />
                    ))
                    : "Sorry! No matching results found."}
                </>
            )}
            </div>
        </Main>
        </>
  );
}
export default Search;