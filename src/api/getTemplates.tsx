import axios from "axios";

export async function getTemplates() {
  const res = await axios.get(
    "https://goods.abisexport.com/legit/templates",
    {
      withCredentials: true, // for refresh cookie
    }
  );

  return res.data;
}
