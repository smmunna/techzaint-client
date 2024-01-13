import React, { useState } from "react";
import BlogComponent from "../../components/blog/BlogComponent";
import SidebarComponent from "../../components/sidebar/SidebarComponent";
import useBlogHooks from "../../hooks/blogs/useBlogHooks";
import { Pagination, Skeleton } from "@mui/material";

const Home = () => {
    const [currentPage, setCurrentPage] = useState(0); // Assuming you want to start from page 1
    const { blogData, isLoading, total } = useBlogHooks(currentPage - 1, 10);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <div className="font-sans p-5 ">
                {/* Main Content */}
                <div className="container mx-auto lg:flex">
                    {/* Blog Posts */}
                    <div className="w-full mb-7 lg:mb-0 lg:w-2/3">
                        {
                            isLoading ?
                                <>
                                    {/* For variant="text", adjust the height via font-size */}
                                    {/* <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} /> */}

                                    {/* For other variants, adjust the size with `width` and `height` */}
                                    {/* <Skeleton variant="circular" width={40} height={40} style={{ width: '10%' }} /> */}
                                    <Skeleton variant="rectangular" width={210} height={160} style={{ width: '100%' }} />
                                    <Skeleton variant="rounded" width={210} height={160} style={{ width: '100%', marginTop: '20px' }} />
                                    <Skeleton variant="rounded" width={210} height={160} style={{ width: '100%', marginTop: '20px' }} />
                                    <Skeleton variant="rounded" width={210} height={160} style={{ width: '100%', marginTop: '20px' }} />

                                </>
                                :
                                <>
                                    {
                                        blogData.length == 0 ?
                                            <>
                                                <div className="text-red-500 text-center py-5 font-semibold text-xl bg-slate-100 font-serif">
                                                    <h3> Blogs Information Not found..</h3>
                                                </div>
                                            </>
                                            :
                                            <>
                                                {
                                                    blogData.length > 0 ?
                                                        <>
                                                            {blogData.map((blog, index) => (
                                                                <React.Fragment key={index}>
                                                                    <BlogComponent blog={blog} />
                                                                </React.Fragment>
                                                            ))}
                                                            <div className="flex justify-center">
                                                                <div>
                                                                    <Pagination
                                                                        count={Math.ceil(total / 5)} // Assuming 5 items per page, adjust accordingly
                                                                        page={currentPage}
                                                                        onChange={handlePageChange}
                                                                        variant="outlined"
                                                                        shape="rounded"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </>
                                                        :
                                                        <>

                                                        </>
                                                }
                                            </>
                                    }
                                </>
                        }
                    </div>

                    {/* Sidebar */}
                    <SidebarComponent />
                </div>
            </div>
        </div>
    );
};

export default Home;
