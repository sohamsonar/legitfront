// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// import { highlightText } from "../../utils/highlightText";
// import { createTemplate } from "../../api/createTemplate";

// /* =======================
//    Types
// ======================= */

// type DetectedField = {
//   id: string;
//   rawText: string;
//   field_key: string;
//   label: string;
//   field_type: "text" | "date" | "number";
//   is_required: boolean;
//   paragraph_index?: number;
//   start?: number;
//   end?: number;
// };

// export default function DocumentPreview() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const parsedText: string[] = location.state?.parsedText || [];
//   const uploadId: string | null = location.state?.uploadId || null;

//   /* =======================
//      Local State (Step 3)
//   ======================= */

//   const [detectedFields, setDetectedFields] = useState<DetectedField[]>([
//     {
//       id: "f1",
//       rawText: "{{Director Name}}",
//       field_key: "director_name",
//       label: "Director Name",
//       field_type: "text",
//       is_required: true,
//     },
//     {
//       id: "f2",
//       rawText: "{{Letter Date}}",
//       field_key: "letter_date",
//       label: "Letter Date",
//       field_type: "date",
//       is_required: true,
//     },
//   ]);

//   if (!parsedText.length || !uploadId) {
//     return <div className="p-8">No preview data found.</div>;
//   }

//   /* =======================
//      Helpers
//   ======================= */

//   const buildBackendFields = () => {
//     return detectedFields.map((field) => ({
//       field_key: field.field_key,
//       label: field.label,
//       field_type: field.field_type,
//       is_required: field.is_required,
//       source_temp_id: field.id,
//       location_json: {
//         version: 1,
//         kind: "range_in_text",
//         pattern: "detected",
//         scope: "body",
//         paragraph_index: field.paragraph_index ?? 0,
//         start: field.start ?? 0,
//         end: field.end ?? 10,
//       },
//     }));
//   };

//   const handleCreateTemplate = async () => {
//     if (!uploadId) {
//       alert("Upload ID missing.");
//       return;
//     }

//     try {
//       const payload = {
//         upload_id: uploadId,
//         name: "Director Resignation Letter",
//         description: "Resignation letter for Director/MD/WTD",
//         fields: buildBackendFields(),
//       };

//       console.log("[Template] Payload:", payload);

//       const result = await createTemplate(payload);
//       console.log("[Template] Created:", result);

//       // alert(`Template created successfully (ID: ${result.template_id})`);
//       navigate(`/generate/${result.template_id}`, {
//   state: {
//     fields: detectedFields.map((f) => ({
//       field_key: f.field_key,
//       label: f.label,
//       field_type: f.field_type,
//       is_required: f.is_required,
//     })),
//   },
// });

//     } catch (err) {
//       console.error("[Template] Creation failed:", err);
//       alert("Template creation failed");
//     }
//   };

//   /* =======================
//      UI
//   ======================= */

//   return (
//     <>
//       <div className="mb-6 flex justify-between items-center">
//         <h2 className="text-xl font-bold">Document Preview</h2>

//         <button
//           onClick={() => navigate("/upload")}
//           className="px-4 py-2 border rounded"
//         >
//           Back
//         </button>
//       </div>

//       {/* Preview */}
//       <div className="border rounded bg-white p-6 shadow-sm max-h-[70vh] overflow-y-auto space-y-3">
//         {parsedText.map((text, index) => (
//           <p key={index} className="text-sm leading-relaxed">
//             {highlightText(text)}
//           </p>
//         ))}
//       </div>

//       {/* Template Fields */}
//       {detectedFields.length > 0 && (
//         <div className="mt-10 rounded-lg border bg-white p-6 shadow-sm">
//           <h3 className="text-lg font-semibold mb-4">
//             Template Fields
//           </h3>

//           <div className="space-y-4">
//             {detectedFields.map((field) => (
//               <div
//                 key={field.id}
//                 className="grid grid-cols-4 gap-4 items-center border-b pb-3"
//               >
//                 <input
//                   value={field.label}
//                   onChange={(e) =>
//                     setDetectedFields((prev) =>
//                       prev.map((f) =>
//                         f.id === field.id
//                           ? { ...f, label: e.target.value }
//                           : f
//                       )
//                     )
//                   }
//                   className="border px-2 py-1 rounded"
//                 />

//                 <select
//                   value={field.field_type}
//                   onChange={(e) =>
//                     setDetectedFields((prev) =>
//                       prev.map((f) =>
//                         f.id === field.id
//                           ? {
//                               ...f,
//                               field_type: e.target.value as any,
//                             }
//                           : f
//                       )
//                     )
//                   }
//                   className="border px-2 py-1 rounded"
//                 >
//                   <option value="text">Text</option>
//                   <option value="date">Date</option>
//                   <option value="number">Number</option>
//                 </select>

//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={field.is_required}
//                     onChange={(e) =>
//                       setDetectedFields((prev) =>
//                         prev.map((f) =>
//                           f.id === field.id
//                             ? {
//                                 ...f,
//                                 is_required: e.target.checked,
//                               }
//                             : f
//                         )
//                       )
//                     }
//                   />
//                   Required
//                 </label>

//                 <input
//                   value={field.field_key}
//                   readOnly
//                   className="border px-2 py-1 rounded bg-gray-100"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Create Template */}
//       {detectedFields.length > 0 && (
//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={handleCreateTemplate}
//             className="px-6 py-2 rounded-md bg-black text-white hover:bg-black/80"
//           >
//             Create Template
//           </button>
//         </div>
//       )}
//     </>
//   );
// }

// Soham New Update 22/12/2025
// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { createTemplate } from "../../api/createTemplate";

// /* =======================
//    Types
// ======================= */

// type DetectedField = {
//   id: string;
//   placeholder: string;
//   field_key: string;
//   label: string;
//   field_type: "text" | "date" | "number";
//   is_required: boolean;
//   paragraph_index: number;
// };

// /* =======================
//    Field Registry
// ======================= */

// const FIELD_REGISTRY = [
//   {
//     field_key: "llp_name",
//     label: "LLP Name",
//     field_type: "text" as const,
//     is_required: true,
//     patterns: [/llp name/i],
//   },
//   {
//     field_key: "registered_office",
//     label: "Registered Office Address",
//     field_type: "text" as const,
//     is_required: true,
//     patterns: [/registered office/i, /office address/i],
//   },
//   {
//     field_key: "date",
//     label: "Date",
//     field_type: "date" as const,
//     is_required: true,
//     patterns: [/\bdate\b/i],
//   },
// ];

// /* =======================
//    Component
// ======================= */

// export default function DocumentPreview() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const parsedText: string[] = location.state?.parsedText || [];
//   const uploadId: string | null = location.state?.uploadId || null;

//   const [detectedFields, setDetectedFields] = useState<DetectedField[]>([]);
//   const [formData, setFormData] = useState<Record<string, string>>({});

//   if (!parsedText.length || !uploadId) {
//     return <div className="p-8">No preview data found.</div>;
//   }

//   /* =======================
//      Detect Fields
//   ======================= */

//   useEffect(() => {
//     const fields: DetectedField[] = [];
//     let counter = 1;

//     parsedText.forEach((text, paragraphIndex) => {
//       const normalized = text.toLowerCase();

//       FIELD_REGISTRY.forEach((reg) => {
//         const matched = reg.patterns.some((p) => p.test(normalized));
//         if (!matched) return;

//         const placeholder = `{{${reg.field_key}_${counter}}}`;

//         fields.push({
//           id: `f_${counter}`,
//           placeholder,
//           field_key: reg.field_key,
//           label: reg.label,
//           field_type: reg.field_type,
//           is_required: reg.is_required,
//           paragraph_index: paragraphIndex,
//         });

//         counter++;
//       });

//       // Fallback blank detection
//       const blanks = text.match(/_{3,}/g);
//       if (!blanks) return;

//       blanks.forEach(() => {
//         const placeholder = `{{custom_${counter}}}`;

//         fields.push({
//           id: `f_${counter}`,
//           placeholder,
//           field_key: `custom_${counter}`,
//           label: `Custom Field ${counter}`,
//           field_type: "text",
//           is_required: false,
//           paragraph_index: paragraphIndex,
//         });

//         counter++;
//       });
//     });

//     setDetectedFields(fields);
//   }, [parsedText]);

//   /* =======================
//      Render Helpers
//   ======================= */

//   const renderParagraph = (text: string, index: number) => {
//     let content = text;

//     detectedFields
//       .filter((f) => f.paragraph_index === index)
//       .forEach((field) => {
//         content = content.replace(
//           /_{3,}|\bdate\b|\bllp name\b|\bregistered office\b/i,
//           field.placeholder
//         );
//       });

//     const parts = content.split(/(\{\{.*?\}\})/g);

//     return parts.map((part, i) => {
//       const field = detectedFields.find((f) => f.placeholder === part);
//       if (!field) return part;

//       return (
//         <span
//           key={i}
//           className={`px-1 rounded font-medium ${
//             formData[field.field_key]
//               ? "bg-green-100 text-green-800"
//               : "bg-yellow-100 text-yellow-800"
//           }`}
//         >
//           {formData[field.field_key] || field.label}
//         </span>
//       );
//     });
//   };

//   /* =======================
//      Backend Payload
//   ======================= */

//   const buildBackendFields = () =>
//     detectedFields.map((f) => ({
//       field_key: f.field_key,
//       label: f.label,
//       field_type: f.field_type,
//       is_required: f.is_required,
//       source_temp_id: f.id,
//       location_json: {
//         version: 1,
//         kind: "pattern_match",
//         paragraph_index: f.paragraph_index,
//       },
//     }));

//   const handleCreateTemplate = async () => {
//     const result = await createTemplate({
//       upload_id: uploadId,
//       name: "Generated Template",
//       description: "Auto-generated from document",
//       fields: buildBackendFields(),
//     });

//     navigate(`/generate/${result.template_id}`, {
//       state: {
//         fields: detectedFields,
//       },
//     });
//   };

//   /* =======================
//      UI
//   ======================= */

//   return (
//     <>
//       <h2 className="text-xl font-bold mb-4">Document Preview</h2>

//       <div className="border rounded bg-white p-6 max-h-[60vh] overflow-y-auto space-y-3">
//         {parsedText.map((text, index) => (
//           <p key={index} className="text-sm leading-relaxed">
//             {renderParagraph(text, index)}
//           </p>
//         ))}
//       </div>

//       {/* ✅ Fill Data – FIXED */}
//       {detectedFields.length > 0 && (
//         <div className="mt-8 border rounded bg-white p-6">
//           <h3 className="text-lg font-semibold mb-4">Fill Data</h3>

//           <div className="space-y-4">
//             {detectedFields.map((field) => (
//               <div key={field.id}>
//                 <label className="block text-sm font-medium mb-1">
//                   {field.label}
//                 </label>
//                 <input
//                   type={field.field_type}
//                   value={formData[field.field_key] || ""}
//                   onChange={(e) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       [field.field_key]: e.target.value,
//                     }))
//                   }
//                   className="w-full border rounded px-3 py-2 text-sm"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {detectedFields.length > 0 && (
//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={handleCreateTemplate}
//             className="px-6 py-2 bg-black text-white rounded"
//           >
//             Create Template
//           </button>
//         </div>
//       )}
//     </>
//   );
// }


// Soham New Update 23/12/2025
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createTemplate } from "../../api/createTemplate";

/* =======================
   Types
======================= */

type FieldOccurrence = {
  paragraph_index: number;
};

type DetectedField = {
  field_key: string;
  label: string;
  field_type: "text" | "date";
  is_required: boolean;
  occurrences: FieldOccurrence[];
};

type FieldRegistryItem = {
  field_key: string;
  label: string;
  field_type: "text" | "date";
  is_required: boolean;
  patterns: RegExp[];
};

/* =======================
   FIELD REGISTRY
   (Logical fields, not blanks)
======================= */

const FIELD_REGISTRY: FieldRegistryItem[] = [
  {
    field_key: "registrar_office_address",
    label: "Registrar Office Address",
    field_type: "text",
    is_required: true,
    patterns: [/the registrar of llp/i],
  },
  {
    field_key: "llp_name",
    label: "LLP Name",
    field_type: "text",
    is_required: true,
    patterns: [/llp/i, /private limited/i],
  },
  {
    field_key: "srn_number",
    label: "SRN Number",
    field_type: "text",
    is_required: true,
    patterns: [/srn filed for incorporation/i],
  },
  {
    field_key: "registered_office_address",
    label: "Registered Office Address",
    field_type: "text",
    is_required: true,
    patterns: [
      /registered office/i,
      /these premises/i,
      /register this address/i,
    ],
  },
  {
    field_key: "designated_partner_name",
    label: "Designated Partner Name",
    field_type: "text",
    is_required: true,
    patterns: [/designated partner/i, /leased to mr/i],
  },
  {
    field_key: "place",
    label: "Place",
    field_type: "text",
    is_required: true,
    patterns: [/place:/i],
  },
  {
    field_key: "date",
    label: "Date",
    field_type: "date",
    is_required: true,
    patterns: [/date:/i],
  },
];

/* =======================
   Helper
======================= */

const getRegistryItem = (key: string) =>
  FIELD_REGISTRY.find((r) => r.field_key === key);

/* =======================
   Component
======================= */

export default function DocumentPreview() {
  const navigate = useNavigate();
  const location = useLocation();

  const parsedText: string[] = location.state?.parsedText || [];
  const uploadId: string | null = location.state?.uploadId || null;

  const [detectedFields, setDetectedFields] = useState<DetectedField[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});

  if (!parsedText.length || !uploadId) {
    return <div className="p-8">No preview data found.</div>;
  }

  /* =======================
     FIELD DETECTION
     (Semantic, deduplicated)
  ======================= */

  useEffect(() => {
    const fieldMap = new Map<string, DetectedField>();

    parsedText.forEach((paragraph, index) => {
      const normalized = paragraph.toLowerCase();

      FIELD_REGISTRY.forEach((reg) => {
        const matched = reg.patterns.some((p) => p.test(normalized));
        if (!matched) return;

        if (!fieldMap.has(reg.field_key)) {
          fieldMap.set(reg.field_key, {
            field_key: reg.field_key,
            label: reg.label,
            field_type: reg.field_type,
            is_required: reg.is_required,
            occurrences: [],
          });
        }

        fieldMap.get(reg.field_key)!.occurrences.push({
          paragraph_index: index,
        });
      });
    });

    setDetectedFields(Array.from(fieldMap.values()));
  }, [parsedText]);

  /* =======================
     PREVIEW RENDERING
  ======================= */

  const renderParagraph = (text: string, index: number) => {
    let content = text;

    detectedFields.forEach((field) => {
      const occursHere = field.occurrences.some(
        (o) => o.paragraph_index === index
      );
      if (!occursHere) return;

      const registry = getRegistryItem(field.field_key);
      if (!registry) return;

      registry.patterns.forEach((pattern) => {
        content = content.replace(pattern, `{{${field.field_key}}}`);
      });
    });

    const parts = content.split(/(\{\{.*?\}\})/g);

    return parts.map((part, i) => {
      const field = detectedFields.find(
        (f) => `{{${f.field_key}}}` === part
      );

      if (!field) return part;

      return (
        <span
          key={i}
          className={`px-1 rounded font-medium ${
            formData[field.field_key]
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {formData[field.field_key] || field.label}
        </span>
      );
    });
  };

  /* =======================
     BACKEND PAYLOAD
  ======================= */

  const buildBackendFields = () =>
    detectedFields.map((f) => ({
      field_key: f.field_key,
      label: f.label,
      field_type: f.field_type,
      is_required: f.is_required,
      occurrences: f.occurrences,
    }));

  const handleCreateTemplate = async () => {
    try {
      const result = await createTemplate({
        upload_id: uploadId,
        name: "Legal LLP Template",
        description: "Semantic template generated from document",
        fields: buildBackendFields(),
      });

      navigate(`/generate/${result.template_id}`, {
        state: { fields: detectedFields },
      });
    } catch (err) {
      console.error(err);
      alert("Template creation failed");
    }
  };

  /* =======================
     UI
  ======================= */

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Document Preview</h2>

      {/* Preview */}
      <div className="border rounded bg-white p-6 max-h-[60vh] overflow-y-auto space-y-3">
        {parsedText.map((text, index) => (
          <p key={index} className="text-sm leading-relaxed">
            {renderParagraph(text, index)}
          </p>
        ))}
      </div>

      {/* Fill Data */}
      {detectedFields.length > 0 && (
        <div className="mt-8 border rounded bg-white p-6">
          <h3 className="text-lg font-semibold mb-4">Client Details</h3>

          <div className="space-y-4">
            {detectedFields.map((field) => (
              <div key={field.field_key}>
                <label className="block text-sm font-medium mb-1">
                  {field.label}
                </label>
                <input
                  type={field.field_type}
                  value={formData[field.field_key] || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field.field_key]: e.target.value,
                    }))
                  }
                  className="w-full border rounded px-3 py-2 text-sm"
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
            className="px-6 py-2 rounded-md bg-black text-white"
          >
            Create Template
          </button>
        </div>
      )}
    </>
  );
}
