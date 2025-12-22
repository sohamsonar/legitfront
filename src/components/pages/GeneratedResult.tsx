import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

/* =======================
   Types
======================= */

type GenerateResult = {
  generated_id: number;
  template_id: number;
  download_url: string;
  pdf_url: string;
};

export default function GeneratedResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const result: GenerateResult | null = location.state || null;

  /* =======================
     Guards
  ======================= */

  if (!result) {
    return (
      <div className="p-8 space-y-4">
        <h2 className="text-lg font-semibold text-red-600">
          No generated document data found
        </h2>
        <button
          onClick={() => navigate("/upload")}
          className="px-4 py-2 border rounded"
        >
          Go back to Upload
        </button>
      </div>
    );
  }

  /* =======================
     Secure Download (API 6)
  ======================= */

  const downloadFile = async (url: string, filename: string) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("Authentication token missing. Please login again.");
      return;
    }

    try {
      const response = await axios.get(
        `https://goods.abisexport.com${url}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download file");
    }
  };

  /* =======================
     UI
  ======================= */

  return (
    <>
      <h1 className="text-xl font-bold mb-6">
        Document Generated Successfully
      </h1>

      <div className="rounded-lg border bg-white p-6 shadow-sm space-y-4">
        <div className="text-sm text-gray-600">
          <p>
            <strong>Template ID:</strong> {result.template_id}
          </p>
          <p>
            <strong>Generated ID:</strong> {result.generated_id}
          </p>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={() =>
              downloadFile(result.download_url, "document.docx")
            }
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Download DOCX
          </button>

          <button
            onClick={() =>
              downloadFile(result.pdf_url, "document.pdf")
            }
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Download PDF
          </button>
        </div>

        <div className="pt-6 flex gap-4">
          <button
            onClick={() => navigate("/upload")}
            className="px-4 py-2 rounded bg-black text-white hover:bg-black/80"
          >
            Upload New Document
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded"
          >
            Generate Again
          </button>
        </div>
      </div>
    </>
  );
}
