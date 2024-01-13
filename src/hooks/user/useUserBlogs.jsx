import { useQuery } from "@tanstack/react-query";
import secureApi from "../../api/secureApi";

const useUserBlogs = (offset, limit, email) => {
    const { refetch, data, isLoading, error } = useQuery({
        queryKey: ['user-individual-blogs', offset, limit, email],
        queryFn: async () => {
            const res = await secureApi.get(`/user/individual-blogs?offset=${offset}&limit=${limit}&email=${email}`);
            return res; // Assuming data is the property containing blogs in your API response
        },
    });

    const blogData = data?.blogs || [];
    const total = data?.total || null;


    return { blogData, isLoading, error, total, refetch };
};

export default useUserBlogs;
