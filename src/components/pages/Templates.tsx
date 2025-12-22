import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getTemplates } from "../../api/getTemplates";

type Template = {
  template_id: number;
  name: string;
  fields_count?: number;
  created_at?: string;
};

export default function Templates() {
  const navigate = useNavigate();

  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await getTemplates();
        console.log("[Templates]", data);
        setTemplates(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load templates");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) {
    return <div>Loading templates...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <h1 className="text-xl font-bold mb-6">Templates</h1>

      {templates.length === 0 ? (
        <div className="text-muted-foreground">
          No templates found.
        </div>
      ) : (
        <div className="rounded-lg border bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Fields</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {templates.map((template) => (
                <tr
                  key={template.template_id}
                  className="border-b last:border-none"
                >
                  <td className="px-4 py-3">
                    {template.name}
                  </td>

                  <td className="px-4 py-3">
                    {template.fields_count ?? "-"}
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() =>
                        navigate(`/generate/${template.template_id}`)
                      }
                      className="px-3 py-1 rounded border hover:bg-gray-100"
                    >
                      Generate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
