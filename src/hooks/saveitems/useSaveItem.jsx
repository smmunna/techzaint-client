import { useQuery } from "@tanstack/react-query";
import secureApi from "../../api/secureApi";

const useSaveItem = () => {
    const email = localStorage.getItem('email');

    const { refetch, data: savedItems = [] } = useQuery({
        queryKey: ['savedItems', email],
        queryFn: async () => {
            const response = await secureApi.get(`/user/favorite?email=${email}`);
            return response;
        },
    });

    return [savedItems, refetch];
}

export default useSaveItem;

