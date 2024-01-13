import { useState, useEffect } from 'react';
import secureApi from "../../api/secureApi";

const useUserInfoHooks = (email) => {
    const [userInfo, setuserInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = () => {
        setIsLoading(true);
        secureApi
            .get(`/individual-user-info?email=${email}`)
            .then((res) => {
                setuserInfo(res);
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
    }, [email])

    return { userInfo, isLoading, error, refetch };
}

export default useUserInfoHooks;
