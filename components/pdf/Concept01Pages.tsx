import React from "react";
import Concept01Page, { ProjectData } from "./Concept01Page";

export default function Concept01Pages({
  data,
  watermark,
}: {
  data: ProjectData;
  watermark: boolean;
}) {
  return (
    <Concept01Page
      data={data}
      watermark={watermark}
    />
  );
}