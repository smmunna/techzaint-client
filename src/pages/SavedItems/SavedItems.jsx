import { useState } from "react";
import useSaveItem from "../../hooks/saveitems/useSaveItem";
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import secureApi from "../../api/secureApi";

const SavedItems = () => {
    const [savedItems, refetch] = useSaveItem();
    const [searchQuery, setSearchQuery] = useState("");

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                secureApi.delete(`/favorite?id=${id}`)
                    .then(res => {
                        if (res.success == true) {
                            Swal.fire({
                                title: "Removed!",
                                text: "Your blog has been removed.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        });
    };

    const filteredItems = savedItems.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen mt-10 px-5 lg:px-12">
            <h3 className="text-2xl font-bold mb-4">Saved Items</h3>

            {/* Search Box */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Title"
                    className="border p-2 w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Conditional Rendering based on savedItems length */}
            {filteredItems.length === 0 ? (
                <div className="text-red-500 bg-slate-200 p-4 rounded">
                    No blogs information found.
                </div>
            ) : (
                // Table
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="border p-2">SL</th>
                            <th className="border p-2">Title</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item, index) => (
                            <tr key={item.id}>
                                <td className="border p-2 text-center font-bold">{index + 1}</td>
                                <td className="border p-2">{item.title}</td>
                                <td className="border p-2 text-center">
                                    <button className="bg-green-500 text-white hover:underline mr-2 px-4 py-2 rounded">
                                        <Link to={`/single-blog/${item?.blog_id}`}>View</Link>
                                    </button>
                                    <button
                                        className="bg-red-500 text-white hover:underline px-4 py-2 rounded"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SavedItems;
