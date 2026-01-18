import React from "react";
import Watermark from "./Watermark";
import { P02HeaderBand } from "./P02HeaderBand";
import { P02Footer } from "./P02Footer";

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
  paragraphTop: string;     // ← 段落①
  paragraphBottom: string;  // ← 段落②
  elements: BrandElement[];
};

export default function Concept01Page({
  data,
  watermark,
}: {
  data: ProjectData;
  watermark: boolean;
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
    topLineY: 7.5,
    bandHeight: 11,
    bodyGap: 10, // ←本文までの余白（まず10mmで固定）
  };

  const Y = {
    bandTop: HEADER.topLineY,
    bandBottom: HEADER.topLineY + HEADER.bandHeight, // 18.5
    bodyTop: HEADER.topLineY + HEADER.bandHeight + HEADER.bodyGap, // 28.5
  };

  // ===== 調整用：このページの"本文全体"を上下に動かす =====
  const SHIFT = {
    bodyY: -7, // ← 上〆7mm上げるなら -7（下げるなら +）
  };

  // ===== 上段/下段 段落テキスト（mm） =====
  const PAR = {
    leftX: 83.16,     // ← 指示済みならここ（本文左基準）
    width: 194.74,    // ← 指示済みならここ（本文幅）
    top1Y: 41.0,      // ← 段落①の開始Y（後で微調整）
    top2Y: 65.0,      // ← 段落②の開始Y（後で微調整）
    h1: 20.0,         // 段落①の見た目高さ（mm）
    h2: 15.0,         // 段落②の見た目高さ（mm）
    gap: 4.0,         // ①②の間隔（mm）
    font1Pt: 10.5,    // 段落①
    font2Pt: 8.0,     // 段落②（小さめ）
    lh1: 1.50,
    lh2: 1.60,
    color: "#555",
  };

  // ===== 5カラムPNGの位置調整ツマミ =====
  const E5_BG = {
    top: -12,   // ← PNGのY
    left: 0,    // ← PNGのX
    expandY: 20 // ← 高さを上下に足してる分
  };
  const ALIGN = {
    e5ShiftY: 0
    , // ← 5カラムPNG全体を上下させる（mm）
    // または paragraphShiftY: 0 で段落側を動かしてもOK
    parShiftY: 0,   // ★追加
  };

  // 段落ブロック全体の見た目高さ
  const paragraphBlockTop = PAR.top1Y;
  const paragraphBlockH   = (PAR.top2Y + PAR.h2) - PAR.top1Y;

  // ===== P02 本文の縦基準（mm）ここを固定 =====
  const BASE = {
    bodyLeftX: 22.67,   // 本文 左基準
    bodyTopY: 33.26,    // 本文 上基準（"Logo Design / VISUAL..."の上端）
    goldLineW: 0.72,
    goldLineH: 14.12,
    gapAfterHeading: 8.44,
    goldToTextGap: 3.0, // ゴールド線→テキストの間（必要なら微調整）
  };

  // 見出し（Logo Design / VISUAL...）
  const headingStyle: React.CSSProperties = {
    position: "absolute",
    left: `${BASE.bodyLeftX}mm`,
    top: `${BASE.bodyTopY}mm`,
    fontSize: "10pt",
    letterSpacing: "0.06em",
    color: "#6a6a6a",
    fontWeight: 500,
    zIndex: 2,
    whiteSpace: "nowrap",
  };

  // セクション（ゴールド線＋日本語/英語）
  const sectionTopY = BASE.bodyTopY + BASE.gapAfterHeading;

  const goldLineStyle: React.CSSProperties = {
    position: "absolute",
    left: `${BASE.bodyLeftX}mm`,
    top: `${sectionTopY}mm`,
    width: `${BASE.goldLineW}mm`,
    height: `${BASE.goldLineH}mm`,
    background: "#C9A15A",
    zIndex: 2,
  };

  const sectionTextX = BASE.bodyLeftX + BASE.goldLineW + BASE.goldToTextGap;

  const jpTitleStyle: React.CSSProperties = {
    position: "absolute",
    left: `${sectionTextX}mm`,
    top: `${sectionTopY - 0.3}mm`, // 文字の見た目で微調整OK
    fontSize: "14pt",
    fontWeight: 700,
    color: "#6a6a6a",
    letterSpacing: "0.02em",
    zIndex: 2,
    whiteSpace: "nowrap",
  };

  const enTitleStyle: React.CSSProperties = {
    position: "absolute",
    left: `${sectionTextX}mm`,
    top: `${sectionTopY + 8.5}mm`, // 日本語見出しの下（必要なら微調整）
    fontSize: "10pt",
    fontWeight: 400,
    color: "#6a6a6a",
    letterSpacing: "0.18em",
    zIndex: 2,
    whiteSpace: "nowrap",
  };

  // ==============================
  // ✅ 5カラムブロック（確定）
  // ※ デザインFIXのため原則変更しない
  // ==============================
  const E5 = {
    wrapLeft: 30.06,    // ★寸法図：左から 30.06mm
    wrapTop: 92,        // ★ここは図からの推定値。ずれたらここを動かす
    wrapWidth: 251.56,  // ★寸法図：全幅 251.56mm
    colW: 45.89,        // ★寸法図：1カラム基準
    gap: 5.54,          // ★寸法図：カラム間
    numberDia: 9,      // ①〜⑤の丸（必要なら調整）
    numberTopOffset: 5, // 番号丸のY微調整
    titleTop: 17  ,       // 見出しのY（番号からの距離）
    titleSizePt: 12.5,
    titleWeight: 600,
    bulletTop: 25,      // 箇条書き開始Y
    bulletSizePt: 9.8,
    bulletLineHeight: 1.65,
    pillTop: 46,        // ピル開始Y（箇条書きの下）
    pillH: 7.46,        // ★寸法図：7.46mm
    pillRadius: 99,
    pillPadX: 6,
    pillFontPt: 8,
    pillBg: "#6B6B6B",
    pillColor: "#fff",
    blockH: 70,         // 5エレメントブロックの高さ（調整用）
  };

  // ===== P02 最終ビジュアル（New Logo Design） =====
  const FINAL_IMG = {
    top: 170,     // ← Y位置（mm）※スクショ見ながら調整
    left: 46,  // ← 左基準（本文と揃えるなら同値）
    width: 148 // ← 図面どおり or 視覚優先で微調整
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

      <P02HeaderBand 
        clientName={data.clientName} 
        dateText={data.dateText}
        docTitleRight={data.docTitleRight}
      />

      {/* 新しいレイアウト構造 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "-7mm", // ★ここで7mm上げる
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <div style={headingStyle}>
          Logo Design / <span style={{ fontWeight: 800 }}>VISUAL CONCEPT-01</span>
        </div>

        <div style={goldLineStyle} />

        <div style={jpTitleStyle}>ロゴデザインの目的</div>
        <div style={enTitleStyle}>NEW VISUAL PURPOSE</div>
      </div>

      {/* ===== 段落① ===== */}
      <div
        style={{
          position: "absolute",
          left: `${PAR.leftX}mm`,
          top: `${PAR.top1Y + SHIFT.bodyY + ALIGN.parShiftY}mm`,
          width: `${PAR.width}mm`,
          fontSize: `${PAR.font1Pt}pt`,
          lineHeight: PAR.lh1,
          letterSpacing: "0.01em",
          color: PAR.color,
          whiteSpace: "pre-wrap",
          zIndex: 20, // ← Line_topや背景より前に
        }}
      >
        {data.paragraphTop} {/* ← ここを段落①用のフィールドにするなら data.paragraph1 に変更 */}
      </div>

      {/* ===== 段落② ===== */}
      <div
        style={{
          position: "absolute",
          left: `${PAR.leftX}mm`,
          top: `${PAR.top2Y + SHIFT.bodyY + ALIGN.parShiftY}mm`,
          width: `${PAR.width}mm`,
          fontSize: `${PAR.font2Pt}pt`,
          lineHeight: PAR.lh2,
          letterSpacing: "0.01em",
          color: PAR.color,
          opacity: 0.95,
          whiteSpace: "pre-wrap",
          zIndex: 20,
        }}
      >
        {data.paragraphBottom} {/* ← 下段用に data側へ追加する想定 */}
      </div>





      {/* 5エレメント（絶対配置：5カラム固定） */}
      <div
        style={{
          position: "absolute",
          left: `${E5.wrapLeft}mm`,
          top: `${E5.wrapTop + ALIGN.e5ShiftY}mm`,   // ←ここだけ
          width: `${E5.wrapWidth}mm`,
          height: `${E5.blockH}mm`,
        }}
      >
        {/* 矢印5カラム PNG（背景） */}
        <img
          src="/images/Line_top.png"
          alt="5 column arrows"
          style={{
            position: "absolute",
            left: `${E5_BG.left}mm`,
            top: `${E5_BG.top + ALIGN.e5ShiftY}mm`, // ←ここも揃える
            width: "100%",
            height: `calc(100% + ${E5_BG.expandY}mm)`,  // ← 上下にはみ出し含めて表示する想定
            objectFit: "contain",
            zIndex: 2,                    // 背景として要素より下にする
            pointerEvents: "none",
            opacity: 1,
          }}
        />
        
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

      {/* ===== New Logo Design P02（最終ビジュアル） ===== */}
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: `${FINAL_IMG.top}mm`,   // ← ★ここを手で追い込む
          width: "100%",
          textAlign: "left",
          zIndex: 5,
        }}
      >
        <img
          src="/images/New_logo_design_P02.png"
          alt="New Logo Design P02"
          style={{
            width: `${FINAL_IMG.width}mm`, // ← ★横幅
            marginLeft: `${FINAL_IMG.left}mm`, // ← ★左位置
            height: "auto",
            display: "block",
          }}
        />
      </div>

      <P02Footer pageNo="P02" />
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
        zIndex: 10,
      }}
    >
      {/* 番号丸 */}
      <div
        style={{
          position: "absolute",
          left: `calc((${colW}mm - ${cfg.numberDia}mm) / 2)`, // ★列中央
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
          textAlign: "center",              // ★中央寄せ
          fontSize: `${cfg.titleSizePt}pt`,
          fontWeight: cfg.titleWeight,
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