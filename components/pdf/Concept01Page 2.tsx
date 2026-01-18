import React from "react";
import Watermark from "./Watermark";

type BrandElement = {
  key: string;
  no: number; // 1..5
  title: string;
  bullets: string[];
  pill: string;
};

export type ProjectData = {
  clientName: string;
  dateText: string;
  docTitleRight: string;
  projectTitleLines: string[];
  projectSubtitle: string;
  stampText: string;
  conceptHeading: string; // "Logo Design / VISUAL CONCEPT-01"
  conceptBody: string;    // 本文（改行あり）
  elements: BrandElement[];
};

export default function Concept01Page({
  data,
  watermark,
  pageNo = "P02",
  creditLeft = "Symbolix Design Estate for DX",
  creditRight = "www.symbolix.co.jp   ©2026 Symbolix Inc.",
}: {
  data: ProjectData;
  watermark: boolean;
  pageNo?: string;
  creditLeft?: string;
  creditRight?: string;
}) {
  // =========================================================
  // ✅ P02：mmレイアウト定数（ここだけ触れば調整できる）
  // =========================================================
  const PAGE = {
    W: 297, // A4横
    H: 210,
  };

  // ページ余白（表紙と揃えるなら 12mm で統一が楽）
  const M = {
    L: 12,
    R: 12,
    T: 12,
    B: 12,
  };

  // 上部見出し～本文ブロック
  const HEADER = {
    titleTop: 22,      // conceptHeading のY
    titleLeft: 12,     // conceptHeading のX
    titleSizePt: 14,
    titleWeight: 700,

    bodyTop: 36,       // 本文のY（長文）
    bodyLeft: 83.16,   // ★あなたの寸法図に合わせて開始Xの初期値
    bodyWidth: 194.74, // ★寸法図にある 194.74mm を採用
    bodySizePt: 9.5,
    bodyLineHeight: 1.7,
    bodyColor: "#555",
  };

  // 5エレメント全体ブロック
  const E5 = {
    wrapLeft: 30.06,    // ★寸法図：左から 30.06mm
    wrapTop: 92,        // ★ここは図からの推定値。ずれたらここを動かす
    wrapWidth: 251.56,  // ★寸法図：全幅 251.56mm
    colW: 45.89,        // ★寸法図：1カラム基準
    gap: 5.54,          // ★寸法図：カラム間
    numberDia: 10,      // ①〜⑤の丸（必要なら調整）
    numberTopOffset: 0, // 番号丸のY微調整
    titleTop: 10,       // 見出しのY（番号からの距離）
    titleSizePt: 12.5,
    titleWeight: 600,
    bulletTop: 20,      // 箇条書き開始Y
    bulletSizePt: 9.8,
    bulletLineHeight: 1.65,
    pillTop: 53,        // ピル開始Y（箇条書きの下）
    pillH: 7.46,        // ★寸法図：7.46mm
    pillRadius: 99,
    pillPadX: 6,
    pillFontPt: 8.5,
    pillBg: "#6B6B6B",
    pillColor: "#fff",
    blockH: 70,         // 5エレメントブロックの高さ（調整用）
  };

  // フッター（ページ番号・クレジット）
  const FOOT = {
    y: PAGE.H - 10, // 下からの余白感（必要なら調整）
    pageLeft: 12,
    creditLeftX: 28,
    creditRightX: 12,
    fontPt: 8.5,
    color: "#777",
  };

  // 5エレメント（不足している場合でも崩れないように 1..5 を固定）
  const elements = normalizeElements(data.elements);

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

      {/* 見出し（Concept Heading） */}
      <div
        style={{
          position: "absolute",
          top: `${HEADER.titleTop}mm`,
          left: `${HEADER.titleLeft}mm`,
          right: `${M.R}mm`,
          fontSize: `${HEADER.titleSizePt}pt`,
          fontWeight: HEADER.titleWeight as any,
          letterSpacing: "0.02em",
          color: "#333",
        }}
      >
        {data.conceptHeading}
      </div>

      {/* 本文（長文） */}
      <div
        style={{
          position: "absolute",
          top: `${HEADER.bodyTop}mm`,
          left: `${HEADER.bodyLeft}mm`,
          width: `${HEADER.bodyWidth}mm`,
          fontSize: `${HEADER.bodySizePt}pt`,
          lineHeight: HEADER.bodyLineHeight,
          color: HEADER.bodyColor,
          whiteSpace: "pre-wrap",
        }}
      >
        {data.conceptBody}
      </div>

      {/* 5エレメント（絶対配置：5カラム固定） */}
      <div
        style={{
          position: "absolute",
          left: `${E5.wrapLeft}mm`,
          top: `${E5.wrapTop}mm`,
          width: `${E5.wrapWidth}mm`,
          height: `${E5.blockH}mm`,
        }}
      >
        {elements.map((el, i) => (
          <ElementCol
            key={el.key || `el-${i + 1}`}
            el={el}
            xMm={i * (E5.colW + E5.gap)}
            colW={E5.colW}
            cfg={E5}
          />
        ))}
      </div>

      {/* フッター：ページ番号＋クレジット（今入れてOKとのことなので実装） */}
      <div
        style={{
          position: "absolute",
          left: `${FOOT.pageLeft}mm`,
          bottom: "6mm",
          fontSize: `${FOOT.fontPt}pt`,
          color: FOOT.color,
          letterSpacing: "0.02em",
        }}
      >
        {pageNo}
      </div>

      <div
        style={{
          position: "absolute",
          left: `${FOOT.creditLeftX}mm`,
          bottom: "6mm",
          fontSize: `${FOOT.fontPt}pt`,
          color: FOOT.color,
          letterSpacing: "0.02em",
        }}
      >
        {creditLeft}
      </div>

      <div
        style={{
          position: "absolute",
          right: `${FOOT.creditRightX}mm`,
          bottom: "6mm",
          fontSize: `${FOOT.fontPt}pt`,
          color: FOOT.color,
          letterSpacing: "0.02em",
          textAlign: "right",
        }}
      >
        {creditRight}
      </div>
    </div>
  );
}

/** 1..5 を必ず返す（不足しても崩れない） */
function normalizeElements(input: BrandElement[]) {
  const byNo = new Map<number, BrandElement>();
  for (const e of input || []) byNo.set(e.no, e);

  const out: BrandElement[] = [];
  for (let no = 1; no <= 5; no++) {
    const e = byNo.get(no);
    out.push(
      e ?? {
        key: `placeholder-${no}`,
        no,
        title: "（未入力）",
        bullets: ["", "", ""].filter(Boolean),
        pill: "",
      }
    );
  }
  return out;
}

function ElementCol({
  el,
  xMm,
  colW,
  cfg,
}: {
  el: BrandElement;
  xMm: number;
  colW: number;
  cfg: any;
}) {
  const bullets = (el.bullets || []).slice(0, 3).filter((s) => s && s.trim());

  return (
    <div
      style={{
        position: "absolute",
        left: `${xMm}mm`,
        top: "0mm",
        width: `${colW}mm`,
        height: "100%",
      }}
    >
      {/* 番号丸 */}
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: `${cfg.numberTopOffset}mm`,
          width: `${cfg.numberDia}mm`,
          height: `${cfg.numberDia}mm`,
          borderRadius: "999px",
          background: "#C9A15A",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          fontSize: "9pt",
        }}
      >
        {el.no}
      </div>

      {/* 見出し */}
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: `${cfg.titleTop}mm`,
          width: `${colW}mm`,
          fontSize: `${cfg.titleSizePt}pt`,
          fontWeight: cfg.titleWeight as any,
          letterSpacing: "0.01em",
          color: "#666",
        }}
      >
        {el.title}
      </div>

      {/* 箇条書き */}
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: `${cfg.bulletTop}mm`,
          width: `${colW}mm`,
          fontSize: `${cfg.bulletSizePt}pt`,
          lineHeight: cfg.bulletLineHeight,
          color: "#777",
        }}
      >
        {bullets.length === 0 ? (
          <div style={{ opacity: 0.25 }}> </div>
        ) : (
          <ul style={{ margin: 0, paddingLeft: "4mm" }}>
            {bullets.map((b, idx) => (
              <li key={idx}>{b}</li>
            ))}
          </ul>
        )}
      </div>

      {/* ピル */}
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: `${cfg.pillTop}mm`,
          width: `${colW}mm`,
          height: `${cfg.pillH}mm`,
          borderRadius: `${cfg.pillRadius}mm`,
          background: cfg.pillBg,
          color: cfg.pillColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: `${cfg.pillPadX}mm`,
          paddingRight: `${cfg.pillPadX}mm`,
          fontSize: `${cfg.pillFontPt}pt`,
          fontWeight: 600,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={el.pill}
      >
        {el.pill}
      </div>
    </div>
  );
}