"use client";

import { useEffect, useState } from "react";
import { PdfPage } from "@/components/pdf/PdfPage";
import CoverPage, { ProjectData as CoverProjectData } from "@/components/pdf/CoverPage";
import Concept01Pages from "@/components/pdf/Concept01Pages";
import { ProjectData } from "@/components/pdf/Concept01Page";

export default function PrintPage() {
  const [data, setData] = useState<ProjectData | null>(null);
  const [watermark, setWatermark] = useState(false);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setWatermark(sp.get("watermark") === "1");

    (async () => {
      const res = await fetch(`/api/project?projectId=sample`);
      const json = await res.json();
      setData(json.data as ProjectData);
    })();
  }, []);

  if (!data) return null;

  return (
    <PdfPage>
      <CoverPage data={data as unknown as CoverProjectData} watermark={watermark} />
      <Concept01Pages data={data} watermark={watermark} />
    </PdfPage>
  );
}