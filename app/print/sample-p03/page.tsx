"use client";

import { useEffect, useState } from "react";
import { PdfPage } from "@/components/pdf/PdfPage";
import CoverPage from "@/components/pdf/CoverPage";
import Concept02Page from "@/components/pdf/Concept02Page";
import type { PdfData } from "@/design/spec";

// P03用の拡張データ型
interface P03Element {
  key: string;
  no: number;
  title: string;
  bullets: string[];
  pill: string;
  copy: string;
  images: Array<{ src: string; alt: string }>;
}

interface P03Data extends Omit<PdfData, 'elements'> {
  elements: P03Element[];
}

export default function PrintSampleP03Page() {
  const [data, setData] = useState<P03Data | null>(null);
  const [watermark, setWatermark] = useState(false);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setWatermark(sp.get("watermark") === "1");

    (async () => {
      const res = await fetch(`/api/project?projectId=sample-p03&t=${Date.now()}`, { cache: "no-store" });
      const json = await res.json();
      setData(json.data as P03Data);
      
      // Playwright待機用
      (window as any).__PRINT_READY__ = true;
    })();
  }, []);

  if (!data) return null;

  return (
    <PdfPage>
      <CoverPage data={data as unknown as PdfData} watermark={watermark} />
      <Concept02Page data={data} watermark={watermark} />
    </PdfPage>
  );
}