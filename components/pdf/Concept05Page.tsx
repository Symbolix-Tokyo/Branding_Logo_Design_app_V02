import React from "react";
import Watermark from "./Watermark";
import { P02HeaderBand } from "./P02HeaderBand";
import { P02Footer } from "./P02Footer";

type FinishItem = {
  key: string;
  no: number;        // 1..6
  label: string;     // "Finish type 1"
  image: string;     // "/images/finish_01.png"
};

export type ProjectDataP06 = {
  clientName: string;
  dateText: string;
  docTitleRight: string;

  // CoverPage用のフィールド
  projectTitleLines: string[];
  projectSubtitle: string;
  stampText: string;
  coverImages: { role: string; src: string }[];

  conceptNoText: string;  // "05"（PDF表記に合わせるなら）
  sectionJp: string;      // "ロゴデザイン"
  sectionEn: string;      // "NEW LOGO VISUAL"

  items: FinishItem[];    // 6個
};

export default function Concept05Page({
  data,
  watermark,
}: {
  data: ProjectDataP06;
  watermark: boolean;
}) {
  const PAGE = { W: 297, H: 210 };

  // 最後の追い込み用（ユーザー側で手入力調整OK）
  const SHIFT = { allY: -7 };

  // 見出し（P04/P05と同じ思想）
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

  // 中央タイトル
  const CENTER_TITLE = {
    text: "NEW LOGO DESIGN",
    topY: 40.0,
    fontPt: 14,
    letterSpacing: "0.10em",
    colorNew: "#C9A15A",
    colorRest: "#6a6a6a",
  };

  // ===== 6枚グリッド（size_P06.png の初期値）=====
  // ※あとでユーザーが微調整する前提で「ツマミ」をまとめています
  const GRID = {
    // 全体配置
    wrapLeft: 22.31,     // 左余白
    wrapTop: 62.7,       // 上からの開始（スクショ目安）
    gapX: 10.15,         // 横ギャップ
    gapY: 20.12,         // 縦ギャップ

    // ボックスサイズ
    cardW: 81.57,
    cardH: 54.99,
    radius: 4.0,

    // ラベル
    labelTopOffset: -7.5,      // カード上の "Finish type" の位置（カード基準）
    labelFontPt: 12,
    labelColor: "#7a7a7a",
  };

  const items = normalizeFinishItems(data.items || []);

  // 見出し（Logo Design / VISUAL CONCEPT-xx）
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

      <P02HeaderBand 
        clientName={data.clientName} 
        dateText={data.dateText}
        docTitleRight={data.docTitleRight}
      />

      {/* 見出し */}
      <div style={headingStyle}>
        Logo Design /{" "}
        <span style={{ fontWeight: 800 }}>
          VISUAL CONCEPT-{data.conceptNoText}
        </span>
      </div>
      <div style={goldLineStyle} />
      <div style={jpTitleStyle}>{data.sectionJp}</div>
      <div style={enTitleStyle}>{data.sectionEn}</div>

      {/* 中央タイトル画像 */}
      <img
        src="/images/New_logo_design_P03.png"
        alt="NEW LOGO DESIGN"
        style={{
          position: "absolute",
          left: "130mm",
          top: `${37 + SHIFT.allY}mm`,
          width: "52mm",
          height: "auto",
          zIndex: 1,
          opacity: 1,
          pointerEvents: "none",
        }}
      />

      {/* 6枚グリッド */}
      <div
        style={{
          position: "absolute",
          left: `${GRID.wrapLeft}mm`,
          top: `${GRID.wrapTop + SHIFT.allY}mm`,
          width: `${PAGE.W - GRID.wrapLeft * 2}mm`,
          height: "120mm",
        }}
      >
        {items.map((it, idx) => {
          const col = idx % 3;              // 0..2
          const row = Math.floor(idx / 3);  // 0..1
          const x = col * (GRID.cardW + GRID.gapX);
          const y = row * (GRID.cardH + GRID.gapY);

          return (
            <div
              key={it.key}
              style={{
                position: "absolute",
                left: `${x}mm`,
                top: `${y}mm`,
                width: `${GRID.cardW}mm`,
              }}
            >
              {/* ラベル */}
              <div
                style={{
                  position: "absolute",
                  left: "0mm",
                  top: `${GRID.labelTopOffset}mm`,
                  width: "100%",
                  textAlign: "center",
                  fontSize: `${GRID.labelFontPt}pt`,
                  color: GRID.labelColor,
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                }}
              >
                {it.label}
              </div>

              {/* 画像 */}
              <img
                src={it.image}
                alt={it.label}
                style={{
                  position: "absolute",
                  left: "0mm",
                  top: "0mm",
                  width: `${GRID.cardW}mm`,
                  height: `${GRID.cardH}mm`,
                  borderRadius: `${GRID.radius}mm`,
                  objectFit: "contain",     // 全6枚とも全体表示（縮小表示）
                  objectPosition: "center",  // 全6枚とも中央配置
                  background: "#eee",
                }}
              />
            </div>
          );
        })}
      </div>

      <P02Footer pageNo="P06" />
    </div>
  );
}

function normalizeFinishItems(input: FinishItem[]) {
  // 6個固定。足りない場合も崩れないように
  const defaults: FinishItem[] = [
    { key: "f1", no: 1, label: "Finish type 1", image: "/images/finish_01.png" },
    { key: "f2", no: 2, label: "Finish type 2", image: "/images/finish_02.png" },
    { key: "f3", no: 3, label: "Finish type 3", image: "/images/finish_03.png" },
    { key: "f4", no: 4, label: "Finish type 4", image: "/images/finish_04.png" },
    { key: "f5", no: 5, label: "Finish type 5", image: "/images/finish_05.png" },
    { key: "f6", no: 6, label: "Finish type 6", image: "/images/finish_06.png" },
  ];

  const byNo = new Map<number, FinishItem>();
  for (const e of input || []) byNo.set(e.no, e);

  return defaults.map((d) => byNo.get(d.no) ?? d);
}