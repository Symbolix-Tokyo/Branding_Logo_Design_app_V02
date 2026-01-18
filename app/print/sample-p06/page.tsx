"use client";

import { PdfPage } from "../../../components/pdf/PdfPage";
import Concept05Page from "../../../components/pdf/Concept05Page";
import { ProjectDataP06 } from "../../../components/pdf/Concept05Page";
import sampleDataP06 from "../../../.tmp/projects/sample-p06.json";

export default function Page() {
  return (
    <PdfPage>
      <Concept05Page data={sampleDataP06 as ProjectDataP06} watermark={false} />
    </PdfPage>
  );
}