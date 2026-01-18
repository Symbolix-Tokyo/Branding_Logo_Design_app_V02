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
  images?: string[]; // 3枚想定（public配下のパス or URL）
};

export type ProjectDataP03 = {
  clientName: string;
  dateText: string;
  docTitleRight: string;

  sectionJp: string; // "ロゴデザインの方向性"
  sectionEn: string; // "NEW VISUAL ELEMENT"

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
    allY: -7,
  };

  // ===== 見出しブロック（左側の金ライン＋日本語/英語）=====
  const SECTION = {
    headingLeftX: 22.67,
    headingTopY: 33.26,
    headingFontPt: 10,

    goldLineW: 0.72,
    goldLineH: 14.12,
    goldToTextGap: 3.0,

    jpTopOffset: 8.44,
    jpFontPt: 14,
    enTopOffset: 8.5,
    enFontPt: 10,
  };

  // ===== P03 5カラム領域 =====
  const E5 = {
    wrapLeft: 29.5,
    wrapTop: 50, // ★確定
    wrapWidth: 297 - 29.5 * 2,
    colW: 39.86,
    gap: 11.81,
    blockH: 140,

    numberDia: 7,
    numberTop: 6.5,

    titleTop: 15.5,
    titleFontPt: 12.5,

    bulletTop: 22.5,
    bulletFontPt: 8.5,
    bulletLineHeight: 1.65,

    pillTop: 40,
    pillH: 7.46,
    pillRadius: 99,
    pillFontPt: 7.5,

    copyTop: 49,
    copyFontPt: 7.8,
    copyLineHeight: 1.55,
    copyColor: "#777",

    imgLabelTop: 68.5,
    imgLabelFontPt: 7.5,

    imgTop: 74.0,
    imgW: 39.86,
    imgH: 23.81,
    imgGapY: 2.4,
    imgRadius: 0,
  };

  // ===== P03 背景PNG（上段の NEW LOGO DESIGN 等） =====
  const BG = {
    src: "/images/New_logo_design_P03.png", // ★ここをP03用PNGに
    left: 130,
    top: 37,       // 位置微調整
    width: 52,     // ページ幅
    z: 1,
    opacity: 1,     // ★表示を有効化
  };

  const elements = normalizeElements(data.elements);

  // ===== 見出し位置計算 =====
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

  const sectionTextX =
    SECTION.headingLeftX + SECTION.goldLineW + SECTION.goldToTextGap;

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

      {/* P03 背景PNG（NEW LOGO DESIGN 等） */}
      <img
        src={BG.src}
        alt="P03 background"
        style={{
          position: "absolute",
          left: `${BG.left}mm`,
          top: `${BG.top + SHIFT.allY}mm`,
          width: `${BG.width}mm`,
          height: "auto",
          zIndex: BG.z,
          opacity: BG.opacity,
          pointerEvents: "none",
        }}
      />

      {/* 上部帯（P02流用） */}
      <P02HeaderBand 
        clientName={data.clientName} 
        dateText={data.dateText}
        docTitleRight={data.docTitleRight}
      />

      {/* 見出し */}
      <div style={headingStyle}>
        Logo Design / <span style={{ fontWeight: 800 }}>VISUAL CONCEPT-02</span>
      </div>
      <div style={goldLineStyle} />
      <div style={jpTitleStyle}>{data.sectionJp}</div>
      <div style={enTitleStyle}>{data.sectionEn}</div>

      {/* 5カラム */}
      <div
        style={{
          position: "absolute",
          left: `${E5.wrapLeft}mm`,
          top: `${E5.wrapTop + SHIFT.allY}mm`,
          width: `${E5.wrapWidth}mm`,
          height: `${E5.blockH}mm`,
          zIndex: 5,
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

      <P02Footer pageNo="P03" />
    </div>
  );
}

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
          left: "50%",
          transform: "translateX(-50%)",
          top: `${cfg.numberTop}mm`,
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

      {/* タイトル（センター） */}
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: `${cfg.titleTop}mm`,
          width: "100%",
          fontSize: `${cfg.titleFontPt}pt`,
          fontWeight: 600,
          letterSpacing: "0.01em",
          color: "#666",
          textAlign: "center",
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
          fontWeight: 600,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={el.pill}
      >
        {el.pill}
      </div>

      {/* コピー */}
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

      {/* Image Inspiration */}
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

      {/* 画像3枚 */}
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