import React from "react";

const patterns = [
  /\{\{.*?\}\}/g,        // {{ field }}
  /<<.*?>>/g,            // << field >>
  /\[.*?\]/g,            // [ field ]
  /\b\d{2}\/\d{2}\/\d{4}\b/g, // dd/mm/yyyy
  /\b\d{4}-\d{2}-\d{2}\b/g,   // yyyy-mm-dd
  /₹\s?\d+(?:,\d{3})*/g,      // ₹ amounts
  /\$\s?\d+(?:,\d{3})*/g      // $ amounts
];

export function highlightText(text: string) {
  let parts: React.ReactNode[] = [text];

  patterns.forEach((pattern) => {
    parts = parts.flatMap((part) => {
      if (typeof part !== "string") return [part];

      const matches = part.split(pattern);
      const found = part.match(pattern);

      if (!found) return [part];

      const result: React.ReactNode[] = [];
      matches.forEach((segment, i) => {
        result.push(segment);
        if (found[i]) {
          console.log("[Field Detected]", found[i]);
          result.push(
            <span
              key={`${found[i]}-${i}`}
              className="bg-yellow-200 text-black px-1 rounded"
            >
              {found[i]}
            </span>
          );
        }
      });

      return result;
    });
  });

  return parts;
}
