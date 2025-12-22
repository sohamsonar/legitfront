type CreateTemplatePayload = {
  upload_id: string;
  name: string;
  description: string;
  fields: any[];
};

export async function createTemplate(payload: CreateTemplatePayload) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No access token found");
  }

  console.log("[Template] Creating template with payload:", payload);

  const response = await fetch(
    "https://goods.abisexport.com/legit/templates",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  console.log("[Template] Response status:", response.status);

  if (!response.ok) {
    const err = await response.text();
    console.error("[Template] Error response:", err);
    throw new Error("Template creation failed");
  }

  const data = await response.json();
  console.log("[Template] Template created successfully:", data);

  return data;
}
