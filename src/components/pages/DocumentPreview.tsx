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
// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { createTemplate } from "../../api/createTemplate";

// /* =======================
//    Types
// ======================= */

// type DetectedField = {
//   id: string;
//   rawText?: string;
//   field_key: string;
//   label: string;
//   field_type: "text" | "date" | "number";
//   is_required: boolean;
//   paragraph_index: number;
//   start: number;
//   end: number;
//   value: string;
// };

// /* =======================
//    Component
// ======================= */

// export default function DocumentPreview() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   /* =======================
//      Read navigation state
//   ======================= */

//   const parsedText: string[] = location.state?.parsedText || [];
//   const uploadId: string | null = location.state?.uploadId || null;
//   const incomingFields: DetectedField[] =
//     location.state?.detectedFields || [];

//   /* =======================
//      Guard
//   ======================= */

//   if (!parsedText.length || !uploadId) {
//     return <div className="p-8">No data found.</div>;
//   }

//   /* =======================
//      Local editable state
//   ======================= */

//   const [fields, setFields] = useState<DetectedField[]>(
//     incomingFields.map((f) => ({
//       ...f,
//       label: f.label || "Text",
//       value: f.value ?? "",
//     }))
//   );

//   /* =======================
//      Preview Renderer
//   ======================= */

//   const renderParagraphWithFields = (
//     text: string,
//     paragraphIndex: number
//   ) => {
//     const paragraphFields = fields
//       .filter((f) => f.paragraph_index === paragraphIndex)
//       .sort((a, b) => a.start - b.start);

//     if (paragraphFields.length === 0) return text;

//     let cursor = 0;
//     const parts: React.ReactNode[] = [];

//     paragraphFields.forEach((field) => {
//       // text before field
//       parts.push(
//         <span key={`${field.id}-before`}>
//           {text.slice(cursor, field.start)}
//         </span>
//       );

//       // field input
//       parts.push(
//         <input
//           key={field.id}
//           value={field.value}
//           placeholder={field.label}
//           onChange={(e) =>
//             setFields((prev) =>
//               prev.map((f) =>
//                 f.id === field.id
//                   ? { ...f, value: e.target.value }
//                   : f
//               )
//             )
//           }
//           className="inline-block min-w-[160px] px-2 py-0.5 mx-1
//                      border border-blue-500 rounded bg-blue-50
//                      focus:outline-none focus:ring-2 focus:ring-blue-300"
//         />
//       );

//       cursor = field.end;
//     });

//     // remaining text
//     parts.push(
//       <span key="after">{text.slice(cursor)}</span>
//     );

//     return parts;
//   };

//   /* =======================
//      Actions
//   ======================= */

//  const handleNext = async () => {
//   try {
//     const result = await createTemplate({
//       upload_id: uploadId,
//       name: "Generated Template",
//       description: "Auto-generated from document",
//       fields: fields.map((f) => ({
//         field_key: f.field_key,
//         label: f.label,
//         field_type: f.field_type,
//         is_required: f.is_required,
//         source_temp_id: f.id,
//         location_json: {
//           version: 1,
//           kind: "range_in_text",
//           paragraph_index: f.paragraph_index,
//           start: f.start,
//           end: f.end,
//         },
//       })),
//     });

//     // 👉 OPTION A: Go to templates list
//     navigate("/templates");

//     // 👉 OPTION B (recommended UX): go directly to generate
//     // navigate(`/generate/${result.template_id}`);

//   } catch (err) {
//     console.error("Template creation failed", err);
//     alert("Failed to create template");
//   }
// };


//   /* =======================
//      UI
//   ======================= */

//   return (
//     <div className="space-y-10">
//       {/* Header */}
//       <div>
//         <h2 className="text-xl font-bold mb-1">
//           Document Preview
//         </h2>
//         <p className="text-sm text-muted-foreground">
//           Review detected fields and edit values
//         </p>
//       </div>

//       {/* Document Preview */}
//       <div className="rounded-lg border bg-white p-6 shadow-sm">
//         <div className="space-y-3 max-h-[60vh] overflow-y-auto">
//           {parsedText.map((text, index) => (
//             <p
//               key={index}
//               className="text-sm text-gray-800 leading-relaxed"
//             >
//               {renderParagraphWithFields(text, index)}
//             </p>
//           ))}
//         </div>
//       </div>

//       {/* Field Configuration */}
//       {fields.length > 0 && (
//         <div className="rounded-lg border bg-white p-6 shadow-sm">
//           <h3 className="text-lg font-semibold mb-4">
//             Template Fields
//           </h3>

//           <div className="space-y-4">
//             {fields.map((field) => (
//               <div
//                 key={field.id}
//                 className="grid grid-cols-4 gap-4 items-center border-b pb-3"
//               >
//                 {/* Label */}
//                 <input
//                   value={field.label}
//                   onChange={(e) =>
//                     setFields((prev) =>
//                       prev.map((f) =>
//                         f.id === field.id
//                           ? { ...f, label: e.target.value }
//                           : f
//                       )
//                     )
//                   }
//                   className="border px-2 py-1 rounded"
//                 />

//                 {/* Type */}
//                 <select
//                   value={field.field_type}
//                   onChange={(e) =>
//                     setFields((prev) =>
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

//                 {/* Required */}
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={field.is_required}
//                     onChange={(e) =>
//                       setFields((prev) =>
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

//                 {/* Key */}
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

//       {/* Footer */}
//       <div className="flex justify-end">
//         <button
//           onClick={handleNext}
//           className="px-6 py-2 bg-black text-white rounded"
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// }


// Soham New Update 24/12/2025 - 0.2

// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { createTemplate } from "../../api/createTemplate";

// /* =======================
//    Types
// ======================= */

// type DetectedField = {
//   id: string;
//   rawText?: string;
//   field_key: string;
//   label: string;
//   field_type: "text" | "date" | "number";
//   is_required: boolean;
//   paragraph_index: number;
//   start: number;
//   end: number;
//   value: string;
// };

// /* =======================
//    Component
// ======================= */

// export default function DocumentPreview() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   /* =======================
//      Read navigation state
//   ======================= */

//   const parsedText: string[] = location.state?.parsedText || [];
//   const uploadId: string | null = location.state?.uploadId || null;
//   const incomingFields: DetectedField[] =
//     location.state?.detectedFields || [];

//   /* =======================
//      Guard
//   ======================= */

//   if (!parsedText.length || !uploadId) {
//     return <div className="p-8">No data found.</div>;
//   }

//   /* =======================
//      Local editable state
//   ======================= */

//   const [fields, setFields] = useState<DetectedField[]>(
//     incomingFields.map((f) => ({
//       ...f,
//       label: f.label || "Text",
//       value: f.value ?? "",
//     }))
//   );

//   /* =======================
//      Preview Renderer (FIXED)
//   ======================= */

// const renderParagraphWithFields = (
//   text: string,
//   paragraphIndex: number
// ) => {
//   const paragraphFields = fields
//     .filter((f) => f.paragraph_index === paragraphIndex)
//     .sort((a, b) => a.start - b.start);

//   if (paragraphFields.length === 0) return text;

//   const nodes: React.ReactNode[] = [];
//   let cursor = 0;

//   paragraphFields.forEach((field, i) => {
//     // text before field
//     if (cursor < field.start) {
//       nodes.push(
//         <span key={`text-${i}`}>
//           {text.slice(cursor, field.start)}
//         </span>
//       );
//     }

//     // input field
//     nodes.push(
//       <input
//         key={`field-${field.id}`}
//         value={field.value}
//         placeholder={field.label}
//         onChange={(e) =>
//           setFields((prev) =>
//             prev.map((f) =>
//               f.id === field.id
//                 ? { ...f, value: e.target.value }
//                 : f
//             )
//           )
//         }
//         className="inline-block min-w-[160px] px-2 py-0.5 mx-1
//                    border border-blue-500 rounded bg-blue-50
//                    focus:outline-none focus:ring-2 focus:ring-blue-300"
//       />
//     );

//     cursor = field.end;
//   });

//   // remaining text after last field
//   if (cursor < text.length) {
//     nodes.push(
//       <span key="text-end">
//         {text.slice(cursor)}
//       </span>
//     );
//   }

//   return nodes;
// };


//   /* =======================
//      Actions
//   ======================= */

//   const handleNext = async () => {
//     try {
//       await createTemplate({
//         upload_id: uploadId,
//         name: "Generated Template",
//         description: "Auto-generated from document",
//         fields: fields.map((f) => ({
//           field_key: f.field_key,
//           label: f.label,
//           field_type: f.field_type,
//           is_required: f.is_required,
//           source_temp_id: f.id,
//           location_json: {
//             version: 1,
//             kind: "range_in_text",
//             paragraph_index: f.paragraph_index,
//             start: f.start,
//             end: f.end,
//           },
//         })),
//       });

//       navigate("/templates");
//     } catch (err) {
//       console.error("Template creation failed", err);
//       alert("Failed to create template");
//     }
//   };

//   /* =======================
//      UI
//   ======================= */

//   return (
//     <div className="space-y-10">
//       {/* Header */}
//       <div>
//         <h2 className="text-xl font-bold mb-1">
//           Document Preview
//         </h2>
//         <p className="text-sm text-muted-foreground">
//           Review detected fields and edit values
//         </p>
//       </div>

//       {/* Document Preview */}
//       <div className="rounded-lg border bg-white p-6 shadow-sm">
//         <div className="space-y-3 max-h-[60vh] overflow-y-auto">
//           {parsedText.map((text, index) => (
//             <p
//               key={index}
//               className="text-sm text-gray-800 leading-relaxed"
//             >
//               {renderParagraphWithFields(text, index)}
//             </p>
//           ))}
//         </div>
//       </div>

//       {/* Field Configuration */}
//       {fields.length > 0 && (
//         <div className="rounded-lg border bg-white p-6 shadow-sm">
//           <h3 className="text-lg font-semibold mb-4">
//             Template Fields
//           </h3>

//           <div className="space-y-4">
//             {fields.map((field) => (
//               <div
//                 key={field.id}
//                 className="grid grid-cols-4 gap-4 items-center border-b pb-3"
//               >
//                 <input
//                   value={field.label}
//                   onChange={(e) =>
//                     setFields((prev) =>
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
//                     setFields((prev) =>
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
//                       setFields((prev) =>
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

//       {/* Footer */}
//       <div className="flex justify-end">
//         <button
//         type="button"
//           onClick={handleNext}
//           className="px-6 py-2 bg-black text-white rounded"
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// }


// Test

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createTemplate } from "../../api/createTemplate";

/* =======================
   Types
======================= */

type DetectedField = {
  id: string;
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
  const navigate = useNavigate();
  const location = useLocation();

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

  if (!parsedText.length || !uploadId || !incomingFields.length) {
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
    const paragraphFields = fields
      .filter((f) => f.paragraph_index === paragraphIndex)
      .sort((a, b) => a.start - b.start);

    if (paragraphFields.length === 0) return text;

    const nodes: React.ReactNode[] = [];
    let cursor = 0;

    paragraphFields.forEach((field) => {
      // text before field
      if (cursor < field.start) {
        nodes.push(
          <span key={`${field.id}-text`}>
            {text.slice(cursor, field.start)}
          </span>
        );
      }

      // inline input
      nodes.push(
        <input
          key={field.id}
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

      cursor = field.end;
    });

    // remaining text
    if (cursor < text.length) {
      nodes.push(
        <span key="end">{text.slice(cursor)}</span>
      );
    }

    return nodes;
  };

  /* =======================
     Create Template → Redirect
  ======================= */

  const handleCreateTemplate = async () => {
    try {
      setIsSaving(true);

      const result = await createTemplate({
        upload_id: uploadId,
        name: "Auto Generated Template",
        description: "Generated from uploaded document",
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

      // ✅ DIRECT NEXT STEP — NO TEMPLATE PAGE
      navigate(`/generate/${result.template_id}`, {
        state: {
          fields: fields.map((f) => ({
            field_key: f.field_key,
            label: f.label,
            field_type: f.field_type,
            is_required: f.is_required,
          })),
        },
      });
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
          Review detected fields and continue
        </p>
      </div>

      {/* Preview */}
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

      {/* Footer */}
      <div className="flex justify-end">
        <button
          onClick={handleCreateTemplate}
          disabled={isSaving}
          className="px-6 py-2 bg-black text-white rounded disabled:opacity-60"
        >
          {isSaving ? "Creating..." : "Continue"}
        </button>
      </div>
    </div>
  );
}
