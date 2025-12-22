export async function uploadTemplate(file: File) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No access token found");
  }

  const formData = new FormData();
  formData.append("file", file);

  console.log("[Upload] Uploading file:", file.name);

  const response = await fetch(
    "https://goods.abisexport.com/legit/templates/parse",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // ❌ DO NOT set Content-Type
      },
      body: formData,
    }
  );

  console.log("[Upload] Response status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[Upload] Error response:", errorText);
    throw new Error("File upload failed");
  }

  const data = await response.json();
  console.log("[Upload] Upload success response:", data);

  return data;
}
