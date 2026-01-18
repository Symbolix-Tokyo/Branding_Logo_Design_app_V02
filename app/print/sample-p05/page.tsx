"use client";

import { useEffect, useState } from "react";
import { PdfPage } from "@/components/pdf/PdfPage";
import CoverPage from "@/components/pdf/CoverPage";
import Concept04Page from "@/components/pdf/Concept04Page";
import { ProjectData, convertToLegacyCoverData, convertToConcept04Data, createDefaultProjectData } from "@/types/ProjectData";
import type { PdfData } from "@/design/spec";

export default function SampleP05PrintPage() {
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
      <Concept04Page data={convertToConcept04Data(data)} watermark={watermark} />
    </PdfPage>
  );
}