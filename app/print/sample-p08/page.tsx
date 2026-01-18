"use client";

import { PdfPage } from "../../../components/pdf/PdfPage";
import VisualDesign02Page from "../../../components/pdf/VisualDesign02Page";
import { ProjectDataP08 } from "../../../components/pdf/VisualDesign02Page";
import sampleDataP08 from "../../../.tmp/projects/sample-p08.json";

export default function Page() {
  return (
    <PdfPage>
      <VisualDesign02Page data={sampleDataP08 as ProjectDataP08} watermark={false} />
    </PdfPage>
  );
}