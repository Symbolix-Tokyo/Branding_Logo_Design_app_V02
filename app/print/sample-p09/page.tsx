"use client";

import { PdfPage } from "../../../components/pdf/PdfPage";
import VisualDesign03Page from "../../../components/pdf/VisualDesign03Page";
import { ProjectDataP09 } from "../../../components/pdf/VisualDesign03Page";
import sampleDataP09 from "../../../.tmp/projects/sample-p09.json";

export default function Page() {
  return (
    <PdfPage>
      <VisualDesign03Page data={sampleDataP09 as ProjectDataP09} watermark={false} />
    </PdfPage>
  );
}