import { saveAPost } from "../../../URLs/Urls";

export const PostSave = async (id) => {
  let response = await fetch(saveAPost(id), {
    headers: {
      method: "PATCH",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  response = await response.json();
  console.log(response);
  return response;
};
