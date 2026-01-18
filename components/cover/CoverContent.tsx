import React from "react";
import Watermark from "../pdf/Watermark";
import { P02HeaderBand } from "../pdf/P02HeaderBand";
import { P02Footer } from "../pdf/P02Footer";
import type { ProjectData, ProjectDataP01, ProjectCommon } from "../../types/ProjectData";
import { convertToLegacyCoverData } from "../../types/ProjectData";

// 既存互換性のためのCoverContentData型（段階移行用）
export type CoverContentData = {
  clientName: string;
  dateText: string;
  docTitleRight: string;
  pageNoText: string; // "COVER" or "P01"
  
  // ★追加：表紙6画像（差し替え専用）
  coverImages: {
    image1: string;
    image2: string;
    image3: string;
    image4: string;
    image5: string;
    image6: string;
  };
};

// 新統合スキーマ対応のProps
export type CoverContentProps = {
  // 新ProjectData形式（推奨）
  projectData?: ProjectData;
  
  // 既存互換性（段階移行用）
  data?: CoverContentData;
  
  // 個別指定での上書き対応
  overrides?: {
    common?: Partial<ProjectCommon>;
    p01?: Partial<ProjectDataP01>;
  };
  
  watermark?: boolean;
};

export default function CoverContent({
  projectData,
  data,
  overrides,
  watermark = false,
}: CoverContentProps) {
  // デフォルトデータ
  const defaultData: CoverContentData = {
    clientName: "豊泉工務店",
    dateText: "2026.01.17",
    docTitleRight: "ロゴデザインおよびイメージのご提案",
    pageNoText: "COVER",
    coverImages: {
      image1: "/images/cover_01.jpg",
      image2: "/images/cover_02.jpg",
      image3: "/images/cover_03.jpg",
      image4: "/images/cover_04.jpg",
      image5: "/images/cover_05.jpg",
      image6: "/images/cover_06.jpg",
    },
  };

  // 新ProjectDataからデータ取得
  let actualData: CoverContentData;
  let p01Data: ProjectDataP01;
  
  if (projectData) {
    // 新スキーマ使用
    actualData = convertToLegacyCoverData(projectData.common, projectData.p01);
    p01Data = { ...projectData.p01, ...overrides?.p01 };
  } else {
    // 既存互換モード
    actualData = data || defaultData;
    p01Data = {
      pageNoText: actualData.pageNoText as "COVER" | "P01",
      coverImages: {
        cover01: actualData.coverImages.image1,
        cover02: actualData.coverImages.image2,
        cover03: actualData.coverImages.image3,
        cover04: actualData.coverImages.image4,
        cover05: actualData.coverImages.image5,
        cover06: actualData.coverImages.image6,
      },
      titleTop: "HOFU style",
      titleMain: "ブランドロゴデザイン\nのご提案",
      subCopy: "豊泉工務店さまの新しいコミュニティ事業\n自社の強みを最大限に活かすデザイン!!",
      badgeText: "初稿",
    };
  }
  
  // ヘッダー用メタ情報
  const commonData: ProjectCommon = projectData
    ? { ...projectData.common, ...overrides?.common }
    : {
        clientName: actualData.clientName,
        dateText: actualData.dateText,
        docTitleRight: actualData.docTitleRight,
      };
  // =========================================================
  // ✅ P01表紙：CSS Grid + mm単位での精密レイアウト
  // =========================================================
  
  const coverStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "138.99mm 1fr",
    columnGap: "17.57mm",
    alignItems: "start",
    width: "297mm", // A4横幅
    height: "210mm", // A4縦幅
    position: "absolute",
    inset: 0,
    background: "#fff",
  };

  const coverLeftStyle: React.CSSProperties = {
    position: "relative",
    width: "138.99mm",
    height: "150mm",
    transform: "translate(22.69mm, 40.55mm)",
  };

  const coverImageStyle: React.CSSProperties = {
    position: "absolute",
    width: "58.11mm",
    height: "auto",
    display: "block",
  };

  // 全画像用のセンタートリミングスタイル（水平・垂直両方向）
  const centerImageStyle: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "58.11mm",
    height: "auto",
    display: "block",
  };

  // image2専用：コンテナに合わせて目一杯表示
  const image2Style: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "58.11mm",
    height: "57.93mm",
    objectFit: "cover",
    display: "block",
  };

  // トリミング用のコンテナスタイル
  const imageContainerStyle: React.CSSProperties = {
    position: "absolute",
    width: "58.11mm",
    overflow: "hidden", // 指定された高さでトリミング
  };

  // ===== 個別画像位置調整用定数 =====
  const IMAGE_POSITIONS = {
    // 左列（1、、、）
    image1: { left: "0mm", top: "0mm", height: "37.43mm" },
    image3: { left: "0mm", top: "40.68mm", height: "37.43mm" },
    image5: { left: "0mm", top: "81.36mm", height: "57.93mm" },
    // 右列（2、、、）
    image2: { left: "60.68mm", top: "0mm", height: "57.93mm" },
    image4: { left: "60.68mm", top: "61mm", height: "37.43mm" },
    image6: { left: "60.68mm", top: "101.36mm", height: "37.43mm" },
  };

  const coverRightStyle: React.CSSProperties = {
    position: "relative",
  };

  const draftBadgeStyle: React.CSSProperties = {
    position: "absolute",
    top: "30.09mm",
    right: "12mm",
    width: "29.18mm",
    height: "29.18mm",
    border: "1mm solid #C9A45C",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#C9A45C",
    fontWeight: 600,
    fontSize: "16pt",
  };

  const coverTitleStyle: React.CSSProperties = {
    fontSize: "28pt",
    color: "#6F6F6F",
    margin: 0,
    marginTop: "73.33mm",
    fontWeight: "normal",
  };

  const coverMainStyle: React.CSSProperties = {
    fontSize: "32pt",
    lineHeight: 1.4,
    color: "#6F6F6F",
    margin: 0,
    marginTop: "3.57mm",
    fontWeight: "normal",
  };

  const coverSubStyle: React.CSSProperties = {
    fontSize: "11pt",
    lineHeight: 1.8,
    color: "#6F6F6F",
    margin: 0,
    marginTop: "7.33mm",
  };

  return (
    <div style={coverStyle}>
      {watermark && <Watermark enabled={watermark} />}

      {/* ヘッダー共通 */}
      <P02HeaderBand
        clientName={commonData.clientName}
        dateText={commonData.dateText}
        docTitleRight={commonData.docTitleRight}
      />

      {/* 左：画像エリア */}
      <div style={coverLeftStyle}>
        <div style={{...imageContainerStyle, ...IMAGE_POSITIONS.image1}}>
          <img src={p01Data.coverImages.cover01} alt="cover 1" style={centerImageStyle} />
        </div>
        <div style={{...imageContainerStyle, ...IMAGE_POSITIONS.image2}}>
          <img src={p01Data.coverImages.cover02} alt="cover 2" style={image2Style} />
        </div>
        <div style={{...imageContainerStyle, ...IMAGE_POSITIONS.image3}}>
          <img src={p01Data.coverImages.cover03} alt="cover 3" style={centerImageStyle} />
        </div>
        <div style={{...imageContainerStyle, ...IMAGE_POSITIONS.image4}}>
          <img src={p01Data.coverImages.cover04} alt="cover 4" style={centerImageStyle} />
        </div>
        <div style={{...imageContainerStyle, ...IMAGE_POSITIONS.image5}}>
          <img src={p01Data.coverImages.cover05} alt="cover 5" style={centerImageStyle} />
        </div>
        <div style={{...imageContainerStyle, ...IMAGE_POSITIONS.image6}}>
          <img src={p01Data.coverImages.cover06} alt="cover 6" style={centerImageStyle} />
        </div>
      </div>

      {/* 右：テキスト */}
      <div style={coverRightStyle}>
        <div style={draftBadgeStyle}>{p01Data.badgeText}</div>

        <h1 style={coverTitleStyle}>{p01Data.titleTop}</h1>

        <h2 style={coverMainStyle}>
          {p01Data.titleMain.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < p01Data.titleMain.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>

        <p style={coverSubStyle}>
          {p01Data.subCopy.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < p01Data.subCopy.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      </div>

      {/* フッター共通 */}
      <P02Footer pageNo={p01Data.pageNoText} />
    </div>
  );
}