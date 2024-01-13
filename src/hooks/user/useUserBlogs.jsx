import { useEffect, useState } from "react";
import secureApi from "../../api/secureApi";

const useUserBlogs = (offset,limit,email) => {
    const [blogData, setblogData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [total,setTotal] = useState(null)

    const fetchData = () => {
        setIsLoading(true);
        secureApi
            .get(`/user/individual-blogs?offset=${offset}&limit=${limit}&email=${email}`)
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
    }, [offset, limit,email])

    return { blogData, isLoading, error,total, refetch };
}

export default useUserBlogs;
