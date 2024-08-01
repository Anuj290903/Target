import { useState, useEffect } from "react";

export const useGetAPI = (url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: "JWT " + localStorage.getItem("access"),
            },
        })
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((err) => {
            setError(err.message);
            console.log(err);
        })
        .finally(() => setIsLoading(false));
    }, [url])
    return [data, error, isLoading];   
};

// const usePostAPI = (url, data) => {
//     useEffect(() => {
//         setIsLoading(true);
//         fetch(url, {
//         method: "POST",
//         headers: {
//             Authorization: "Bearer " + localStorage.getItem("token"),
//         },
//         body: data,
//         })
//         .then((response) => response.json())
//         .then((data) => {
//             setData(data);
//             toast.success(data.message);
//         })
//         .catch((err) => {
//             setError(err.message);
//             console.log(err);
//         })
//         .finally(() => setIsLoading(false));
//     }, [url, data]);    
//     return [data, error, isLoading];
// }
// return [useGetAPI, usePostAPI];