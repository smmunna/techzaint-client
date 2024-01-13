import { useQuery } from '@tanstack/react-query';
import secureApi from '../../api/secureApi';
import { useEffect } from 'react';

const useSingleBlogHooks = (id) => {
    const { refetch, data: singleBlogData = {}, isLoading, error } = useQuery({
        queryKey: ['singleBlog', id],
        queryFn: async () => {
            const response = await secureApi.get(`/single-blog?id=${id}`);
            return response.blog;
        },
    });

    useEffect(() => {
        refetch();
    }, [id]);

    return { singleBlogData, isLoading, error, refetch };
};

export default useSingleBlogHooks;
