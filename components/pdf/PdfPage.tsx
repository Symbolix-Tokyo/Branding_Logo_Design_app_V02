import React from "react";
import "@/app/print/print.css";

export function PdfPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="print-stage">
      <div className="page">{children}</div>
    </div>
  );
}