"use client";

import { useEffect, useState } from "react";
import { PdfPage } from "@/components/pdf/PdfPage";
import CoverPage from "@/components/pdf/CoverPage";
import Concept02Page from "@/components/pdf/Concept02Page";
import { ProjectData, convertToLegacyCoverData, convertToConcept02Data, createDefaultProjectData } from "@/types/ProjectData";

export default function PrintSampleP03Page() {
  const [data, setData] = useState<ProjectData | null>(null);
  const [watermark, setWatermark] = useState(false);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setWatermark(sp.get("watermark") === "1");

    // デフォルトデータを使用（統一ProjectData）
    setData(createDefaultProjectData());
    
    // Playwright待機用
    (window as any).__PRINT_READY__ = true;
  }, []);

  if (!data) return null;

  return (
    <PdfPage>
      <CoverPage data={convertToLegacyCoverData(data)} watermark={watermark} />
      <Concept02Page data={convertToConcept02Data(data)} watermark={watermark} />
    </PdfPage>
  );
}