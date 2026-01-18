"use client";

import { useEffect, useState } from "react";
import { PdfPage } from "@/components/pdf/PdfPage";
import CoverPage from "@/components/pdf/CoverPage";
import Concept04Page, { ProjectDataP05 } from "@/components/pdf/Concept04Page";
import type { PdfData } from "@/design/spec";

export default function SampleP05PrintPage() {
  const [data, setData] = useState<ProjectDataP05 | null>(null);
  const [watermark, setWatermark] = useState(false);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setWatermark(sp.get("watermark") === "1");

    (async () => {
      const res = await fetch(`/api/project?projectId=sample-p05&t=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`Failed to load: ${res.status}`);
      }
      const json = await res.json();
      setData(json.data as ProjectDataP05);
      
      // Playwright待機用
      (window as any).__PRINT_READY__ = true;
    })();
  }, []);

  if (!data) return null;

  return (
    <PdfPage>
      <CoverPage data={data} watermark={watermark} />
      <Concept04Page data={data} watermark={watermark} />
    </PdfPage>
  );
}