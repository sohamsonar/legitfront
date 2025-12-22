// import { useRef, useState } from 'react';
// import { Upload, File, FileCheck, Download, RotateCw } from 'lucide-react';
// import { Button } from './ui/button';
// import { Progress } from './ui/progress';
// import { cn } from './ui/utils';

// interface UploadAreaProps {
//   onFileSelect: (file: File) => void;
//   selectedFile: File | null;
//   isProcessing: boolean;
//   currentStep: 1 | 2 | 3;
//   onReset: () => void;
// }

// export function UploadArea({
//   onFileSelect,
//   selectedFile,
//   isProcessing,
//   currentStep,
//   onReset,
// }: UploadAreaProps) {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isDragging, setIsDragging] = useState(false);
// const [previewUrl, setPreviewUrl] = useState<string | null>(null);


//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//   onFileSelect(file);

//   if (file.type === "application/pdf") {
//     const url = URL.createObjectURL(file);
//     setPreviewUrl(url);
//   }
// }

//   };

//   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setIsDragging(false);
//     const file = event.dataTransfer.files?.[0];
//     if (file) {
//   onFileSelect(file);

//   if (file.type === "application/pdf") {
//     const url = URL.createObjectURL(file);
//     setPreviewUrl(url);
//   }
// }

//   };

//   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   if (currentStep === 1) {
//     return (
//       <div className="bg-card border border-border rounded-xl overflow-hidden">
//         <div className="p-6 border-b border-border">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
//               <Upload className="w-5 h-5 text-primary" />
//             </div>
//             <div>
//               <h3 className="text-foreground">File Tools</h3>
//               <p className="text-sm text-muted-foreground">Upload & convert files</p>
//             </div>
//           </div>
//         </div>

//         <div className="p-8">
//           <div
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             className={cn(
//               'border-2 border-dashed rounded-xl p-12 text-center transition-all',
//               isDragging
//                 ? 'border-primary bg-primary/5'
//                 : 'border-border bg-muted/30'
//             )}
//           >
//             <div className="flex flex-col items-center gap-4">
//               <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
//                 <Upload className="w-8 h-8 text-primary" />
//               </div>
              
//               <div className="space-y-2">
//                 <p className="text-foreground">
//                   Drag and drop a PDF or image file. We'll process it and make it available to download.
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   or drag & drop your file here
//                 </p>
//               </div>
//             <label>
//              <input
//              title='test'
//                 ref={fileInputRef}
//                 type="file"
//                 onChange={handleFileChange}
//                 className="hidden"
//                 accept="image/*,.pdf"
//                 placeholder=''
//               />
//               </label>
 
              
//               <Button
//                 onClick={() => fileInputRef.current?.click()}
//                 size="lg"
//                 className="gap-2"
//               >
//                 <Upload className="w-4 h-4" />
//                 Select a file
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (currentStep === 2) {
//     return (
//       <div className="bg-card border border-border rounded-xl p-8">
//         <div className="max-w-2xl mx-auto">
//           <div className="flex items-start gap-4 mb-6">
//             <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
//               <File className="w-6 h-6 text-primary" />
//             </div>
//             <div className="flex-1 min-w-0">
//               <h3 className="text-foreground mb-1">{selectedFile?.name}</h3>
//               <p className="text-sm text-muted-foreground">
//                 {selectedFile?.size ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : ''}
//               </p>
//             </div>
//           </div>
          


//           <div className="space-y-3">
//             <div className="flex items-center justify-between text-sm">
//               <span className="text-muted-foreground">Processing your file...</span>
//               <span className="text-foreground">75%</span>
//             </div>
//             <Progress value={75} className="h-2" />
//           </div>

//           <div className="mt-6 p-4 bg-muted/50 rounded-lg">
//             <p className="text-sm text-muted-foreground">
//               This may take a few moments depending on the file size.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   const handleReset = () => { 
//   if (previewUrl) {
//     URL.revokeObjectURL(previewUrl);
//   }
//   setPreviewUrl(null);
//   onReset();
// };


//   return (
//     <div className="bg-card border border-border rounded-xl p-8">
//       <div className="max-w-2xl mx-auto text-center">
//         <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
//           <FileCheck className="w-8 h-8 text-green-600" />
//         </div>

//         <h3 className="text-foreground mb-2">File processed successfully!</h3>
//         <p className="text-muted-foreground mb-8">
//           Your file has been processed and is ready to download.
//         </p>

//         <div className="bg-muted/50 rounded-lg p-6 mb-6">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
//               <File className="w-6 h-6 text-primary" />
//             </div>
//             <div className="flex-1 text-left">
//               <h4 className="text-foreground">{selectedFile?.name}</h4>
//               <p className="text-sm text-muted-foreground">
//                 Processed • {selectedFile?.size ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : ''}
//               </p>
//             </div>
//           </div>
//         </div>
//         {/* Preview + progress step 2 */}
//           {previewUrl && (
//   <div className="mt-6 border border-border rounded-lg overflow-hidden h-[500px] bg-background">
//     <iframe
//       src={previewUrl}
//       title="PDF Preview"
//       className="w-full h-full"
//     />
//   </div>
// )}

//         <div className="flex gap-3 justify-center">
//           <Button size="lg" className="gap-2">
//             <Download className="w-4 h-4" />
//             Download file
//           </Button>
//           <Button size="lg" variant="outline" className="gap-2" onClick={handleReset}>

//             <RotateCw className="w-4 h-4" />
//             Upload another
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// 14/12/2025
// import { useRef, useState } from "react";
// import { Upload, File, FileCheck, Download, RotateCw } from "lucide-react";
// //import { Button } from "./ui/button";
// //import { Button } from "./ui/button";
// import { Progress } from "./ui/progress";

// import { cn } from "./ui/utils";
// interface UploadAreaProps {
//   onFileSelect: (file: File) => void;
//   selectedFile: File | null;
//   isProcessing: boolean;
//   currentStep: 1 | 2 | 3;
//   onReset: () => void;
//   onUploadSuccess: () => void; // 👈 ADD THIS
// }


// export function UploadArea({
//   onFileSelect,
//   selectedFile,
//   isProcessing,
//   currentStep,
//   onReset,
//   onUploadSuccess, // 👈 ADD THIS
// }: UploadAreaProps) {
//   const [uploadResult, setUploadResult] = useState<any>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   /* ---------------- File Selection ---------------- */

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     onFileSelect(file);

//     // AFTER upload success
// const handleUploadSuccess = (data: any) => {
//   if (data.preview_pdf_url) {
//     setPreviewUrl(data.preview_pdf_url);
//   }
// };

//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);

//     const file = e.dataTransfer.files?.[0];
//     if (!file) return;

//     onFileSelect(file);

//     // AFTER upload success
// const handleUploadSuccess = (data: any) => {
//   if (data.preview_pdf_url) {
//     setPreviewUrl(data.preview_pdf_url);
//   }
// };

//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => setIsDragging(false);

//   /* ---------------- Upload API ---------------- */

//   const handleUpload = async () => {
    
//     if (!selectedFile || isProcessing) return;
    

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const response = await fetch("/api/legit/templates/parse", {
//   method: "POST",
//   body: formData,
// });



//       if (!response.ok) {
//         throw new Error("Upload failed");
//       }

//       const data = await response.json();
//       setUploadResult(data);
//       console.log("UPLOAD API RESPONSE 👉", data);

//       onUploadSuccess();
//       console.log("Upload success:", data);
//     } catch (error) {
//       console.error("Upload error:", error);
//     }
//   };

//   /* ---------------- Reset ---------------- */

//   const handleReset = () => {
//     if (previewUrl) {
//       URL.revokeObjectURL(previewUrl);
//     }
//     setPreviewUrl(null);
//     onReset();
//   };

//   /* ---------------- STEP 1 : Upload ---------------- */

//   if (currentStep === 1) {
//     return (
//       <div className="bg-card border border-border rounded-xl overflow-hidden">
//         <div className="p-6 border-b border-border">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
//               <Upload className="w-5 h-5 text-primary" />
//             </div>
//             <div>
//               <h3 className="text-foreground">File Tools</h3>
//               <p className="text-sm text-muted-foreground">
//                 Upload & convert files
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="p-8">
//           <div
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             className={cn(
//               "border-2 border-dashed rounded-xl p-12 text-center transition-all",
//               isDragging
//                 ? "border-primary bg-primary/5"
//                 : "border-border bg-muted/30"
//             )}
//           >
//             <div className="flex flex-col items-center gap-4">
//               <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
//                 <Upload className="w-8 h-8 text-primary" />
//               </div>

//               <div className="space-y-2">
//                 <p className="text-foreground">
//                   Drag and drop a document to upload.
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   or select a file from your system
//                 </p>
//               </div>

//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => fileInputRef.current?.click()}
                  
//                   className="gap-2"
//                 >
//                   <Upload className="w-4 h-4" />
//                   Select a file
//                 </button>

//                 {selectedFile && (
//                   <button
//                     onClick={handleUpload}
//                     disabled={isProcessing}
                    
//                   >
//                     {isProcessing ? "Uploading..." : "Upload"}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /* ---------------- STEP 2 : Processing ---------------- */

//   if (currentStep === 2) {
//     return (
//       <div className="bg-card border border-border rounded-xl p-8">
//         <div className="max-w-2xl mx-auto">
//           <div className="flex items-start gap-4 mb-6">
//             <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
//               <File className="w-6 h-6 text-primary" />
//             </div>
//             <div className="flex-1">
//               <h3 className="text-foreground">{selectedFile?.name}</h3>
//               <p className="text-sm text-muted-foreground">
//                 {(selectedFile?.size ?? 0 / 1024 / 1024).toFixed(2)} MB
//               </p>
//             </div>
//           </div>

//           <Progress value={75} className="h-2" />
//         </div>
//       </div>
//     );
//   }

//   /* ---------------- STEP 3 : Success ---------------- */

//   return (
//     <div className="bg-card border border-border rounded-xl p-8 text-center">
//       <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
//         <FileCheck className="w-8 h-8 text-green-600" />
//       </div>

//       <h3 className="text-foreground mb-2">File processed successfully</h3>

//      {previewUrl && (
//   <iframe
//     src={previewUrl}
//     className="w-full h-full"
//   />
// )}


//       <div className="flex gap-3 justify-center mt-6">
//         <button  className="gap-2">
//           <Download className="w-4 h-4" />
//           Download file
//         </button>

//         <button
          
         
//           className="gap-2"
//           onClick={handleReset}
//         >
//           <RotateCw className="w-4 h-4" />
//           Upload another
//         </button>
//       </div>
//     </div>
//   );
// }

//15/12/25
import { useRef, useState } from "react";
import { Upload, File, FileCheck, Download, RotateCw } from "lucide-react";
import { Progress } from "../ui/progress";
import { cn } from "../ui/utils";

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  isProcessing: boolean;
  currentStep: 1 | 2 | 3;
  onReset: () => void;
  onUploadSuccess: () => void;
}

export function UploadArea({
  onFileSelect,
  selectedFile,
  isProcessing,
  currentStep,
  onReset,
  onUploadSuccess,
}: UploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  /* ---------------- File Selection ---------------- */

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  /* ---------------- Upload API ---------------- */

  const handleUpload = async () => {
    if (!selectedFile || isProcessing) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/legit/templates/parse", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      console.log("UPLOAD API RESPONSE 👉", data);

      // 🔥 DOCX PREVIEW (MICROSOFT OFFICE VIEWER)
      if (data.docx_url) {
        setPreviewUrl(data.docx_url);
      }

      onUploadSuccess();
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  /* ---------------- Reset ---------------- */

  const handleReset = () => {
    setPreviewUrl(null);
    onReset();
  };

  /* ---------------- STEP 1 : Upload ---------------- */

  if (currentStep === 1) {
    return (
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Upload className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-foreground">File Tools</h3>
              <p className="text-sm text-muted-foreground">
                Upload & convert files
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={cn(
              "border-2 border-dashed rounded-xl p-12 text-center transition-all",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border bg-muted/30"
            )}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>

              <div className="space-y-2">
                <p className="text-foreground">
                  Drag and drop a document to upload.
                </p>
                <p className="text-sm text-muted-foreground">
                  or select a file from your system
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".docx"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Select a file
                </button>

                {selectedFile && (
                  <button
                    onClick={handleUpload}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Uploading..." : "Upload"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- STEP 2 : Processing ---------------- */

  if (currentStep === 2) {
    return (
      <div className="bg-card border border-border rounded-xl p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <File className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-foreground">{selectedFile?.name}</h3>
              <p className="text-sm text-muted-foreground">
                {((selectedFile?.size ?? 0) / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <Progress value={75} className="h-2" />
        </div>
      </div>
    );
  }

  /* ---------------- STEP 3 : Success ---------------- */

  return (
    <div className="bg-card border border-border rounded-xl p-8 text-center">
      <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <FileCheck className="w-8 h-8 text-green-600" />
      </div>

      <h3 className="text-foreground mb-4">
        File processed successfully
      </h3>

      {previewUrl && (
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            previewUrl
          )}`}
          className="w-full h-[600px] border rounded-lg"
        />
      )}

      <div className="flex gap-3 justify-center mt-6">
        <button className="gap-2">
          <Download className="w-4 h-4" />
          Download file
        </button>

        <button
          className="gap-2"
          onClick={handleReset}
        >
          <RotateCw className="w-4 h-4" />
          Upload another
        </button>
      </div>
    </div>
  );
}
