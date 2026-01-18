"use client";

import { useEffect, useState } from "react";
import { PdfPage } from "@/components/pdf/PdfPage";
import CoverPage from "@/components/pdf/CoverPage";
import Concept03Page from "@/components/pdf/Concept03Page";
import { ProjectData, convertToLegacyCoverData, convertToConcept03Data, createDefaultProjectData } from "@/types/ProjectData";
import type { PdfData } from "@/design/spec";

export default function SampleP04PrintPage() {
  const [data, setData] = useState<ProjectData | null>(null);
  const [watermark, setWatermark] = useState(false);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setWatermark(sp.get("watermark") === "1");

    setData(createDefaultProjectData());
    
    // Playwright待機用
    (window as any).__PRINT_READY__ = true;
  }, []);

  if (!data) return null;

  return (
    <PdfPage>
      <CoverPage data={convertToLegacyCoverData(data)} watermark={watermark} />
      <Concept03Page data={convertToConcept03Data(data)} watermark={watermark} />
    </PdfPage>
  );
}