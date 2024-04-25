const baseURL = "http://localhost:3002";

const authURLs = `${baseURL}/auth`;
export const login = `${authURLs}/login`;

const postURLs = `${baseURL}/post`;
export const create = (value) => `${postURLs}/create?draft=${value}`;
export const fetchAll = `${postURLs}/all`;
export const deleteAPost = (id) => `${postURLs}/delete/${id}`;
export const saveAPost = (id) => `${postURLs}/save/${id}`;
export const savedPosts = `${postURLs}/saved`;
export const fetchSinglePost = (id) => `${postURLs}/${id}`;
export const updateSinglePost = (id) => `${postURLs}/update/${id}`;
export const updateSinglePostWithFile = (id) =>
  `${postURLs}/updateWithFile/${id}`;
export const fetchTrending = `${postURLs}/trending`;
export const searchPosts = (query) => `${postURLs}/search?q=${query}`;
export const categoryPosts = (category) => `${postURLs}/category/${category}`;
export const fetchAllForDashboard = `${postURLs}/allPosts`;

const userURLS = `${baseURL}/user`;
export const fetchUserData = `${userURLS}/fetch`;
export const createUser = `${userURLS}/create`;
export const updateUserData = `${userURLS}/update`;
export const updateUserPicture = `${userURLS}/updateProfilePicture`;

export const headers = {
  "Content-Type": "application/json",
  credentials: "include",
};
