import React from "react";
import Watermark from "./Watermark";
import { P02HeaderBand } from "./P02HeaderBand";
import { P02Footer } from "./P02Footer";

export type ProjectDataP10 = {
  clientName: string;
  dateText: string;
  docTitleRight: string;

  // セクション
  designLabel: string; // "VISUAL DESIGN-04"
  sectionJp: string;   // "サイン看板"
  sectionEn: string;   // "NEW LOGO VISUAL"

  // 画像（public/images 配下）
  signImage01: string; // "/images/sign_01.jpg"
  signImage02: string; // "/images/sign_02.jpg"
  signImage03: string; // "/images/sign_03.jpg"

  pageNoText: string; // "P10"
};

export default function VisualDesign04Page({
  data,
  watermark,
}: {
  data: ProjectDataP10;
  watermark: boolean;
}) {
  // =========================================================
  // ✅ P10：テンプレ固定レイアウト（触るのは data のみ）
  // =========================================================
  const PAGE = { W: 297, H: 210 };

  // 全体微調整（最後に 1〜2mm 詰めたい時だけ触る）
  const SHIFT = { allY: -7 };

  // 見出し（P07/P08/P09系の踏襲）
  const SECTION = {
    leftX: 22.67,
    topY: 33.26,
    headingFontPt: 10,

    goldLineW: 0.72,
    goldLineH: 14.12,
    goldToTextGap: 3.0,

    jpTopOffset: 8.44,
    jpFontPt: 14,
    enTopOffset: 8.5,
    enFontPt: 10,
  };

  // 画像ブロック（後で手調整OKな想定の初期値）
  const LAYOUT = {
    // 画像群の上端（Image Photo の基準にも使う）
    topY: 58.0,

    // 左カラム（2段）
    leftX: 45.7,
    leftW: 108.2,
    leftH: 68.3,
    leftGapY: 3.8,

    // 右カラム（大きく1枚）
    rightX: 159.0,
    rightW: 108.4,
    rightH: 140.1,

    // ラベル
    imageLabelTopOffset: -9.0,
  };

  const leftTopY = LAYOUT.topY + SHIFT.allY;
  const leftBottomY = leftTopY + LAYOUT.leftH + LAYOUT.leftGapY;
  const rightY = LAYOUT.topY + SHIFT.allY;

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

      {/* ヘッダー共通 */}
      <P02HeaderBand
        clientName={data.clientName}
        dateText={data.dateText}
        docTitleRight={data.docTitleRight}
      />

      {/* 左上の見出し（designLabel） */}
      <div
        style={{
          position: "absolute",
          left: `${SECTION.leftX}mm`,
          top: `${SECTION.topY + SHIFT.allY}mm`,
          fontSize: `${SECTION.headingFontPt}pt`,
          letterSpacing: "0.06em",
          color: "#6a6a6a",
          fontWeight: 500,
          whiteSpace: "nowrap",
          zIndex: 10,
        }}
      >
        {data.designLabel}
      </div>

      {/* 金ライン＋セクション */}
      <div
        style={{
          position: "absolute",
          left: `${SECTION.leftX}mm`,
          top: `${SECTION.topY + SECTION.jpTopOffset + SHIFT.allY}mm`,
          width: `${SECTION.goldLineW}mm`,
          height: `${SECTION.goldLineH}mm`,
          background: "#C9A15A",
          zIndex: 10,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${SECTION.leftX + SECTION.goldLineW + SECTION.goldToTextGap}mm`,
          top: `${SECTION.topY + SECTION.jpTopOffset - 0.3 + SHIFT.allY}mm`,
          fontSize: `${SECTION.jpFontPt}pt`,
          fontWeight: 700,
          color: "#6a6a6a",
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
          zIndex: 10,
        }}
      >
        {data.sectionJp}
      </div>
      <div
        style={{
          position: "absolute",
          left: `${SECTION.leftX + SECTION.goldLineW + SECTION.goldToTextGap}mm`,
          top: `${SECTION.topY + SECTION.jpTopOffset + SECTION.enTopOffset + SHIFT.allY}mm`,
          fontSize: `${SECTION.enFontPt}pt`,
          fontWeight: 400,
          color: "#6a6a6a",
          letterSpacing: "0.18em",
          whiteSpace: "nowrap",
          zIndex: 10,
        }}
      >
        {data.sectionEn}
      </div>

      {/* Image Photo ラベル（画像群の上でセンター寄せ） */}
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: `${LAYOUT.topY + LAYOUT.imageLabelTopOffset + SHIFT.allY}mm`,
          width: `${PAGE.W}mm`,
          textAlign: "center",
          fontSize: "10pt",
          color: "#9a9a9a",
          letterSpacing: "0.06em",
        }}
      >
        Image Photo
      </div>

      {/* ===== 左上：sign_01.jpg ===== */}
      <ImageBox
        src={data.signImage01}
        x={LAYOUT.leftX}
        y={leftTopY}
        w={LAYOUT.leftW}
        h={LAYOUT.leftH}
      />

      {/* ===== 左下：sign_02.jpg ===== */}
      <ImageBox
        src={data.signImage02}
        x={LAYOUT.leftX}
        y={leftBottomY}
        w={LAYOUT.leftW}
        h={LAYOUT.leftH}
      />

      {/* ===== 右：sign_03.jpg ===== */}
      <ImageBox
        src={data.signImage03}
        x={LAYOUT.rightX}
        y={rightY}
        w={LAYOUT.rightW}
        h={LAYOUT.rightH}
      />

      {/* フッター共通 */}
      <P02Footer pageNo={data.pageNoText} />
    </div>
  );
}

function ImageBox({
  src,
  x,
  y,
  w,
  h,
}: {
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}mm`,
        top: `${y}mm`,
        width: `${w}mm`,
        height: `${h}mm`,
        overflow: "hidden",
        background: "#eee",
      }}
    >
      <img
        src={src}
        alt="sign"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover", // ✅ 縦横比固定（枠にフィット）
        }}
      />
    </div>
  );
}