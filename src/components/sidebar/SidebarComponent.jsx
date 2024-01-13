import React from "react";
import { Link } from "react-router-dom";
import useTop5Blogs from "../../hooks/blogs/useTop5Blogs";

const SidebarComponent = () => {
    const { top5blog } = useTop5Blogs();
    return (
        <div className=" lg:w-1/3 lg:ml-8">
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-2xl font-semibold mb-4">Top 5 Blogs</h2>
                <ul>
                    {
                        top5blog.map((top, index) => <React.Fragment key={index + 1}>
                            <li className="mb-2">
                                <span className="font-bold">{index + 1}.</span> <Link to={`/single-blog/${top?.id}`} className="text-blue-500 hover:underline">
                                    {top?.title}
                                </Link>
                            </li>
                        </React.Fragment>)
                    }

                </ul>
            </div>

            <div className="bg-white p-4 my-4 rounded shadow">
                <h2 className="text-2xl font-semibold mb-4">Top Posts</h2>
                <ul>
                    <li className="mb-2">
                        <a href="#" className="text-blue-500 hover:underline">
                            Technology
                        </a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="text-blue-500 hover:underline">
                            Software Development
                        </a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="text-blue-500 hover:underline">
                            Programming
                        </a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="text-blue-500 hover:underline">
                            Networking
                        </a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="text-blue-500 hover:underline">
                            Database
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SidebarComponent;
