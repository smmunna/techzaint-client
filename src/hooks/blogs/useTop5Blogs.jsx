import { useQuery } from "@tanstack/react-query";
import secureApi from "../../api/secureApi";

const useTop5Blogs = () => {
    const { refetch, data: top5blog = [], isLoading, error } = useQuery({
        queryKey: ['savedItems'],
        queryFn: async () => {
            const response = await secureApi.get(`/top5blogs`);
            return response.top5Blogs;
        },
    });

    return { top5blog, refetch, isLoading, error };
}

export default useTop5Blogs;
