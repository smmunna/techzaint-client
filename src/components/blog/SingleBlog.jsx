import { useParams } from "react-router-dom";
import useSingleBlogHooks from "../../hooks/blogs/useSingleBlogHooks";
import { Container, IconButton, Skeleton } from "@mui/material";
import parse from 'html-react-parser';
import { AccessTime, BookmarkBorder, Favorite } from "@mui/icons-material";
import moment from "moment";

import { lazy, Suspense } from 'react';
import SidebarComponent from "../sidebar/SidebarComponent";

// Lazy load the component
const LazyImage = lazy(() => import('../LazyImage/LazyImage.jsx'));

const SingleBlog = () => {
    const { id } = useParams()
    const { singleBlogData, isLoading } = useSingleBlogHooks(id)
    const { title, description, favorite, cover_img, created_at } = singleBlogData
    return (
        <div className="py-5">
            <div className="container mx-auto lg:flex">
                <div className="w-full mb-7 lg:mb-0 lg:w-2/3">
                    <Container>

                        {
                            isLoading ?
                                <>
                                    <Skeleton variant="rectangular" width={210} height={160} style={{ width: '100%' }} />
                                    <Skeleton variant="rounded" width={210} height={160} style={{ width: '100%', marginTop: '20px' }} />
                                    <Skeleton variant="rounded" width={210} height={160} style={{ width: '100%', marginTop: '20px' }} />
                                    {/* <Skeleton variant="rounded" width={210} height={160} style={{ width: '100%', marginTop: '20px' }} /> */}
                                </>
                                :
                                <>

                                    <div className="py-5">
                                        <div>
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <LazyImage src={cover_img} alt="Blog Post Image" />
                                            </Suspense>
                                            <div className="mt-4">
                                                <h2 className="text-2xl font-semibold">
                                                    {title}
                                                </h2>
                                                <p className="text-gray-600">Published on {moment(created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
                                                <p className="mt-2">
                                                    {parse(description)}
                                                </p>
                                                <div className="flex items-center mt-4">
                                                    <IconButton size="small" color="error">
                                                        <Favorite />
                                                    </IconButton>
                                                    <span className="text-gray-600 mr-4">{favorite}</span>
                                                    <IconButton size="small">
                                                        <BookmarkBorder />
                                                    </IconButton>
                                                    <span className="text-gray-600 mr-4">Save</span>
                                                    <IconButton size="small">
                                                        <AccessTime />
                                                    </IconButton>
                                                    <span className="text-gray-600 mr-4">5 min read</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                        }
                    </Container>
                </div>
                {/* Sidebar component */}
                <SidebarComponent />
            </div>
        </div>
    );
}

export default SingleBlog;
