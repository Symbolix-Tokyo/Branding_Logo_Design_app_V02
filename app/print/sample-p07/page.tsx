"use client";

import { PdfPage } from "../../../components/pdf/PdfPage";
import VisualDesign01Page from "../../../components/pdf/VisualDesign01Page";
import { ProjectDataP07 } from "../../../components/pdf/VisualDesign01Page";
import sampleDataP07 from "../../../.tmp/projects/sample-p07.json";

export default function Page() {
  return (
    <PdfPage>
      <VisualDesign01Page data={sampleDataP07 as ProjectDataP07} watermark={false} />
    </PdfPage>
  );
}