import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import StatCard from "../components/stats/StatCard";
import { DataGrid } from "@mui/x-data-grid";
import { deleteAPost, fetchAllForDashboard } from "../URLs/Urls";
import { successMessage, failureMessage } from "../URLs/Toasts";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import loader from "../assets/loader.json";
import Lottie from "lottie-react";

const Stats = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const reads = useSelector((store) => store?.user?.user?.reads);
  //Table logic
  const columns = [
    { field: "id", headerName: "Id", width: 150 },
    {
      field: "postTitle",
      headerName: "Title",
      width: 200,
    },
    {
      field: "category",
      headerName: "Category",
      width: 120,
    },
    {
      field: "DOC",
      headerName: "DOC",
      type: "number",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      // type: "number",
      width: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <button
              className="mr-1 px-3 py-1 border rounded-md hover:bg-gray-300"
              onClick={() => handleEditButtonClick(params.row.id)}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 border rounded-md hover:bg-gray-300"
              onClick={() => handleDeleteButtonClick(params.row.id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  //Delete button logic
  const handleDeleteButtonClick = async (id) => {
    console.log(id);
    if (!id) return;
    let response = await fetch(deleteAPost(id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    response = await response.json();
    console.log(response);
    response.success == true && successMessage("Successfully deleted post");
    response.success == false && failureMessage("Error deleting post");
  };
  //Edit button logic
  const handleEditButtonClick = async (id) => {
    navigate(`/dashboard/write?id=${id}&editing=true`);
  };
  //Posts fetching logic
  useEffect(() => {
    const fetchAllPosts = async () => {
      let response = await fetch(fetchAllForDashboard, {
        headers: {
          method: "GET",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      response = await response.json();
      console.log(response);
      response.success === true && setPosts(response.posts);
      response.success === false && failureMessage("Error fetching post");
      setLoading(false);
    };
    fetchAllPosts();
  }, []);

  return (
    <>
      <section className="stats px-4 lg:px-8 py-4 mx-1  my-1 md:my-0 -z-40">
        <div className="rounded-lg bg-gray-300 p-3">
          <div>
            <h1 className="text-2xl font-medium">Hot Statistics</h1>
          </div>
          <div className="flex items-center justify-between py-4 gap-2 flex-wrap ">
            <StatCard text="Posts" number={posts?.length || 0} />
            <StatCard text="Reads" number={reads} />
            <StatCard text="Subscribers" number={120} />
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-medium my-1">All Posts</h2>
          <div style={{ height: 300, width: "100%" }}>
            {posts.length > 0 ? (
              <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={posts}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  checkboxSelection
                  disableRowSelectionOnClick
                />
              </Box>
            ) : (
              <div className="grid place-items-center h-full">
                {loading ? (
                  <div className="text-center">
                    <Lottie animationData={loader} />
                  </div>
                ) : (
                  posts.length == 0 && <p>You haven't published any posts</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Stats;
