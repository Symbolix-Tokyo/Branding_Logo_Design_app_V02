import React from "react";
import Watermark from "./Watermark";
import { P02HeaderBand } from "./P02HeaderBand";
import { P02Footer } from "./P02Footer";

export type ProjectDataCover = {
  clientName: string;
  dateText: string;
  docTitleRight: string;

  coverTitle?: string;
  coverSubTitle?: string;

  conceptImages: [
    string, string, string,
    string, string, string
  ];

  pageNoText: string;
};

export default function CoverPage({
  data,
  watermark,
}: {
  data: ProjectDataCover;
  watermark: boolean;
}) {
  const PAGE = { W: 297, H: 210 };

  // 全体の微調整（最後に触る用）
  const SHIFT = { allY: 0 };

  // 6枚グリッド（とりあえず綺麗に収まる設計。最後にmm微調整前提）
  const GRID = {
    x: 22.67,          // 左余白（P02系に合わせ）
    y: 52.0,           // ヘッダー下からの開始
    w: 297 - 22.67 * 2,
    gap: 6.0,
    cols: 3,
    rows: 2,
    radius: 2.5,
    bg: "#F2F2F2",
  };

  // 2段×3列の各セルサイズ
  const cellW = (GRID.w - GRID.gap * (GRID.cols - 1)) / GRID.cols;
  const cellH = (115.0 - GRID.gap) / 2; // ←ここは最後に微調整しやすいよう固定値にしてます

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: `${PAGE.W}mm`,
        height: `${PAGE.H}mm`,
        background: "#fff",
      }}
    >
      {watermark && <Watermark enabled={watermark} />}

      {/* ✅ 共通ヘッダー */}
      <P02HeaderBand
        clientName={data.clientName}
        dateText={data.dateText}
        docTitleRight={data.docTitleRight}
      />

      {/* ===== Coverタイトル（任意） ===== */}
      {data.coverTitle && (
        <div
          style={{
            position: "absolute",
            left: `${GRID.x}mm`,
            top: `${36 + SHIFT.allY}mm`,
            fontSize: "16pt",
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "#6a6a6a",
            whiteSpace: "nowrap",
          }}
        >
          {data.coverTitle}
        </div>
      )}
      {data.coverSubTitle && (
        <div
          style={{
            position: "absolute",
            left: `${GRID.x}mm`,
            top: `${44 + SHIFT.allY}mm`,
            fontSize: "10pt",
            fontWeight: 400,
            letterSpacing: "0.18em",
            color: "#8a8a8a",
            whiteSpace: "nowrap",
          }}
        >
          {data.coverSubTitle}
        </div>
      )}

      {/* ===== 6枚グリッド ===== */}
      <div
        style={{
          position: "absolute",
          left: `${GRID.x}mm`,
          top: `${GRID.y + SHIFT.allY}mm`,
          width: `${GRID.w}mm`,
          height: "120mm",
        }}
      >
        {data.conceptImages.map((src, i) => {
          const col = i % GRID.cols;
          const row = Math.floor(i / GRID.cols);

          const left = col * (cellW + GRID.gap);
          const top = row * (cellH + GRID.gap);

          return (
            <div
              key={src + i}
              style={{
                position: "absolute",
                left: `${left}mm`,
                top: `${top}mm`,
                width: `${cellW}mm`,
                height: `${cellH}mm`,
                borderRadius: `${GRID.radius}mm`,
                overflow: "hidden",
                background: GRID.bg,
              }}
            >
              <img
                src={src}
                alt={`concept-${i + 1}`}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // ✅ 縦横比固定（トリミングで揃う）
                }}
              />
            </div>
          );
        })}
      </div>

      {/* ✅ 共通フッター */}
      <P02Footer pageNo={data.pageNoText} />
    </div>
  );
}