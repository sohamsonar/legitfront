import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

/* =======================
   Types
======================= */

type Field = {
  field_key: string;
  label: string;
  field_type: "text" | "date" | "number";
  is_required: boolean;
};

export default function GenerateDocument() {
  const { templateId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Fields passed from DocumentPreview
  const fields: Field[] = location.state?.fields || [];

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  if (!templateId || fields.length === 0) {
    return <div className="p-8">No template data found.</div>;
  }

  /* =======================
     Handlers
  ======================= */

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("Access token missing");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `https://goods.abisexport.com/legit/templates/${templateId}/generate-docx`,
        {
          data: formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // ✅ API 5.2 — move to Generated Result page
      navigate("/generated", {
        state: res.data,
      });
    } catch (err) {
      console.error("API 5.1 FAILED:", err);
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     UI
  ======================= */

  return (
    <>
      <h1 className="text-xl font-bold mb-6">Generate Document</h1>

      <div className="rounded-lg border bg-white p-6 shadow-sm space-y-4">
        {fields.map((field) => (
          <div key={field.field_key}>
            <label className="block text-sm font-medium mb-1">
              {field.label}
              {field.is_required && " *"}
            </label>

            <input
              type={field.field_type}
              required={field.is_required}
              value={formData[field.field_key] || ""}
              onChange={(e) =>
                handleChange(field.field_key, e.target.value)
              }
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
        ))}

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-4 px-6 py-2 rounded-md bg-black text-white hover:bg-black/80 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Document"}
        </button>
      </div>
    </>
  );
}
