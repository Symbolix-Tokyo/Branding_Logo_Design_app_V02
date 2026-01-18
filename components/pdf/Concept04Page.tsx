import React from "react";
import Watermark from "./Watermark";
import { P02HeaderBand } from "./P02HeaderBand";
import { P02Footer } from "./P02Footer";

/**
 * P05 = VISUAL CONCEPT-04
 * 構成：
 * - ヘッダー（P02HeaderBand流用）
 * - 左：セクションJP/EN
 * - 中央：NEW LOGO DESIGN（PNG or テキスト）
 * - 5カラム：画像のみ（materialize-01-02 ... 05-02）※縦横比固定
 * - Line_under.png をセンター表示
 * - 3カラム：Processカード（枠）＋矢印 arrow_2.png（カードHのセンター）
 * - 下に各説明文
 * - 左下 P05
 */

type TopImageItem = {
  no: number;          // 1..5（丸番号）
  title?: string;      // 必要なら（今回は未使用でもOK）
  image: string;       // /images/materialize-01-02.png 等
};

type ProcessItem = {
  title: string;       // The Logo Design Process 1/2/3
  boxNote?: string;    // （任意）ボックス内に画像パス or テキストを表示
  description: string; // 下の文章
};

export type ProjectDataP05 = {
  clientName: string;
  dateText: string;
  docTitleRight: string;

  // CoverPage用のフィールド
  projectTitleLines: string[];
  projectSubtitle: string;
  stampText: string;
  coverImages: { role: string; src: string }[];

  // 見出し
  conceptNoText: string; // "04"
  sectionJp: string;     // 例：ロゴデザイン
  sectionEn: string;     // 例：NEW LOGO VISUAL

  // NEW LOGO DESIGN（PNGで統一したい場合）
  newLogoDesignPng?: string; // 例："/images/New_logo_design_P04.png" or "/images/New_logo_design_P03.png"
  // PNGを使わない場合（テキストで出す）
  useCenterText?: boolean;

  // 5枚画像
  topImages: TopImageItem[]; // 5件想定

  // 3プロセス
  processes: [ProcessItem, ProcessItem, ProcessItem];
};

export default function Concept04Page({
  data,
  watermark,
}: {
  data: ProjectDataP05;
  watermark: boolean;
}) {
  // =========================================================
  // ✅ P05：mmレイアウト定数（ここだけ触れば微調整できる）
  // =========================================================
  const PAGE = { W: 297, H: 210 };

  // 全体の上下微調整
  const SHIFT = { allY: -7 };

  // ---- 見出し（左） ----
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

  // ---- P05 背景PNG（上段の NEW LOGO DESIGN 等） ----
  const BG = {
    src: "/images/New_logo_design_P03.png", // ★P03と同じPNGを使用
    left: 130,
    top: 37,       // 位置微調整
    width: 52,     // ページ幅
    z: 1,
    opacity: 1,     // ★表示を有効化
  };

  // ---- 5カラム（画像だけ）----
  // size_P05 の値に寄せた初期値
  const TOP5 = {
    wrapLeft: 32.6,
    wrapTop: 66.8,     // 画像群の開始Y（スクショに合わせて後で微調整）
    colW: 40.0,
    colH: 35.26,
    gap: 11.54,

    numberDia: 7,
    numberTop: -10,    // 画像上の丸番号のY（相対）
  };

  // ---- Line_under（センター）----
  const LINE_UNDER = {
    topY: 105.0,       // size_P05_B に合わせて後で調整
    w: 205.82,         // スクショの幅寸法に近い（後で調整）
    h: 9.22,            // だいたい
    src: "/images/Line_under.png",
  };

  // ---- 3プロセス（カード）----
  const PROC = {
    titleTop: 116.0, // "The Logo Design Process X" のY（後で調整）
    titleFontPt: 12,

    cardTop: 123.0,
    cardW: 81.67,
    cardH: 55.18,
    cardRadius: 3.5,
    cardBorder: "#CFCFCF",

    leftX: 22.42,
    gap: 9.94,

    // 矢印
    arrowSrc: "/images/arrow_2.png",
    arrowW: 8.0,      // 後で調整
    arrowH: 8.0,      // 後で調整（contain）
    arrowOpacity: 0.55,

    // 説明文
    descTop: 180.0,   // 後で調整
    descFontPt: 7.8,
    descLineHeight: 1.55,
    descColor: "#777",
  };

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

  const topImages = normalizeTopImages(data.topImages);

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

      {/* ヘッダー（P02HeaderBand流用） */}
      <P02HeaderBand 
        clientName={data.clientName} 
        dateText={data.dateText}
        docTitleRight={data.docTitleRight}
      />

      {/* 見出し：Logo Design / VISUAL CONCEPT-04 */}
      <div style={headingStyle}>
        Logo Design / <span style={{ fontWeight: 800 }}>VISUAL CONCEPT-{data.conceptNoText}</span>
      </div>

      {/* 左：セクションJP/EN */}
      <div style={goldLineStyle} />
      <div style={jpTitleStyle}>{data.sectionJp}</div>
      <div style={enTitleStyle}>{data.sectionEn}</div>

      {/* P05 背景PNG（NEW LOGO DESIGN 等） */}
      <img
        src={BG.src}
        alt="P05 background"
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

      {/* 5カラム（画像のみ） */}
      <div
        style={{
          position: "absolute",
          left: `${TOP5.wrapLeft}mm`,
          top: `${TOP5.wrapTop + SHIFT.allY}mm`,
          width: `${(TOP5.colW * 5) + (TOP5.gap * 4)}mm`,
          height: `${TOP5.colH}mm`,
        }}
      >
        {topImages.map((it, idx) => (
          <div
            key={`top5-${it.no}`}
            style={{
              position: "absolute",
              left: `${idx * (TOP5.colW + TOP5.gap)}mm`,
              top: "0mm",
              width: `${TOP5.colW}mm`,
              height: `${TOP5.colH}mm`,
            }}
          >
            {/* 番号 */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                top: `${TOP5.numberTop}mm`,
                width: `${TOP5.numberDia}mm`,
                height: `${TOP5.numberDia}mm`,
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
              {it.no}
            </div>

            {/* 画像（縦横比固定） */}
            <img
              src={it.image}
              alt={`materialize-${it.no}`}
              style={{
                position: "absolute",
                left: "0mm",
                top: "0mm",
                width: `${TOP5.colW}mm`,
                height: `${TOP5.colH}mm`,
                objectFit: "cover", // ✅ 縦横比固定
                background: "#eee",
              }}
            />
          </div>
        ))}
      </div>

      {/* Line_under（センター） */}
      <img
        src={LINE_UNDER.src}
        alt="line-under"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: `${LINE_UNDER.topY + SHIFT.allY}mm`,
          width: `${LINE_UNDER.w}mm`,
          height: `${LINE_UNDER.h}mm`,
          objectFit: "contain",
          opacity: 0.7,
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* 3プロセス */}
      <div
        style={{
          position: "absolute",
          left: `${PROC.leftX}mm`,
          top: "0mm",
          width: `${(PROC.cardW * 3) + (PROC.gap * 2)}mm`,
          height: "200mm",
        }}
      >
        {data.processes.map((p, i) => {
          const x = i * (PROC.cardW + PROC.gap);
          return (
            <div
              key={`proc-${i}`}
              style={{
                position: "absolute",
                left: `${x}mm`,
                top: "0mm",
                width: `${PROC.cardW}mm`,
              }}
            >
              {/* タイトル */}
              <div
                style={{
                  position: "absolute",
                  left: "0mm",
                  top: `${PROC.titleTop + SHIFT.allY}mm`,
                  width: "100%",
                  textAlign: "left",
                  fontSize: `${PROC.titleFontPt}pt`,
                  color: "#6a6a6a",
                  letterSpacing: "0.02em",
                }}
              >
                {p.title}
              </div>

              {/* カード（枠） */}
              <div
                style={{
                  position: "absolute",
                  left: "0mm",
                  top: `${PROC.cardTop + SHIFT.allY}mm`,
                  width: `${PROC.cardW}mm`,
                  height: `${PROC.cardH}mm`,
                  borderRadius: `${PROC.cardRadius}mm`,
                  border: `0.6mm solid ${PROC.cardBorder}`,
                  background: "#fff",
                }}
              >
                {p.boxNote ? (
                  p.boxNote.startsWith("/images/") ? (
                    // 画像の場合
                    <img
                      src={p.boxNote}
                      alt={`process-${i + 1}`}
                      style={{
                        position: "absolute",
                        inset: "3mm", // カードの内側に少し余白
                        width: `${PROC.cardW - 6}mm`,
                        height: `${PROC.cardH - 6}mm`,
                        objectFit: "contain",
                        opacity: 0.9,
                      }}
                    />
                  ) : (
                    // テキストの場合（従来通り）
                    <div
                      style={{
                        position: "absolute",
                        inset: "0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "9pt",
                        color: "#bbb",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {p.boxNote}
                    </div>
                  )
                ) : null}
              </div>

              {/* 説明文 */}
              <div
                style={{
                  position: "absolute",
                  left: "0mm",
                  top: `${PROC.descTop + SHIFT.allY}mm`,
                  width: "100%",
                  fontSize: `${PROC.descFontPt}pt`,
                  lineHeight: PROC.descLineHeight,
                  color: PROC.descColor,
                  whiteSpace: "pre-wrap",
                }}
              >
                {p.description}
              </div>
            </div>
          );
        })}

        {/* 矢印（1→2、2→3）カードHのセンターに合わせる */}
        {[0, 1].map((idx) => {
          const leftOfGap = (idx * (PROC.cardW + PROC.gap)) + PROC.cardW; // gap開始位置
          const centerOfGap = leftOfGap + (PROC.gap / 2);
          const arrowTop = (PROC.cardTop + (PROC.cardH / 2)) - (PROC.arrowH / 2);

          return (
            <img
              key={`arrow-gap-${idx}`}
              src={PROC.arrowSrc}
              alt="arrow-right"
              style={{
                position: "absolute",
                left: `${centerOfGap}mm`,
                top: `${arrowTop + SHIFT.allY}mm`,
                transform: "translateX(-50%)",
                width: `${PROC.arrowW}mm`,
                height: `${PROC.arrowH}mm`,
                objectFit: "contain",
                opacity: PROC.arrowOpacity,
                pointerEvents: "none",
                userSelect: "none",
              }}
            />
          );
        })}
      </div>

      <P02Footer pageNo="P05" />
    </div>
  );
}

/** 5個を必ず返す（不足しても崩れない） */
function normalizeTopImages(input: TopImageItem[]) {
  const byNo = new Map<number, TopImageItem>();
  for (const it of input || []) byNo.set(it.no, it);

  const out: TopImageItem[] = [];
  for (let no = 1; no <= 5; no++) {
    const it = byNo.get(no);
    out.push(
      it ?? {
        no,
        image: "/images/placeholder.png",
      }
    );
  }
  return out;
}