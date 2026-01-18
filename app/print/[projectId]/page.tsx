"use client";

import { PdfPage } from "@/components/pdf/PdfPage";
import CoverContent from "@/components/cover/CoverContent";

export default function PrintPage({ params }: { params: { projectId: string } }) {
  // sampleページのみ対応（新しいCoverContentレイアウト）
  if (params.projectId !== 'sample') {
    return <div>Page not found</div>;
  }

  return (
    <PdfPage>
      <CoverContent />
    </PdfPage>
  );
}