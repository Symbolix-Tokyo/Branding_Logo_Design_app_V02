import React from "react";
import Watermark from "./Watermark";
import { P02HeaderBand } from "./P02HeaderBand";
import { P02Footer } from "./P02Footer";

export type ProjectDataP07 = {
  clientName: string;
  dateText: string;
  docTitleRight: string;

  // セクション
  sectionJp: string; // 例：名刺デザイン
  sectionEn: string; // 例：NEW LOGO VISUAL
  designLabel: string; // 例：VISUAL DESIGN-01

  // 名刺データ
  personName: string;        // 氏名（おもて面：右寄せ）
  personNameRoman: string;   // ローマ字（おもて面：右寄せ / うら面：センター）

  // 画像
  logoImage: string;   // 例："/images/finish_01.png"
  mockupImage: string; // 例："/images/meishi_mockup.png"

  // 下部バー色（P08にも流用する前提で data で受け取る）
  colorPrimary: string;   // 例："#556B2F"
  colorSecondary: string; // 例："#7A4B2A"

  // ページ表記
  pageNoText: string; // "P07"
};

export default function VisualDesign01Page({
  data,
  watermark,
}: {
  data: ProjectDataP07;
  watermark: boolean;
}) {
  // =========================================================
  // ✅ P07：テンプレ固定レイアウト（触るのは data のみ）
  // =========================================================
  const PAGE = { W: 297, H: 210 };

  // 全体微調整（最後に 1〜2mm 詰めたい時だけ触る）
  const SHIFT = { allY: -7 };

  // 見出し（P04/P05 系のスタイル踏襲）
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

  // 名刺原寸（固定）
  const CARD = {
    w: 91.01, // 91mm（スクショに合わせ小数残し）
    h: 55.07, // 55mm（スクショに合わせ小数残し）
    radius: 0.0,
    stroke: "#BFBFBF",
    strokeW: 0.2,
  };

  // 左カラム配置
  const LEFT = {
    x: 30.1,        // 左余白
    frontY: 67.0,   // 1枚目開始Y
    gapY: 19.8,     // 表→裏の間隔
  };

  // 右モックアップ（スクショ寸法）
  const MOCK = {
    w: 157.28,
    h: 129.95,
    rightMargin: 8.72,
    gapToLeft: 9.89,
    topY: LEFT.frontY,
    labelTopOffset: -10.0,
  };
  const mockX = PAGE.W - MOCK.rightMargin - MOCK.w;

  // 表・裏のY
  const frontY = LEFT.frontY + SHIFT.allY;
  const backY = LEFT.frontY + CARD.h + LEFT.gapY + SHIFT.allY;

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

      {/* ヘッダーは共通コンポーネントを流用 */}
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

      {/* ===== 左：名刺（おもて／うら） ===== */}
      <div style={{ position: "absolute", left: `${LEFT.x}mm`, top: "0mm" }}>
        {/* おもて面ラベル */}
        <div
          style={{
            position: "absolute",
            left: "0mm",
            top: `${frontY - 8}mm`,
            width: `${CARD.w}mm`,
            textAlign: "center",
            fontSize: "10pt",
            color: "#9a9a9a",
            letterSpacing: "0.06em",
          }}
        >
          おもて面
        </div>

        <MeishiFront
          x={0}
          y={frontY}
          card={CARD}
          data={data}
        />

        {/* 寸法線（縦55 / 横91） */}
        <img
          src="/images/meishi_line_55.png"
          alt="meishi-55"
          style={{
            position: "absolute",
            left: "-10mm",
            top: `${frontY}mm`,
            height: `${CARD.h}mm`,
            width: "6mm",
            objectFit: "contain",
            opacity: 0.95,
            pointerEvents: "none",
          }}
        />
        <img
          src="/images/meishi_line_91.png"
          alt="meishi-91"
          style={{
            position: "absolute",
            left: "0mm",
            top: `${frontY + CARD.h + 3.0}mm`,
            width: `${CARD.w}mm`,
            height: "6mm",
            objectFit: "contain",
            opacity: 0.95,
            pointerEvents: "none",
          }}
        />

        {/* うら面ラベル */}
        <div
          style={{
            position: "absolute",
            left: "0mm",
            top: `${backY - 8}mm`,
            width: `${CARD.w}mm`,
            textAlign: "center",
            fontSize: "10pt",
            color: "#9a9a9a",
            letterSpacing: "0.06em",
          }}
        >
          うら面
        </div>

        <MeishiBack
          x={0}
          y={backY}
          card={CARD}
          data={data}
        />
      </div>

      {/* ===== 右：モックアップ画像 ===== */}
      <div
        style={{
          position: "absolute",
          left: `${mockX}mm`,
          top: `${MOCK.topY + SHIFT.allY}mm`,
          width: `${MOCK.w}mm`,
          height: `${MOCK.h}mm`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "0mm",
            top: `${MOCK.labelTopOffset}mm`,
            fontSize: "10pt",
            color: "#9a9a9a",
            letterSpacing: "0.06em",
          }}
        >
          Image Photo
        </div>

        <img
          src={data.mockupImage}
          alt="mockup"
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

/** おもて面 */
function MeishiFront({
  x,
  y,
  card,
  data,
}: {
  x: number;
  y: number;
  card: { w: number; h: number; radius: number; stroke: string; strokeW: number };
  data: ProjectDataP07;
}) {
  // おもて面内レイアウト（固定）
  const L = {
    padL: 6.49,
    padT: 4.6,
    logoSize: 26.21,

    nameRightPad: 5.89,
    nameTop: 14.6,
    nameFont: 14    ,

    romanTopGap: 1.8,
    romanFont: 5,

    clientTop: 38.9,
    clientFont: 9,

    barH: 3.01,
    barLeftW: 58.0,
    barRightW: 33.0,
  };

  const barY = card.h - L.barH;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}mm`,
        top: `${y}mm`,
        width: `${card.w}mm`,
        height: `${card.h}mm`,
        border: `${card.strokeW}mm solid ${card.stroke}`,
        borderRadius: `${card.radius}mm`,
        boxSizing: "border-box",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {/* 背面画像 */}
      <img
        src="/images/meishi_omote.png"
        alt="omote background"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* ロゴ */}
      <img
        src={data.logoImage}
        alt="logo"
        style={{
          position: "absolute",
          left: `${L.padL}mm`,
          top: `${L.padT}mm`,
          width: `${L.logoSize}mm`,
          height: `${L.logoSize}mm`,
          objectFit: "contain",
          background: "transparent",
          zIndex: 10,
        }}
      />

      {/* 氏名（右寄せ） */}
      <div
        style={{
          position: "absolute",
          right: `${L.nameRightPad}mm`,
          top: `${L.nameTop}mm`,
          textAlign: "right",
          color: "#111",
          fontWeight: 600,
          fontSize: `${L.nameFont}pt`,
          lineHeight: 1.05,
          whiteSpace: "nowrap",
          zIndex: 10,
        }}
      >
        {data.personName}
        <div
          style={{
            marginTop: `${L.romanTopGap}mm`,
            fontSize: `${L.romanFont}pt`,
            fontWeight: 500,
            color: "#777",
            letterSpacing: "0.02em",
          }}
        >
          {data.personNameRoman}
        </div>
      </div>

      {/* クライアント名（左揃え） */}
      <div
        style={{
          position: "absolute",
          left: `${L.padL}mm`,
          top: `${L.clientTop}mm`,
          textAlign: "left",
          fontSize: `${L.clientFont}pt`,
          fontWeight: 500,
          color: "#6a6a6a",
          letterSpacing: "0.04em",
          whiteSpace: "nowrap",
          zIndex: 10,
        }}
      >
        {data.clientName}
      </div>

      {/* 下部カラー（おもて：58→33） */}
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: `${barY}mm`,
          width: `${L.barLeftW}mm`,
          height: `${L.barH}mm`,
          background: data.colorPrimary,
          zIndex: 5,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${L.barLeftW}mm`,
          top: `${barY}mm`,
          width: `${L.barRightW}mm`,
          height: `${L.barH}mm`,
          background: data.colorSecondary,
          zIndex: 5,
        }}
      />
    </div>
  );
}

/** うら面 */
function MeishiBack({
  x,
  y,
  card,
  data,
}: {
  x: number;
  y: number;
  card: { w: number; h: number; radius: number; stroke: string; strokeW: number };
  data: ProjectDataP07;
}) {
  const L = {
    nameTop: 12.00,
    nameFont: 15,

    clientTop: 37.97,
    clientFont: 9,

    barH: 3.01,
    barLeftW: 33.0,
    barRightW: 58.0,
  };

  const barY = card.h - L.barH;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}mm`,
        top: `${y}mm`,
        width: `${card.w}mm`,
        height: `${card.h}mm`,
        border: `${card.strokeW}mm solid ${card.stroke}`,
        borderRadius: `${card.radius}mm`,
        boxSizing: "border-box",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {/* 背面画像 */}
      <img
        src="/images/meishi_ura.png"
        alt="ura background"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* ローマ字（センター） */}
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: `${L.nameTop}mm`,
          width: "100%",
          textAlign: "center",
          color: "#111",
          fontWeight: 500,
          fontSize: `${L.nameFont}pt`,
          lineHeight: 1.05,
          whiteSpace: "nowrap",
          zIndex: 10,
        }}
      >
        {data.personNameRoman}
      </div>

      {/* クライアント名（センター） */}
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: `${L.clientTop}mm`,
          width: "100%",
          textAlign: "center",
          fontSize: `${L.clientFont}pt`,
          fontWeight: 500,
          color: "#6a6a6a",
          letterSpacing: "0.04em",
          whiteSpace: "nowrap",
          zIndex: 10,
        }}
      >
        {data.clientName}
      </div>

      {/* 下部カラー（うら：33→58 ※スクショの左右反転に合わせる） */}
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: `${barY}mm`,
          width: `${L.barLeftW}mm`,
          height: `${L.barH}mm`,
          background: data.colorSecondary,
          zIndex: 5,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${L.barLeftW}mm`,
          top: `${barY}mm`,
          width: `${L.barRightW}mm`,
          height: `${L.barH}mm`,
          background: data.colorPrimary,
          zIndex: 5,
        }}
      />
    </div>
  );
}