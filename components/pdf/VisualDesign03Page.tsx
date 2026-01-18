import React from "react";
import Watermark from "./Watermark";
import { P02HeaderBand } from "./P02HeaderBand";
import { P02Footer } from "./P02Footer";

export type ProjectDataP09 = {
  clientName: string;
  dateText: string;
  docTitleRight: string;

  // セクション
  sectionJp: string; // 例：ステーショナリー
  sectionEn: string; // 例：NEW LOGO VISUAL
  designLabel: string; // 例：VISUAL DESIGN-03

  // 画像（合成済みモックアップ 1枚）
  mockupImage: string; // 例："/images/stationery_mockup.png"

  // ページ表記
  pageNoText: string; // "P09"
};

export default function VisualDesign03Page({
  data,
  watermark,
}: {
  data: ProjectDataP09;
  watermark: boolean;
}) {
  // =========================================================
  // ✅ P09：テンプレ固定レイアウト（触るのは data のみ）
  // =========================================================
  const PAGE = { W: 297, H: 210 };

  // 全体微調整（最後に 1〜2mm 詰めたい時だけ）
  const SHIFT = { allY: -7 };

  // 見出し（P04/P05/P07/P08 系のスタイル踏襲）
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

  // 画像枠（XD寸法）
  const PHOTO = {
    leftX: 53.06,
    topY: 60,
    w: 204.57,
    h: 139.28,
    labelTopOffset: -10.0, // 「Image Photo」位置
  };

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

      {/* ヘッダー（共通） */}
      <P02HeaderBand
        clientName={data.clientName}
        dateText={data.dateText}
        docTitleRight={data.docTitleRight}
      />

      {/* 左上の見出し（designLabel / sectionJp / sectionEn） */}
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

      {/* ===== モックアップ画像（1枚） ===== */}
      <div
        style={{
          position: "absolute",
          left: `${PHOTO.leftX}mm`,
          top: `${PHOTO.topY + SHIFT.allY}mm`,
          width: `${PHOTO.w}mm`,
          height: `${PHOTO.h}mm`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "0mm",
            top: `${PHOTO.labelTopOffset}mm`,
            width: "100%",
            textAlign: "center",
            fontSize: "10pt",
            color: "#9a9a9a",
            letterSpacing: "0.06em",
          }}
        >
          Image Photo
        </div>

        <img
          src={data.mockupImage}
          alt="stationery mockup"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            background: "#eee",
          }}
        />
      </div>

      {/* フッター（共通） */}
      <P02Footer pageNo={data.pageNoText} />
    </div>
  );
}