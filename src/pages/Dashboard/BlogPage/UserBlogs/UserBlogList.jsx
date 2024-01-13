import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import parse from "html-react-parser";
import { IconButton, Skeleton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import secureApi from "../../../../api/secureApi";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useUserBlogs from "../../../../hooks/user/useUserBlogs";


const UserBlogList = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Default value
    const email = localStorage.getItem('email');
    const { blogData, isLoading, total, refetch } = useUserBlogs(currentPage, rowsPerPage, email);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(0); // Reset to the first page when changing rowsPerPage
    };

    // Delete items
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                secureApi.delete(`/delete-blog?id=${id}`)
                    .then(res => {
                        // console.log(res)
                        if (res.message == 'Blog deleted successfully.') {
                            toast.success(res.message);
                            setTimeout(() => {
                                refetch()
                            }, 2000)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        });
        // console.log(id)
    }

    if (isLoading) {
        return <div>
            <Skeleton height={60} />
            <Skeleton animation="wave" height={60} />
            <Skeleton animation="wave" height={60} />
            <Skeleton animation="wave" height={60} />
            <Skeleton animation="wave" height={60} />
            <Skeleton animation="wave" height={60} />
            <Skeleton animation={false} height={60} />
        </div>
    }

    if (blogData.length == 0) {
        return <div>
            <div className="text-red-500 text-center py-5 font-semibold text-xl bg-slate-100 font-serif">
                <h3> Blogs Information Not found..</h3>
            </div>
        </div>
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Cover</TableCell>
                            <TableCell colSpan={2}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {blogData.map((blog) => (
                            <TableRow key={blog.id}>
                                <TableCell>{blog.id}</TableCell>
                                <TableCell>{blog.title}</TableCell>
                                <TableCell>{parse(blog.description.slice(0, 100))}....</TableCell>
                                <TableCell>{blog.category}</TableCell>
                                <TableCell>
                                    <img
                                        src={blog.cover_img}
                                        alt="Cover Image"
                                        height={50}
                                        width={50}
                                    // style={{ maxWidth: "100px" }}
                                    />
                                </TableCell>
                                <TableCell colSpan={2}>
                                    <div className="flex justify-center gap-2">
                                        <IconButton aria-label="edit" >
                                            <Link to={`/dashboard/edit-blog/${blog.id}`}><Edit /></Link>
                                        </IconButton>
                                        <IconButton aria-label="delete">
                                            <button onClick={() => handleDelete(blog.id)}>
                                                <Delete />
                                            </button>
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <ToastContainer />
        </div>
    );
}

export default UserBlogList;
