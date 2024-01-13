import { useState, useEffect } from 'react';
import secureApi from "../../api/secureApi";

const useSingleBlogHooks = (id) => {
    const [singleBlogData, setsingleBlogData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = () => {
        setIsLoading(true);
        secureApi
            .get(`/single-blog?id=${id}`)
            .then((res) => {
                setsingleBlogData(res.blog);
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
    }, [id])

    return { singleBlogData, isLoading, error, refetch };
};

export default useSingleBlogHooks;