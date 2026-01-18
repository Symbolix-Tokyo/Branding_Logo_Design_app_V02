import React from "react";
import Watermark from "./Watermark";
import { P02HeaderBand } from "./P02HeaderBand";
import { P02Footer } from "./P02Footer";

type P04Column = {
  key: string;
  no: number;                 // 1..5
  title: string;              // 例：次世代との繋がり
  keywordEn: string;          // 例：Style
  keywordJp: string;          // 例：繋がり・ふれあい
  images: [string, string];   // 2枚（上・下） 例：["/images/p04-1-1.png","/images/p04-1-2.png"]
  description: string;        // 下の文章
};

export type ProjectDataP04 = {
  clientName: string;
  dateText: string;
  docTitleRight: string;

  // CoverPage用のフィールド
  projectTitleLines: string[];
  projectSubtitle: string;
  stampText: string;
  coverImages: { role: string; src: string }[];

  // Concept03Page用のフィールド
  conceptNoText: string;  // "03"
  sectionJp: string;      // ロゴデザインのコンセプト
  sectionEn: string;      // NEW DESIGN CONCEPT

  columns: P04Column[];
};

export default function Concept03Page({
  data,
  watermark,
}: {
  data: ProjectDataP04;
  watermark: boolean;
}) {
  // =========================================================
  // ✅ P04：mmレイアウト定数（ここだけ触れば調整できる）
  // =========================================================
  const PAGE = { W: 297, H: 210 };

  // 全体の上下微調整（最後の追い込み）
  const SHIFT = { allY: -7 };

  // 見出し（P02/P03の思想で固定）
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

  // ===== P04 背景PNG（上段の NEW LOGO DESIGN 等） =====
  const BG = {
    src: "/images/New_logo_design_P03.png", // ★ここをP03用PNGに
    left: 130,
    top: 37,       // 位置微調整
    width: 52,     // ページ幅
    z: 1,
    opacity: 1,     // ★表示を有効化
  };

  // ===== 5カラム全体 =====
  // ※ size_P04.png の思想：左29.5 / カラム40 / gap 11.31 を初期値にしてます
  const E5 = {
    wrapLeft: 29.5,
    wrapTop: 50.0,       // ←ここが「5カラム開始Y」最大のツマミ
    colW: 40.0,
    gap: 11.31,
    wrapW: 297 - 29.5 * 2,

    // ①〜⑤丸
    numberDia: 7,
    numberTop: 7.5,

    // タイトル（次世代との繋がり等）
    titleTop: 16.0,
    titleFontPt: 12.5,

    // Keywordカード（ベージュ帯）
    cardTop: 24.0,
    cardH: 24.19,
    cardRadius: 2.0,
    cardBg: "#F3EEE6",
    cardLabelFontPt: 7.5,
    cardEnFontPt: 14,
    cardJpFontPt: 9.5,

    // Materialize ラベル
    materializeTop: 50.0,
    materializeFontPt: 7.5,

    // 画像（2枚） ※縦横比固定：objectFit="cover"で対応
    imgW: 40.0,
    imgH: 30.33,
    img1Top: 56.0,
    arrowTop: 87.0,      // ←矢印のY（img1とimg2の間に来るよう調整）
    arrowW: 8.0,        // ←後でお好みで
    arrowH: 8.0,        // ←後でお好みで
    img2Top: 96.0,
    imgRadius: 0,

    // 下の説明文
    descTop: 130.0,
    descFontPt: 7.8,
    descLineHeight: 1.55,
    descColor: "#777",
  };

  // データが5個未満でも崩れないように補完
  const cols = normalizeP04(data.columns);

  // 見出し（Logo Design / VISUAL CONCEPT-03）
  const headingStyle: React.CSSProperties = {
    position: "absolute",
    left: `${SECTION.leftX}mm`,
    top: `${SECTION.topY + SHIFT.allY}mm`,
    fontSize: `${SECTION.headingFontPt}pt`,
    letterSpacing: "0.06em",
    color: "#6a6a6a",
    fontWeight: 500,
    whiteSpace: "nowrap",
    zIndex: 10,
  };

  const sectionTopY = SECTION.topY + SECTION.jpTopOffset;
  const goldLineStyle: React.CSSProperties = {
    position: "absolute",
    left: `${SECTION.leftX}mm`,
    top: `${sectionTopY + SHIFT.allY}mm`,
    width: `${SECTION.goldLineW}mm`,
    height: `${SECTION.goldLineH}mm`,
    background: "#C9A15A",
    zIndex: 10,
  };

  const sectionTextX = SECTION.leftX + SECTION.goldLineW + SECTION.goldToTextGap;
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

      {/* P04 背景PNG（NEW LOGO DESIGN 等） */}
      <img
        src={BG.src}
        alt="P04 background"
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

      <P02HeaderBand 
        clientName={data.clientName} 
        dateText={data.dateText}
        docTitleRight={data.docTitleRight}
      />

      {/* 見出しブロック */}
      <div style={headingStyle}>
        Logo Design / <span style={{ fontWeight: 800 }}>VISUAL CONCEPT-{data.conceptNoText}</span>
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
          width: `${E5.wrapW}mm`,
          height: "150mm",
        }}
      >
        {cols.map((c, i) => (
          <P04Col
            key={c.key || `c-${i + 1}`}
            c={c}
            xMm={i * (E5.colW + E5.gap)}
            cfg={E5}
          />
        ))}
      </div>

      <P02Footer pageNo="P04" />
    </div>
  );
}

function normalizeP04(input: P04Column[]) {
  const byNo = new Map<number, P04Column>();
  for (const e of input || []) byNo.set(e.no, e);

  const out: P04Column[] = [];
  for (let no = 1; no <= 5; no++) {
    const e = byNo.get(no);
    out.push(
      e ?? {
        key: `placeholder-${no}`,
        no,
        title: "（未入力）",
        keywordEn: "",
        keywordJp: "",
        images: ["/images/placeholder.png", "/images/placeholder.png"] as any,
        description: "",
      }
    );
  }
  return out;
}

function P04Col({
  c,
  xMm,
  cfg,
}: {
  c: P04Column;
  xMm: number;
  cfg: any;
}) {
  const [img1, img2] = c.images || [];

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
      {/* 番号 */}
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
        {c.no}
      </div>

      {/* タイトル */}
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: `${cfg.titleTop}mm`,
          width: "100%",
          fontSize: `${cfg.titleFontPt}pt`,
          fontWeight: 600,
          color: "#666",
          textAlign: "center",
        }}
      >
        {c.title}
      </div>

      {/* Keywordカード */}
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: `${cfg.cardTop}mm`,
          width: "100%",
          height: `${cfg.cardH}mm`,
          borderRadius: `${cfg.cardRadius}mm`,
          background: cfg.cardBg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1mm",
        }}
      >
        <div
          style={{
            fontSize: `${cfg.cardLabelFontPt}pt`,
            color: "#9a9a9a",
            letterSpacing: "0.03em",
          }}
        >
          Image Inspiration Keyword
        </div>
        <div style={{ fontSize: `${cfg.cardEnFontPt}pt`, fontWeight: 600, color: "#666" }}>
          {c.keywordEn}
        </div>
        <div style={{ fontSize: `${cfg.cardJpFontPt}pt`, color: "#777" }}>
          {c.keywordJp}
        </div>
      </div>

      {/* Materialize */}
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: `${cfg.materializeTop}mm`,
          width: "100%",
          textAlign: "center",
          fontSize: `${cfg.materializeFontPt}pt`,
          color: "#9a9a9a",
          letterSpacing: "0.03em",
        }}
      >
        Materialize
      </div>

      {/* 画像1（縦横比固定） */}
      <img
        src={img1}
        alt={`p04-${c.no}-1`}
        style={{
          position: "absolute",
          left: "0mm",
          top: `${cfg.img1Top}mm`,
          width: `${cfg.imgW}mm`,
          height: `${cfg.imgH}mm`,
          objectFit: "cover",          // ✅ 縦横比固定
          borderRadius: `${cfg.imgRadius}mm`,
          background: "#eee",
        }}
      />

      {/* 矢印（PNG） */}
      <img
        src="/images/arrow.png"
        alt="arrow"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: `${cfg.arrowTop}mm`,
          width: `${cfg.arrowW}mm`,
          height: `${cfg.arrowH}mm`,
          objectFit: "contain",
          opacity: 0.65,
          pointerEvents: "none",
        }}
      />

      {/* 画像2（縦横比固定） */}
      <img
        src={img2}
        alt={`p04-${c.no}-2`}
        style={{
          position: "absolute",
          left: "0mm",
          top: `${cfg.img2Top}mm`,
          width: `${cfg.imgW}mm`,
          height: `${cfg.imgH}mm`,
          objectFit: "cover",          // ✅ 縦横比固定
          borderRadius: `${cfg.imgRadius}mm`,
          background: "#eee",
        }}
      />

      {/* 下の説明 */}
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: `${cfg.descTop}mm`,
          width: "100%",
          fontSize: `${cfg.descFontPt}pt`,
          lineHeight: cfg.descLineHeight,
          color: cfg.descColor,
          whiteSpace: "pre-wrap",
        }}
      >
        {c.description}
      </div>
    </div>
  );
}