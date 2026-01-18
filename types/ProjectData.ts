// ================================================================================
// 🎯 最終ProjectDataスキーマ（P01〜P10統合・実装容易版）
// ================================================================================
// 実装方針：管理画面フォーム → JSON生成 → 全ページdataに流し込み

/** 画像は「URL文字列」で統一（/images/... でも https://... でもOK） */
export type ImageSrc = string;

// ----------------------------
// 共通（全ページヘッダー/フッター）
// ----------------------------
export type ProjectCommon = {
  clientName: string;      // 例: "豊泉工務店"
  dateText: string;        // 例: "2026.01.17"
  docTitleRight: string;   // 例: "ロゴデザインおよびイメージのご提案"
  watermark?: boolean;     // PDF確認用など（任意）
};

// ----------------------------
// P01（表紙）
// ----------------------------
export type ProjectDataP01 = {
  pageNoText: "COVER" | "P01";

  // 左 6枚（生成画像/差し替え）
  coverImages: {
    cover01: ImageSrc;
    cover02: ImageSrc;
    cover03: ImageSrc;
    cover04: ImageSrc;
    cover05: ImageSrc;
    cover06: ImageSrc;
  };

  // 右側テキスト（手入力で微調整できる前提）
  titleTop: string;        // 例: "HOFU style"
  titleMain: string;       // 例: "ブランドロゴデザイン\nのご提案"
  subCopy: string;         // 例: "豊泉工務店さまの新しいコミュニティ事業\n自社の強みを最大限に活かすデザイン!!"

  // バッジ
  badgeText?: string;      // 例: "初稿"（任意）
};

// ----------------------------
// P02（本文：目的）
// ※ここは既に出来上がっている前提なので、最低限の枠だけ
// ----------------------------
export type ProjectDataP02 = {
  pageNoText: "P02";
  conceptHeading?: string;     // 既存対応
  conceptBody?: string;        // 既存対応
  projectTitleLines: string[]; // Concept01Page用
  projectSubtitle: string;     // Concept01Page用
  stampText: string;          // Concept01Page用
  brandElements: Array<{      // Concept01Page用
    key: string;
    no: number;
    title: string;
    bullets: string[];
    pill: string;
  }>;
};

// ----------------------------
// P03（5カラム：キーワード/説明等）
// ----------------------------
export type ProjectDataP03 = {
  pageNoText: "P03";
  paragraphTop?: string;     // 既存対応
  paragraphBottom?: string;  // 既存対応
  sectionJp: string;        // Concept02Page用
  sectionEn: string;        // Concept02Page用
  elements: Array<{         // Concept02Page用
    key: string;
    no: number;
    title: string;
    bullets: string[];
    pill: string;
    copy?: string;
    images?: string[];
  }>;
};

// ----------------------------
// P04（5カラム：materialize）
// ----------------------------
export type ProjectDataP04 = {
  pageNoText: "P04";
  selectedElement?: {        // 既存対応
    key: string;
    title: string;
    description: string;
    detailImage?: ImageSrc;
  };
};

// ----------------------------
// P05（ロゴプロセス）
// ----------------------------
export type ProjectDataP05 = {
  pageNoText: "P05";
  selectedElement?: {        // 既存対応
    key: string;
    title: string;
    description: string;
    detailImage?: ImageSrc;
  };
};

// ----------------------------
// P06（Finish 6枚）
// ----------------------------
export type ProjectDataP06 = {
  pageNoText: "P06";
  finishImages: {
    finish01: ImageSrc; // "/images/finish_01.png" or S3 URL
    finish02: ImageSrc;
    finish03: ImageSrc;
    finish04: ImageSrc;
    finish05: ImageSrc;
    finish06: ImageSrc;
  };
  items?: Array<{            // 既存チェックリスト対応
    id: string;
    label: string;
    checked: boolean;
    image?: ImageSrc;
  }>;
};

// ----------------------------
// P07（名刺：表裏 + モックアップ）
// ----------------------------
export type ProjectDataP07 = {
  pageNoText: "P07";

  // フォーム入力
  personName: string;
  personNameRoman: string;

  // 画像
  logoImage: ImageSrc;     // 例: finish_01
  mockupImage: ImageSrc;   // 例: 合成済み名刺モックアップ

  // 抽出2色（P08にも流用）
  colorPrimary: string;    // "#RRGGBB"
  colorSecondary: string;  // "#RRGGBB"

  // 背景テンプレート（任意）
  frontBgImage?: ImageSrc;
  backBgImage?: ImageSrc;
};

// ----------------------------
// P08（封筒：ベロ階層 + 寸法）
// ※P07の2色・クライアント名/ローマ字など流用
// ----------------------------
export type ProjectDataP08 = {
  pageNoText: "P08";

  // ベロの逆さ文字は「ローマ字表記」を出したい
  clientNameRoman: string; // 例: "HOFU Style"

  // ロゴ（ベロ上に置く）
  logoOnFlap: ImageSrc;    // 例: finish_03

  // 敷き詰めロゴ（将来差し替え）
  tiledLogoImage: ImageSrc; // 例: "/images/futo_logo.png" or S3 URL

  // 表示制御
  envelopeDisplay?: {
    baseLineImage: ImageSrc;
    targetDisplayWidthMm?: number;
  };

  // その他アセット
  assets?: {
    whiteMask: ImageSrc;
    dimLineVertical: ImageSrc;
    dimLineHorizontal: ImageSrc;
    flapTextColor?: string;
  };

  clientTextJp?: string;   // 下部表示用
};

// ----------------------------
// P09（ステーショナリー：合成モックアップ1枚）
// ----------------------------
export type ProjectDataP09 = {
  pageNoText: "P09";
  stationeryMockup: ImageSrc; // 合成済み1枚
};

// ----------------------------
// P10（看板：3枚）
// ----------------------------
export type ProjectDataP10 = {
  pageNoText: "P10";
  signImages: {
    sign01: ImageSrc; // sign_01.jpg
    sign02: ImageSrc; // sign_02.jpg
    sign03: ImageSrc; // sign_03.jpg
  };
};

// ----------------------------
// 統合 ProjectData（P01〜P10）
// ----------------------------
export type ProjectData = {
  common: ProjectCommon;

  p01: ProjectDataP01;
  p02: ProjectDataP02;
  p03: ProjectDataP03;
  p04: ProjectDataP04;
  p05: ProjectDataP05;
  p06: ProjectDataP06;
  p07: ProjectDataP07;
  p08: ProjectDataP08;
  p09: ProjectDataP09;
  p10: ProjectDataP10;
};

// ================================================================================
// 既存型との互換性維持（段階移行用）
// ================================================================================

// 旧CoverContentData型（互換性維持）
export type CoverContentData = {
  clientName: string;
  dateText: string;
  docTitleRight: string;
  pageNoText: string;
  coverImages: {
    image1: string;
    image2: string;
    image3: string;
    image4: string;
    image5: string;
    image6: string;
  };
};

// ProjectData → CoverContentData変換（オーバーロード対応）
export function convertToLegacyCoverData(
  data: ProjectData
): CoverContentData;
export function convertToLegacyCoverData(
  common: ProjectCommon,
  p01: ProjectDataP01
): CoverContentData;
export function convertToLegacyCoverData(
  dataOrCommon: ProjectData | ProjectCommon,
  p01?: ProjectDataP01
): CoverContentData {
  if (p01) {
    // 2引数の場合
    const common = dataOrCommon as ProjectCommon;
    return {
      clientName: common.clientName,
      dateText: common.dateText,
      docTitleRight: common.docTitleRight,
      pageNoText: p01.pageNoText,
      coverImages: {
        image1: p01.coverImages.cover01,
        image2: p01.coverImages.cover02,
        image3: p01.coverImages.cover03,
        image4: p01.coverImages.cover04,
        image5: p01.coverImages.cover05,
        image6: p01.coverImages.cover06,
      }
    };
  } else {
    // 1引数の場合
    const data = dataOrCommon as ProjectData;
    return {
      clientName: data.common.clientName,
      dateText: data.common.dateText,
      docTitleRight: data.common.docTitleRight,
      pageNoText: data.p01.pageNoText,
      coverImages: {
        image1: data.p01.coverImages.cover01,
        image2: data.p01.coverImages.cover02,
        image3: data.p01.coverImages.cover03,
        image4: data.p01.coverImages.cover04,
        image5: data.p01.coverImages.cover05,
        image6: data.p01.coverImages.cover06,
      }
    };
  }
}

// デフォルトProjectData生成
export function createDefaultProjectData(): ProjectData {
  return {
    common: {
      clientName: "豊泉工務店",
      dateText: "2026.01.17",
      docTitleRight: "ロゴデザインおよびイメージのご提案",
    },
    p01: {
      pageNoText: "COVER",
      coverImages: {
        cover01: "/images/cover_01.jpg",
        cover02: "/images/cover_02.jpg",
        cover03: "/images/cover_03.jpg",
        cover04: "/images/cover_04.jpg",
        cover05: "/images/cover_05.jpg",
        cover06: "/images/cover_06.jpg",
      },
      titleTop: "HOFU style",
      titleMain: "ブランドロゴデザイン\nのご提案",
      subCopy: "豊泉工務店さまの新しいコミュニティ事業\n自社の強みを最大限に活かすデザイン!!",
      badgeText: "初稿",
    },
    p02: {
      pageNoText: "P02",
      conceptHeading: "Logo Design / VISUAL CONCEPT-01",
      conceptBody: "本文サンプル...",
      projectTitleLines: ["豊泉工務店", "ロゴデザインのご提案"],
      projectSubtitle: "HOFU style",
      stampText: "初稿",
      brandElements: [
        {
          key: "element1",
          no: 1,
          title: "信頼性",
          bullets: ["長年の実績", "地域密着", "品質重視"],
          pill: "TRUST"
        },
        {
          key: "element2",
          no: 2,
          title: "革新性",
          bullets: ["最新技術", "デザイン性", "機能性"],
          pill: "INNOVATION"
        }
      ]
    },
    p03: {
      pageNoText: "P03",
      paragraphTop: "コミュニティー事業「HOFU Style」を名称とした...",
      paragraphBottom: "以下の5つのエレメントからブランド構築し...",
      sectionJp: "ロゴデザインの方向性",
      sectionEn: "NEW VISUAL ELEMENT",
      elements: [
        {
          key: "direction1",
          no: 1,
          title: "モダンでシンプル",
          bullets: ["洗練されたデザイン", "分かりやすい形状"],
          pill: "MODERN",
          copy: "現代的で親しみやすいデザイン",
          images: ["/images/concept_01.jpg", "/images/concept_02.jpg"]
        }
      ],
    },
    p04: {
      pageNoText: "P04",
    },
    p05: {
      pageNoText: "P05",
    },
    p06: {
      pageNoText: "P06",
      finishImages: {
        finish01: "/images/finish_01.png",
        finish02: "/images/finish_02.png", 
        finish03: "/images/finish_03.png",
        finish04: "/images/finish_04.png",
        finish05: "/images/finish_05.png",
        finish06: "/images/finish_06.png",
      },
    },
    p07: {
      pageNoText: "P07",
      personName: "",
      personNameRoman: "",
      logoImage: "/images/finish_01.png",
      mockupImage: "/images/meishi_mockup.png",
      colorPrimary: "#556B2F",
      colorSecondary: "#7A4B2A",
    },
    p08: {
      pageNoText: "P08",
      clientNameRoman: "HOFU Style",
      logoOnFlap: "/images/finish_03.png",
      tiledLogoImage: "/images/futo_logo.png",
      envelopeDisplay: {
        baseLineImage: "/images/futo_black_line.png",
        targetDisplayWidthMm: 184,
      },
      assets: {
        whiteMask: "/images/futo_white.png",
        dimLineVertical: "/images/futo_line_120.png",
        dimLineHorizontal: "/images/futo_line_235.png",
        flapTextColor: "#fff",
      },
    },
    p09: {
      pageNoText: "P09",
      stationeryMockup: "/images/stationeries_01.jpg",
    },
    p10: {
      pageNoText: "P10",
      signImages: {
        sign01: "/images/sign_01.jpg",
        sign02: "/images/sign_02.jpg",
        sign03: "/images/sign_03.jpg",
      },
    },
  };
}

// 統合ProjectData → 各コンポーネント用データ変換関数

// Concept01Page用（P02）の変換
export function convertToConcept01Data(data: ProjectData): any {
  return {
    clientName: data.common.clientName,
    dateText: data.common.dateText,
    docTitleRight: data.common.docTitleRight,
    projectTitleLines: data.p02.projectTitleLines,
    projectSubtitle: data.p02.projectSubtitle,
    stampText: data.p02.stampText,
    pageNoText: data.p02.pageNoText,
    brandElements: data.p02.brandElements,
  };
}

// Concept02Page用（P03）の変換
export function convertToConcept02Data(data: ProjectData): any {
  return {
    clientName: data.common.clientName,
    dateText: data.common.dateText,
    docTitleRight: data.common.docTitleRight,
    sectionJp: data.p03.sectionJp,
    sectionEn: data.p03.sectionEn,
    elements: data.p03.elements,
  };
}

// Concept03Page用（P04）の変換
export function convertToConcept03Data(data: ProjectData): any {
  return {
    clientName: data.common.clientName,
    dateText: data.common.dateText,
    docTitleRight: data.common.docTitleRight,
    pageNoText: data.p04.pageNoText,
    selectedElement: data.p04.selectedElement,
  };
}

// Concept04Page用（P05）の変換
export function convertToConcept04Data(data: ProjectData): any {
  return {
    clientName: data.common.clientName,
    dateText: data.common.dateText,
    docTitleRight: data.common.docTitleRight,
    pageNoText: data.p05.pageNoText,
    selectedElement: data.p05.selectedElement,
  };
}