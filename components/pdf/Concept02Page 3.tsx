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

  // P03追加
  copy?: string;
  images?: string[]; // 3枚想定
};

export type ProjectDataP03 = {
  clientName: string;
  dateText: string;
  docTitleRight: string;

  conceptHeading: string; // "Logo Design / VISUAL CONCEPT-02"
  sectionJp: string;      // "ロゴデザインの方向性"
  sectionEn: string;      // "NEW VISUAL ELEMENT"

  elements: BrandElement[];
};

export default function Concept02Page({
  data,
  watermark,
}: {
  data: ProjectDataP03;
  watermark: boolean;
}) {
  // =========================================================
  // ✅ P03：mmレイアウト定数（ここだけ触れば調整できる）
  // =========================================================
  const PAGE = { W: 297, H: 210 };

  // ===== 全体を上下に微調整（最後の追い込み用）=====
  const SHIFT = {
    allY: 0, // 上げるなら -、下げるなら +
  };

  // ===== ヘッダー周り（P02と揃える）=====
  const HEADER = {
    topLineY: 7.5,
    bandHeight: 11,
  };

  // ===== 見出しブロック（左側の金ライン＋日本語/英語）=====
  const SECTION = {
    headingLeftX: 22.67,     // P02と同じ思想で左基準を固定
    headingTopY: 33.26,      // "Logo Design / ..." の上端（mm）
    headingFontPt: 10,

    goldLineW: 0.72,
    goldLineH: 14.12,
    goldToTextGap: 3.0,

    jpTopOffset: 8.44,       // heading から section jp ブロックまで
    jpFontPt: 14,
    enTopOffset: 8.5,        // JPからENまで
    enFontPt: 10,
  };

  // ===== 5カラム領域（P02の完成値をここに"転記"して使い回す）=====
  const E5 = {
    wrapLeft: 29.5,     // 左位置（既存のまま）
    wrapTop: 50,        // ★ 確定：5カラム開始Y = 50mm
    wrapWidth: 297 - 29.5 * 2,
    colW: 39.86,
    gap: 11.81,
    blockH: 140,

    numberDia: 10,
    numberTop: 0,
    titleTop: 12,
    titleFontPt: 12.5,
    bulletTop: 24,
    bulletFontPt: 9.8,
    bulletLineHeight: 1.65,

    pillTop: 52,
    pillH: 7.46,
    pillRadius: 99,
    pillFontPt: 9.2,

    copyTop: 63.5,
    copyFontPt: 7.8,
    copyLineHeight: 1.55,
    copyColor: "#777",

    imgLabelTop: 80.5,
    imgLabelFontPt: 6,

    imgTop: 85.0,
    imgW: 39.86,
    imgH: 23.81,
    imgGapY: 2.4,
    imgRadius: 0,
  };

  const elements = normalizeElements(data.elements);

  // ===== 位置計算（見出し）=====
  const headingStyle: React.CSSProperties = {
    position: "absolute",
    left: `${SECTION.headingLeftX}mm`,
    top: `${SECTION.headingTopY + SHIFT.allY}mm`,
    fontSize: `${SECTION.headingFontPt}pt`,
    letterSpacing: "0.06em",
    color: "#6a6a6a",
    fontWeight: 500,
    whiteSpace: "nowrap",
    zIndex: 10,
  };

  const sectionTopY = SECTION.headingTopY + SECTION.jpTopOffset;

  const goldLineStyle: React.CSSProperties = {
    position: "absolute",
    left: `${SECTION.headingLeftX}mm`,
    top: `${sectionTopY + SHIFT.allY}mm`,
    width: `${SECTION.goldLineW}mm`,
    height: `${SECTION.goldLineH}mm`,
    background: "#C9A15A",
    zIndex: 10,
  };

  const sectionTextX = SECTION.headingLeftX + SECTION.goldLineW + SECTION.goldToTextGap;

  const jpTitleStyle: React.CSSProperties = {
    position: "absolute",
    left: `${sectionTextX}mm`,
    top: `${sectionTopY - 0.3 + SHIFT.allY}mm`,
    fontSize: `${SECTION.jpFontPt}pt`,
    fontWeight: 700,
    color: "#6a6a6a",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
    zIndex: 10,
  };

  const enTitleStyle: React.CSSProperties = {
    position: "absolute",
    left: `${sectionTextX}mm`,
    top: `${sectionTopY + SECTION.enTopOffset + SHIFT.allY}mm`,
    fontSize: `${SECTION.enFontPt}pt`,
    fontWeight: 400,
    color: "#6a6a6a",
    letterSpacing: "0.18em",
    whiteSpace: "nowrap",
    zIndex: 10,
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

      {/* 上部帯（P02と同じコンポーネントを流用） */}
      <P02HeaderBand clientName={data.clientName} dateText={data.dateText} />

      {/* 見出しブロック */}
      <div style={headingStyle}>
        Logo Design / <span style={{ fontWeight: 800 }}>VISUAL CONCEPT-02</span>
      </div>
      <div style={goldLineStyle} />
      <div style={jpTitleStyle}>{data.sectionJp}</div>
      <div style={enTitleStyle}>{data.sectionEn}</div>

      {/* 5カラム（P02の思想をそのまま） */}
      <div
        style={{
          position: "absolute",
          left: `${E5.wrapLeft}mm`,
          top: `${E5.wrapTop + SHIFT.allY}mm`,
          width: `${E5.wrapWidth}mm`,
          height: `${E5.blockH}mm`,
        }}
      >
        {elements.map((el, i) => (
          <P03Column
            key={el.key || `el-${i + 1}`}
            el={el}
            xMm={i * (E5.colW + E5.gap)}
            cfg={E5}
          />
        ))}
      </div>

      {/* フッター（P02流用。ページ表記を変えたいなら後で差し替え） */}
      <P02Footer />
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
        bullets: [],
        pill: "",
        copy: "",
        images: [],
      }
    );
  }
  return out;
}

function P03Column({
  el,
  xMm,
  cfg,
}: {
  el: BrandElement;
  xMm: number;
  cfg: any;
}) {
  const bullets = (el.bullets || []).slice(0, 3).filter((s) => s && s.trim());
  const imgs = (el.images || []).slice(0, 3);

  return (
    <div
      style={{
        position: "absolute",
        left: `${xMm}mm`,
        top: "0mm",
        width: `${cfg.colW}mm`,
        height: "100%",
      }}
    >
      {/* 番号丸 */}
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: `${cfg.numberTop}mm`,
          width: `${cfg.numberDia}mm`,
          height: `${cfg.numberDia}mm`,
          borderRadius: "999px",
          background: "#C9A15A",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: "9pt",
        }}
      >
        {el.no}
      </div>

      {/* タイトル */}
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: `${cfg.titleTop}mm`,
          width: "100%",
          fontSize: `${cfg.titleFontPt}pt`,
          fontWeight: 800,
          letterSpacing: "0.01em",
          color: "#666",
          textAlign: "center", // ← センター合わせしたいならここ
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
          width: "100%",
          fontSize: `${cfg.bulletFontPt}pt`,
          lineHeight: cfg.bulletLineHeight,
          color: "#777",
        }}
      >
        {bullets.length === 0 ? null : (
          <ul style={{ margin: 0, paddingLeft: "4mm" }}>
            {bullets.map((b: string, idx: number) => (
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
          width: "100%",
          height: `${cfg.pillH}mm`,
          borderRadius: `${cfg.pillRadius}mm`,
          background: "#6B6B6B",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: `${cfg.pillFontPt}pt`,
          fontWeight: 700,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={el.pill}
      >
        {el.pill}
      </div>

      {/* コピー文（P03の新要素） */}
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: `${cfg.copyTop}mm`,
          width: "100%",
          fontSize: `${cfg.copyFontPt}pt`,
          lineHeight: cfg.copyLineHeight,
          color: cfg.copyColor,
          whiteSpace: "pre-wrap",
        }}
      >
        {el.copy || ""}
      </div>

      {/* Image Inspiration ラベル */}
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: `${cfg.imgLabelTop}mm`,
          width: "100%",
          fontSize: `${cfg.imgLabelFontPt}pt`,
          color: "#9a9a9a",
          textAlign: "center",
          letterSpacing: "0.06em",
        }}
      >
        Image Inspiration
      </div>

      {/* 画像3枚（縦並び） */}
      {imgs.map((src: string, idx: number) => (
        <img
          key={idx}
          src={src}
          alt={`inspiration-${el.no}-${idx + 1}`}
          style={{
            position: "absolute",
            left: "0mm",
            top: `${cfg.imgTop + idx * (cfg.imgH + cfg.imgGapY)}mm`,
            width: `${cfg.imgW}mm`,
            height: `${cfg.imgH}mm`,
            objectFit: "cover",
            borderRadius: `${cfg.imgRadius}mm`,
            background: "#eee",
          }}
        />
      ))}
    </div>
  );
}