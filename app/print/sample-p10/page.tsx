"use client";

import { PdfPage } from "../../../components/pdf/PdfPage";
import VisualDesign04Page from "../../../components/pdf/VisualDesign04Page";
import { ProjectDataP10 } from "../../../components/pdf/VisualDesign04Page";
import sampleDataP10 from "../../../.tmp/projects/sample-p10.json";

export default function Page() {
  return (
    <PdfPage>
      <VisualDesign04Page data={sampleDataP10 as ProjectDataP10} watermark={false} />
    </PdfPage>
  );
}