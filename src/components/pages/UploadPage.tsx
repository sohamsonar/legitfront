//Soham - First working program header+ sidebar 
// import { useState } from "react";

// import { Sidebar } from "./Sidebar";
// import { Header } from "./Header";
// import { UploadArea } from "./UploadArea";
// import { ProcessSteps } from "./ProcessSteps";
// import { uploadTemplate } from "../../api/uploadTemplate";
// import { highlightText } from "../../utils/highlightText";
// import { createTemplate } from "../../api/createTemplate";



// export default function UploadPage() {
//   type DetectedField = {
//   id: string;               // frontend only
//   rawText: string;          // detected placeholder text
//   field_key: string;
//   label: string;
//   field_type: "text" | "date" | "number";
//   is_required: boolean;
//   paragraph_index?: number; // later
//   start?: number;
//   end?: number;
// };
//   const [detectedFields, setDetectedFields] = useState<DetectedField[]>([]);

//   const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [isProcessing, setIsProcessing] = useState(false);

//   // ✅ MOVE THIS INSIDE THE COMPONENT
//   const [parsedText, setParsedText] = useState<string[]>([]);
//   const [uploadId, setUploadId] = useState<string | null>(null);


//   const handleFileSelect = async (file: File) => {
//     try {
//       setSelectedFile(file);
//       setCurrentStep(2);
//       setIsProcessing(true);

//       const result = await uploadTemplate(file);

//       console.log("[Upload] Parsed result:", result);

//       const paragraphs =
//         result?.structure?.body?.paragraphs?.map(
//           (p: any) => p.text
//         ) || [];

//       setParsedText(paragraphs);
//       setCurrentStep(3);
//       setUploadId(result.upload_id);
      

//         setDetectedFields([
//   {
//     id: "f1",
//     rawText: "{{Director Name}}",
//     field_key: "director_name",
//     label: "Director Name",
//     field_type: "text",
//     is_required: true,
//   },
//   {
//     id: "f2",
//     rawText: "{{Letter Date}}",
//     field_key: "letter_date",
//     label: "Letter Date",
//     field_type: "date",
//     is_required: true,
//   },
  
// ] 

// );



//     } catch (err) {
//       console.error("[Upload] Upload failed:", err);
//       alert("File upload failed");
//     } finally {
//       setIsProcessing(false);
//     }
//   };
//   const buildBackendFields = () => {
//   return detectedFields.map((field) => ({
//     field_key: field.field_key,
//     label: field.label,
//     field_type: field.field_type,
//     is_required: field.is_required,
//     source_temp_id: field.id,
//     location_json: {
//       version: 1,
//       kind: "range_in_text", // placeholder for now
//       pattern: "detected",
//       scope: "body",
//       paragraph_index: field.paragraph_index ?? 0,
//       start: field.start ?? 0,
//       end: field.end ?? 10,
//     },
//   }));
// };

//   const handleCreateTemplate = async () => {
//   if (!uploadId) {
//     alert("Upload ID missing. Please re-upload document.");
//     return;
//   }

//   try {
//     const payload = {
//       upload_id: uploadId,
//       name: "Director Resignation Letter", // later from input
//       description: "Resignation letter for Director/MD/WTD",
//       fields: buildBackendFields(),
//     };

//     console.log("[Template] Payload:", payload);

//     const result = await createTemplate(payload);

//     console.log("[Template] Created:", result);
//     alert(`Template created successfully (ID: ${result.template_id})`);

//   } catch (err) {
//     console.error("[Template] Creation failed:", err);
//     alert("Template creation failed");
//   }
// };

  


//   const handleReset = () => {
//     setSelectedFile(null);
//     setCurrentStep(1);
//     setIsProcessing(false);
//     setParsedText([]);
//   };

//   return (
//     <div className="flex h-screen bg-background">
//       <Sidebar />

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />

//         <main className="flex-1 overflow-auto">
//           <div className="max-w-6xl mx-auto p-8">
//             <div className="mb-8">
//               <h1 className="text-foreground mb-2">Upload files</h1>
//               <p className="text-muted-foreground">
//                 Upload & convert files
//               </p>
//             </div>

//             <ProcessSteps currentStep={currentStep} />

//             <div className="mt-8">
//               <UploadArea
//                 selectedFile={selectedFile}
//                 onFileSelect={handleFileSelect}
//                 currentStep={currentStep}
//                 isProcessing={isProcessing}
//                 onReset={handleReset}
//                 onUploadSuccess={() => setCurrentStep(3)}
//               />

//               {/* ✅ Document Preview */}
//               {currentStep === 3 && parsedText.length > 0 && (
//                 <div className="mt-10 rounded-lg border bg-white p-6 shadow-sm">
//                   <h3 className="text-lg font-semibold mb-4">
//                     Document Preview
//                   </h3>

//                   <div className="space-y-3 max-h-[400px] overflow-y-auto">
//                     {parsedText.map((text, index) => (
//                       <p
//                         key={index}
//                         className="text-sm text-gray-800 leading-relaxed"
//                       >
//                         {highlightText(text)}
//                       </p>
//                     ))}
//                   </div>
//                 </div>
//               )}
//               {currentStep === 3 && detectedFields.length > 0 && (
//   <div className="mt-10 rounded-lg border bg-white p-6 shadow-sm">
//     <h3 className="text-lg font-semibold mb-4">
//       Template Fields
//     </h3>

//     <div className="space-y-4">
//       {detectedFields.map((field) => (
//         <div
//           key={field.id}
//           className="grid grid-cols-4 gap-4 items-center border-b pb-3"
//         >
//           {/* Label */}
//           <input
//             value={field.label}
//             onChange={(e) =>
//               setDetectedFields((prev) =>
//                 prev.map((f) =>
//                   f.id === field.id
//                     ? { ...f, label: e.target.value }
//                     : f
//                 )
//               )
//             }
//             className="border px-2 py-1 rounded"
//             placeholder="Field Label"
//           />

//           {/* Type */}
//           <select
//             value={field.field_type}
//             onChange={(e) =>
//               setDetectedFields((prev) =>
//                 prev.map((f) =>
//                   f.id === field.id
//                     ? {
//                         ...f,
//                         field_type: e.target.value as any,
//                       }
//                     : f
//                 )
//               )
//             }
//             className="border px-2 py-1 rounded"
//           >
//             <option value="text">Text</option>
//             <option value="date">Date</option>
//             <option value="number">Number</option>
//           </select>

//           {/* Required */}
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={field.is_required}
//               onChange={(e) =>
//                 setDetectedFields((prev) =>
//                   prev.map((f) =>
//                     f.id === field.id
//                       ? { ...f, is_required: e.target.checked }
//                       : f
//                   )
//                 )
//               }
//             />
//             Required
//           </label>

//           {/* Field Key (readonly) */}
//           <input
//             value={field.field_key}
//             readOnly
//             className="border px-2 py-1 rounded bg-gray-100"
//           />
//         </div>
//       ))}
//     </div>
//   </div>

// )}
// {currentStep === 3 && detectedFields.length > 0 && (
//   <div className="mt-6 flex justify-end">
//     <button
//       onClick={handleCreateTemplate}
//       className="px-6 py-2 rounded-md bg-black text-white hover:bg-black/80"
//     >
//       Create Template
//     </button>
//   </div>
// )}



//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// Soham - 18/12/2025
// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// import { UploadArea } from "./UploadArea";
// import { ProcessSteps } from "./ProcessSteps";

// import { uploadTemplate } from "../../api/uploadTemplate";
// // import { createTemplate } from "../../api/createTemplate";
// import { highlightText } from "../../utils/highlightText";

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

// /* =======================
//    Component
// ======================= */

// export default function UploadPage() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isPreviewPage = location.pathname === "/preview";

//   /* =======================
//      State (shared for upload + preview)
//   ======================= */

//   const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(
//     isPreviewPage ? 3 : 1
//   );

//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const [parsedText, setParsedText] = useState<string[]>(
//     location.state?.parsedText || []
//   );

//   // const [uploadId, setUploadId] = useState<string | null>(
//   //   location.state?.uploadId || null
//   // );

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

//   /* =======================
//      Handlers
//   ======================= */

//   const handleFileSelect = async (file: File) => {
//     try {
      
//       setSelectedFile(file);
//       setCurrentStep(2);
//       setIsProcessing(true);

//       const result = await uploadTemplate(file);
//       console.log("[Upload] Parsed result:", result);

//       const paragraphs =
//         result?.structure?.body?.paragraphs?.map((p: any) => p.text) || [];

//       // Store in local state
//       setParsedText(paragraphs);
//       //setUploadId(result.upload_id);
//       setCurrentStep(3);

//       // 👉 Navigate to preview page with same UI
//       navigate("/preview", {
//         state: {
//           parsedText: paragraphs,
//           uploadId: result.upload_id,
//         },
//       });
//     } catch (err) {
//       console.error("[Upload] Upload failed:", err);
//       alert("File upload failed");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleReset = () => {
//     setSelectedFile(null);
//     setParsedText([]);
//     //setUploadId(null);
//     setCurrentStep(1);
//     navigate("/upload");
//   };

//   /* =======================
//      Template helpers
//   ======================= */

//   // const buildBackendFields = () => {
//   //   return detectedFields.map((field) => ({
//   //     field_key: field.field_key,
//   //     label: field.label,
//   //     field_type: field.field_type,
//   //     is_required: field.is_required,
//   //     source_temp_id: field.id,
//   //     location_json: {
//   //       version: 1,
//   //       kind: "range_in_text",
//   //       pattern: "detected",
//   //       scope: "body",
//   //       paragraph_index: field.paragraph_index ?? 0,
//   //       start: field.start ?? 0,
//   //       end: field.end ?? 10,
//   //     },
//   //   }));
//   // };

//   // const handleCreateTemplate = async () => {
//   //   if (!uploadId) {
//   //     alert("Upload ID missing.");
//   //     return;
//   //   }

//   //   try {
//   //     const payload = {
//   //       upload_id: uploadId,
//   //       name: "Director Resignation Letter",
//   //       description: "Resignation letter for Director/MD/WTD",
//   //       fields: buildBackendFields(),
//   //     };

//   //     console.log("[Template] Payload:", payload);

//   //     const result = await createTemplate(payload);
//   //     console.log("[Template] Created:", result);

//   //     alert(`Template created successfully (ID: ${result.template_id})`);
//   //   } catch (err) {
//   //     console.error("[Template] Creation failed:", err);
//   //     alert("Template creation failed");
//   //   }
//   // };

//   /* =======================
//      UI (UNCHANGED)
//   ======================= */

//   return (
//     <>
//       <div className="mb-8">
//         <h1 className="text-foreground mb-2">Upload files</h1>
//         <p className="text-muted-foreground">
//           Upload & convert files
//         </p>
//       </div>

//       <ProcessSteps currentStep={currentStep} />

//       <div className="mt-8">
//         <UploadArea
//           selectedFile={selectedFile}
//           onFileSelect={handleFileSelect}
//           currentStep={currentStep}
//           isProcessing={isProcessing}
//           onReset={handleReset}
//           onUploadSuccess={() => setCurrentStep(3)}
//         />

//         {/* Preview (same UI, new page) */}
//         {currentStep === 3 && parsedText.length > 0 && (
//           <div className="mt-10 rounded-lg border bg-white p-6 shadow-sm">
//             <h3 className="text-lg font-semibold mb-4">
//               Document Preview
//             </h3>

//             <div className="space-y-3 max-h-[400px] overflow-y-auto">
//               {parsedText.map((text, index) => (
//                 <p
//                   key={index}
//                   className="text-sm text-gray-800 leading-relaxed"
//                 >
//                   {highlightText(text)}
//                 </p>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Template Fields */}
//         {currentStep === 3 && detectedFields.length > 0 && (
//           <div className="mt-10 rounded-lg border bg-white p-6 shadow-sm">
//             <h3 className="text-lg font-semibold mb-4">
//               Template Fields
//             </h3>

//             <div className="space-y-4">
//               {detectedFields.map((field) => (
//                 <div
//                   key={field.id}
//                   className="grid grid-cols-4 gap-4 items-center border-b pb-3"
//                 >
//                   <input
//                     value={field.label}
//                     onChange={(e) =>
//                       setDetectedFields((prev) =>
//                         prev.map((f) =>
//                           f.id === field.id
//                             ? { ...f, label: e.target.value }
//                             : f
//                         )
//                       )
//                     }
//                     className="border px-2 py-1 rounded"
//                   />

//                   <select
//                     value={field.field_type}
//                     onChange={(e) =>
//                       setDetectedFields((prev) =>
//                         prev.map((f) =>
//                           f.id === field.id
//                             ? {
//                                 ...f,
//                                 field_type: e.target.value as any,
//                               }
//                             : f
//                         )
//                       )
//                     }
//                     className="border px-2 py-1 rounded"
//                   >
//                     <option value="text">Text</option>
//                     <option value="date">Date</option>
//                     <option value="number">Number</option>
//                   </select>

//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       checked={field.is_required}
//                       onChange={(e) =>
//                         setDetectedFields((prev) =>
//                           prev.map((f) =>
//                             f.id === field.id
//                               ? {
//                                   ...f,
//                                   is_required: e.target.checked,
//                                 }
//                               : f
//                           )
//                         )
//                       }
//                     />
//                     Required
//                   </label>

//                   <input
//                     value={field.field_key}
//                     readOnly
//                     className="border px-2 py-1 rounded bg-gray-100"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

      
//       </div>
//     </>
//   );
// }


// Soham - 23/12/2025


import { useState, type JSX } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { UploadArea } from "./UploadArea";
import { ProcessSteps } from "./ProcessSteps";

import { uploadTemplate } from "../../api/uploadTemplate";

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
  paragraph_index: number;
  start: number;
  end: number;
  value: string;
};

/* =======================
   Component
======================= */

export default function UploadPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isPreviewPage = location.pathname === "/preview";

  /* =======================
     State
  ======================= */

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(
    isPreviewPage ? 3 : 1
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [parsedText, setParsedText] = useState<string[]>(
    location.state?.parsedText || []
  );

  const [detectedFields, setDetectedFields] = useState<DetectedField[]>([]);

  /* =======================
     Handlers
  ======================= */

  const handleFileSelect = async (file: File) => {
    try {
      setSelectedFile(file);
      setCurrentStep(2);
      setIsProcessing(true);

      const result = await uploadTemplate(file);
      console.log("[Upload] Parsed result:", result);

      /* Extract paragraph text */
      const paragraphs: string[] =
        result.structure.body.paragraphs.map((p: any) => p.text);

      /* Extract detected fields */
      const fields: DetectedField[] = result.detected_fields.map((f: any) => ({
        id: f.temp_id,
        rawText: f.match,
        field_key: `field_${f.temp_id}`,
        label: f.suggested_label,
        field_type: "text",
        is_required: true,
        paragraph_index: f.paragraph_index,
        start: f.start,
        end: f.end,
        value: "",
      }));

      setParsedText(paragraphs);
      setDetectedFields(fields);
      setCurrentStep(3);

      navigate("/preview", {
        state: {
          parsedText: paragraphs,
          detectedFields: fields,
          uploadId: result.upload_id,
        },
      });
    } catch (err) {
      console.error("[Upload] Upload failed:", err);
      alert("File upload failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setParsedText([]);
    setDetectedFields([]);
    setCurrentStep(1);
    navigate("/upload");
  };

  /* =======================
     Preview Renderer
  ======================= */

  const renderParagraphWithFields = (text: string, index: number) => {
    const fieldsInParagraph = detectedFields
      .filter((f) => f.paragraph_index === index)
      .sort((a, b) => a.start - b.start);

    if (fieldsInParagraph.length === 0) {
      return text;
    }

    let cursor = 0;
    const parts: JSX.Element[] = [];

    fieldsInParagraph.forEach((field) => {
      parts.push(
        <span key={`${field.id}-before`}>
          {text.slice(cursor, field.start)}
        </span>
      );

      parts.push(
        <input
          key={field.id}
          value={field.value}
          placeholder={field.label}
          onChange={(e) =>
            setDetectedFields((prev) =>
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

    parts.push(
      <span key="after">{text.slice(cursor)}</span>
    );

    return parts;
  };

  /* =======================
     UI
  ======================= */

  return (
    <>
      <div className="mb-8">
        <h1 className="text-foreground mb-2">Upload files</h1>
        <p className="text-muted-foreground">Upload & convert files</p>
      </div>

      <ProcessSteps currentStep={currentStep} />

      <div className="mt-8">
        <UploadArea
          selectedFile={selectedFile}
          onFileSelect={handleFileSelect}
          currentStep={currentStep}
          isProcessing={isProcessing}
          onReset={handleReset}
          onUploadSuccess={() => setCurrentStep(3)}
        />

        {/* Document Preview */}
        {currentStep === 3 && parsedText.length > 0 && (
          <div className="mt-10 rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              Document Preview
            </h3>

            <div className="space-y-3 max-h-[400px] overflow-y-auto">
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
        )}

        {/* Field Configuration */}
        {currentStep === 3 && detectedFields.length > 0 && (
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
      </div>
    </>
  );
}
