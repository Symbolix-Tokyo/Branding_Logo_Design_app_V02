"use client";

import { useEffect, useState } from "react";
import { PdfPage } from "@/components/pdf/PdfPage";
import CoverPage from "@/components/pdf/CoverPage";
import Concept03Page, { ProjectDataP04 } from "@/components/pdf/Concept03Page";
import type { PdfData } from "@/design/spec";

export default function SampleP04PrintPage() {
  const [data, setData] = useState<ProjectDataP04 | null>(null);
  const [watermark, setWatermark] = useState(false);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setWatermark(sp.get("watermark") === "1");

    (async () => {
      const res = await fetch(`/api/project?projectId=sample-p04&t=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`Failed to load: ${res.status}`);
      }
      const json = await res.json();
      setData(json.data as ProjectDataP04);
      
      // Playwright待機用
      (window as any).__PRINT_READY__ = true;
    })();
  }, []);

  if (!data) return null;

  return (
    <PdfPage>
      <CoverPage data={data} watermark={watermark} />
      <Concept03Page data={data} watermark={watermark} />
    </PdfPage>
  );
}