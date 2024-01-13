import { useState, useEffect } from 'react';
import secureApi from "../../api/secureApi";

const useBlogHooks = (offset, limit) => {
    const [blogData, setblogData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [total,setTotal] = useState(null)

    const fetchData = () => {
        setIsLoading(true);
        secureApi
            .get(`/view-blog?offset=${offset}&limit=${limit}`)
            .then((res) => {
                setblogData(res.blogs);
                setTotal(res.total)
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    };


    const refetch = () => {
        fetchData();
    };

    useEffect(() => {
        refetch()
    }, [offset, limit])

    return { blogData, isLoading, error,total, refetch };
};

export default useBlogHooks;