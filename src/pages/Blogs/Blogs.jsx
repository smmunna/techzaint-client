import React, { useEffect, useState } from "react";
import BlogComponent from "../../components/blog/BlogComponent";
import SidebarComponent from "../../components/sidebar/SidebarComponent";
import useBlogHooks from "../../hooks/blogs/useBlogHooks";
import { Button, MenuItem, Pagination, Skeleton, TextField } from "@mui/material";
import secureApi from "../../api/secureApi";

const Blogs = () => {
    const [currentPage, setCurrentPage] = useState(0); // Assuming you want to start from page 1
    const [itemPerpage, setItemPerPage] = useState(10);
    const { blogData, isLoading, total } = useBlogHooks(currentPage - 1, itemPerpage);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredBlogData, setFilteredBlogData] = useState([]);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    // State for selected month and year
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);

    // Array of month names
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    // Generate an array for years (adjust the range as needed)
    const years = Array.from({ length: 10 }, (_, index) => currentYear - index);


    useEffect(() => {
        setFilteredBlogData(blogData)
    }, [blogData])

    // Search by title
    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();

        // Filter the blogData based on the search query
        const filteredData = blogData.filter((blog) =>
            blog.title.toLowerCase().includes(query)
        );

        setFilteredBlogData(filteredData);
        setSearchQuery(query);
        setCurrentPage(1); // Reset page to 1 when search query changes
    };

    // Category wise search
    const handleCategoryChange = (event) => {
        const query = event.target.value.toLowerCase();

        // Filter the blogData based on the search query
        const filteredData = blogData.filter((blog) =>
            blog.category.toLowerCase().includes(query)
        );

        setFilteredBlogData(filteredData);
        setCurrentPage(1); // Reset page to 1 when search query changes
    };

    const handleMonthYearBlogs = () => {
        secureApi.get(`/blogs-by-month-and-year?month=${selectedMonth}&year=${selectedYear}`)
            .then(res => {
                setFilteredBlogData(res.blogs)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <div className="font-sans p-5 ">
                <div className="my-4 grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Search your blogs"
                            variant="outlined"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            fullWidth />
                    </div>
                    <div>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select"
                            defaultValue="Programming"
                            helperText="Choose itemperpage"
                            fullWidth
                            onChange={(e) => setItemPerPage(e.target.value)}
                        >
                            <MenuItem value="5">5</MenuItem>
                            <MenuItem value="10">10</MenuItem>
                            <MenuItem value="20">20</MenuItem>
                            <MenuItem value="50">50</MenuItem>
                            <MenuItem value="100">100</MenuItem>
                            <MenuItem value={total}>All Blogs</MenuItem>
                        </TextField>
                    </div>
                    <div>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select"
                            defaultValue="Programming"
                            helperText="Please select category"
                            onChange={handleCategoryChange}
                            fullWidth
                        >
                            <MenuItem value="Technology">Technology</MenuItem>
                            <MenuItem value="networking">networking</MenuItem>
                            <MenuItem value="programming">Programming</MenuItem>
                        </TextField>
                    </div>
                    <div>
                        <TextField
                            id="outlined-select-month"
                            select
                            label="Select Month"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            fullWidth
                        >
                            {monthNames.map((month, index) => (
                                <MenuItem key={index + 1} value={index + 1}>
                                    {month}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div>
                        <TextField
                            id="outlined-select-year"
                            select
                            label="Select Year"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            fullWidth
                        >
                            {years.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button onClick={handleMonthYearBlogs}>Date and Monthwise Blogs</Button>
                    </div>
                </div>
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

                                    <>
                                        {
                                            filteredBlogData.length > 0 ?
                                                <>
                                                    {filteredBlogData.map((blog, index) => (
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
                                                    <div className="text-red-500 text-center py-5 font-semibold text-xl bg-slate-100 font-serif">
                                                        <h3> Blogs Information Not found..</h3>
                                                    </div>
                                                </>
                                        }
                                    </>

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

export default Blogs;
