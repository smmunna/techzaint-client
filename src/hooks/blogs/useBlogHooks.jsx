import { useQuery } from "@tanstack/react-query";
import secureApi from "../../api/secureApi";

const useBlogHooks = (offset, limit) => {
    const { refetch, data, isLoading, error } = useQuery({
        queryKey: ['view-blog', offset, limit],
        queryFn: async () => {
            const response = await secureApi.get(`/view-blog?offset=${offset}&limit=${limit}`);
            return response; // Assuming data is the property containing blogs in your API response
        },
    });

    const blogData = data?.blogs || [];
    const total = data?.total || 0;

    return { blogData, isLoading, error, total, refetch };
};

export default useBlogHooks;


