import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createTemplate } from "../../api/createTemplate";

/* =======================
   Types
======================= */

type DetectedField = {
  id: string;
  rawText?: string;
  field_key: string;
  label: string;
  field_type: "text" | "date" | "number";
  is_required: boolean;
  paragraph_index: number;
  start: number;
  end: number;
  value: string;
};

/* =======================
   Component
======================= */

export default function DocumentPreview() {
  const location = useLocation();
  const navigate = useNavigate();

  /* =======================
     Read navigation state
  ======================= */

  const parsedText: string[] = location.state?.parsedText ?? [];
  const uploadId: string | null = location.state?.uploadId ?? null;
  const incomingFields: DetectedField[] =
    location.state?.detectedFields ?? [];

  /* =======================
     Guard
  ======================= */

  if (!parsedText.length || !uploadId) {
    return (
      <div className="p-8 text-sm text-muted-foreground">
        No preview data found.
      </div>
    );
  }

  /* =======================
     Local editable state
  ======================= */

  const [fields, setFields] = useState<DetectedField[]>(
    incomingFields.map((f) => ({
      ...f,
      label: f.label || "Text",
      value: f.value ?? "",
    }))
  );

  const [isSaving, setIsSaving] = useState(false);

  /* =======================
     Preview Renderer
  ======================= */

  const renderParagraphWithFields = (
    text: string,
    paragraphIndex: number
  ) => {
    const paragraphFields = fields.filter(
      (f) => f.paragraph_index === paragraphIndex
    );

    if (paragraphFields.length === 0) {
      return text;
    }

    let fieldCursor = 0;
    const parts = text.split(/(_{3,})/g);

    return parts.map((part, i) => {
      if (/_{3,}/.test(part) && paragraphFields[fieldCursor]) {
        const field = paragraphFields[fieldCursor];
        fieldCursor++;

        return (
          <input
            key={`${field.id}-${i}`}
            value={field.value}
            placeholder={field.label}
            onChange={(e) =>
              setFields((prev) =>
                prev.map((f) =>
                  f.id === field.id
                    ? { ...f, value: e.target.value }
                    : f
                )
              )
            }
            className="inline-block min-w-[160px] px-2 py-0.5 mx-1
                       border border-blue-500 rounded bg-blue-50
                       focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        );
      }

      return <span key={i}>{part}</span>;
    });
  };

  /* =======================
     Actions
  ======================= */

  const handleCreateTemplate = async () => {
    try {
      setIsSaving(true);

      const result = await createTemplate({
        upload_id: uploadId,
        name: "Generated Template",
        description: "Auto-generated from document",
        fields: fields.map((f) => ({
          field_key: f.field_key,
          label: f.label,
          field_type: f.field_type,
          is_required: f.is_required,
          source_temp_id: f.id,
          location_json: {
            version: 1,
            kind: "range_in_text",
            paragraph_index: f.paragraph_index,
            start: f.start,
            end: f.end,
          },
        })),
      });

      console.log("[Template Created]", result);

      // ✅ SUCCESS FEEDBACK
      alert("Template created successfully");

      // ✅ REDIRECT TO NEXT REAL PAGE
      navigate(`/generate/${result.template_id}`);
    } catch (err) {
      console.error("Template creation failed", err);
      alert("Failed to create template");
    } finally {
      setIsSaving(false);
    }
  };

  /* =======================
     UI
  ======================= */

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold mb-1">
          Document Preview
        </h2>
        <p className="text-sm text-muted-foreground">
          Review detected fields and create a template
        </p>
      </div>

      {/* Document Preview */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {parsedText.map((text, index) => (
            <p
              key={index}
              className="text-sm text-gray-800 leading-relaxed"
            >
              {renderParagraphWithFields(text, index)}
            </p>
          ))}
        </div>
      </div>

      {/* Field Configuration */}
      {fields.length > 0 && (
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            Template Fields
          </h3>

          <div className="space-y-4">
            {fields.map((field) => (
              <div
                key={field.id}
                className="grid grid-cols-4 gap-4 items-center border-b pb-3"
              >
                <input
                  value={field.label}
                  onChange={(e) =>
                    setFields((prev) =>
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
                    setFields((prev) =>
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
                      setFields((prev) =>
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

      {/* Footer */}
      <div className="flex justify-end">
        <button
          onClick={handleCreateTemplate}
          disabled={isSaving}
          className="px-6 py-2 bg-black text-white rounded disabled:opacity-60"
        >
          {isSaving ? "Creating..." : "Create Template"}
        </button>
      </div>
    </div>
  );
}



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { getTemplates } from "../../api/getTemplates";

// type Template = {
//   template_id: number;
//   name: string;
//   fields_count?: number;
//   created_at?: string;
// };

// export default function Templates() {
//   const navigate = useNavigate();

//   const [templates, setTemplates] = useState<Template[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTemplates = async () => {
//       try {
//         const data = await getTemplates();
//         console.log("[Templates]", data);
//         setTemplates(data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load templates");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTemplates();
//   }, []);

//   if (loading) {
//     return <div>Loading templates...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   return (
//     <>
//       <h1 className="text-xl font-bold mb-6">Templates</h1>

//       {templates.length === 0 ? (
//         <div className="text-muted-foreground">
//           No templates found.
//         </div>
//       ) : (
//         <div className="rounded-lg border bg-white shadow-sm">
//           <table className="w-full text-sm">
//             <thead className="border-b bg-gray-50">
//               <tr>
//                 <th className="px-4 py-3 text-left">Name</th>
//                 <th className="px-4 py-3 text-left">Fields</th>
//                 <th className="px-4 py-3 text-left">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {templates.map((template) => (
//                 <tr
//                   key={template.template_id}
//                   className="border-b last:border-none"
//                 >
//                   <td className="px-4 py-3">
//                     {template.name}
//                   </td>

//                   <td className="px-4 py-3">
//                     {template.fields_count ?? "-"}
//                   </td>

//                   <td className="px-4 py-3">
//                     <button
//                       onClick={() =>
//                         navigate(`/generate/${template.template_id}`)
//                       }
//                       className="px-3 py-1 rounded border hover:bg-gray-100"
//                     >
//                       Generate
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </>
//   );
// }
