import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { highlightText } from "../../utils/highlightText";
import { createTemplate } from "../../api/createTemplate";

/* =======================
   Types
======================= */

type DetectedField = {
  id: string;
  rawText: string;
  field_key: string;
  label: string;
  field_type: "text" | "date" | "number";
  is_required: boolean;
  paragraph_index?: number;
  start?: number;
  end?: number;
};

export default function DocumentPreview() {
  const navigate = useNavigate();
  const location = useLocation();

  const parsedText: string[] = location.state?.parsedText || [];
  const uploadId: string | null = location.state?.uploadId || null;

  /* =======================
     Local State (Step 3)
  ======================= */

  const [detectedFields, setDetectedFields] = useState<DetectedField[]>([
    {
      id: "f1",
      rawText: "{{Director Name}}",
      field_key: "director_name",
      label: "Director Name",
      field_type: "text",
      is_required: true,
    },
    {
      id: "f2",
      rawText: "{{Letter Date}}",
      field_key: "letter_date",
      label: "Letter Date",
      field_type: "date",
      is_required: true,
    },
  ]);

  if (!parsedText.length || !uploadId) {
    return <div className="p-8">No preview data found.</div>;
  }

  /* =======================
     Helpers
  ======================= */

  const buildBackendFields = () => {
    return detectedFields.map((field) => ({
      field_key: field.field_key,
      label: field.label,
      field_type: field.field_type,
      is_required: field.is_required,
      source_temp_id: field.id,
      location_json: {
        version: 1,
        kind: "range_in_text",
        pattern: "detected",
        scope: "body",
        paragraph_index: field.paragraph_index ?? 0,
        start: field.start ?? 0,
        end: field.end ?? 10,
      },
    }));
  };

  const handleCreateTemplate = async () => {
    if (!uploadId) {
      alert("Upload ID missing.");
      return;
    }

    try {
      const payload = {
        upload_id: uploadId,
        name: "Director Resignation Letter",
        description: "Resignation letter for Director/MD/WTD",
        fields: buildBackendFields(),
      };

      console.log("[Template] Payload:", payload);

      const result = await createTemplate(payload);
      console.log("[Template] Created:", result);

      // alert(`Template created successfully (ID: ${result.template_id})`);
      navigate(`/generate/${result.template_id}`, {
  state: {
    fields: detectedFields.map((f) => ({
      field_key: f.field_key,
      label: f.label,
      field_type: f.field_type,
      is_required: f.is_required,
    })),
  },
});

    } catch (err) {
      console.error("[Template] Creation failed:", err);
      alert("Template creation failed");
    }
  };

  /* =======================
     UI
  ======================= */

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">Document Preview</h2>

        <button
          onClick={() => navigate("/upload")}
          className="px-4 py-2 border rounded"
        >
          Back
        </button>
      </div>

      {/* Preview */}
      <div className="border rounded bg-white p-6 shadow-sm max-h-[70vh] overflow-y-auto space-y-3">
        {parsedText.map((text, index) => (
          <p key={index} className="text-sm leading-relaxed">
            {highlightText(text)}
          </p>
        ))}
      </div>

      {/* Template Fields */}
      {detectedFields.length > 0 && (
        <div className="mt-10 rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            Template Fields
          </h3>

          <div className="space-y-4">
            {detectedFields.map((field) => (
              <div
                key={field.id}
                className="grid grid-cols-4 gap-4 items-center border-b pb-3"
              >
                <input
                  value={field.label}
                  onChange={(e) =>
                    setDetectedFields((prev) =>
                      prev.map((f) =>
                        f.id === field.id
                          ? { ...f, label: e.target.value }
                          : f
                      )
                    )
                  }
                  className="border px-2 py-1 rounded"
                />

                <select
                  value={field.field_type}
                  onChange={(e) =>
                    setDetectedFields((prev) =>
                      prev.map((f) =>
                        f.id === field.id
                          ? {
                              ...f,
                              field_type: e.target.value as any,
                            }
                          : f
                      )
                    )
                  }
                  className="border px-2 py-1 rounded"
                >
                  <option value="text">Text</option>
                  <option value="date">Date</option>
                  <option value="number">Number</option>
                </select>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={field.is_required}
                    onChange={(e) =>
                      setDetectedFields((prev) =>
                        prev.map((f) =>
                          f.id === field.id
                            ? {
                                ...f,
                                is_required: e.target.checked,
                              }
                            : f
                        )
                      )
                    }
                  />
                  Required
                </label>

                <input
                  value={field.field_key}
                  readOnly
                  className="border px-2 py-1 rounded bg-gray-100"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Template */}
      {detectedFields.length > 0 && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleCreateTemplate}
            className="px-6 py-2 rounded-md bg-black text-white hover:bg-black/80"
          >
            Create Template
          </button>
        </div>
      )}
    </>
  );
}
