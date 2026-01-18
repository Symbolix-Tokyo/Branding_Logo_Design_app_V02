export const tokens = {
  // A4横（mm固定）
  page: {
    w: "297mm",
    h: "210mm"
  },

  color: {
    text: "#707070",
    gold: "#D3A254",
    line: "#DCDCDC",
    white: "#FFFFFF",
    pillBg: "#6B6B6B"
  },

  font: {
    jp: `"Noto Sans JP", system-ui, sans-serif`,
    din: `"DIN 2014", system-ui, sans-serif`
  },

  // P02（確定）
  p02: {
    heading: {
      left: 313,
      top: 292,
      width: 995,
      height: 80,
      fontSize: 60,
      letterSpacing: 3
    },
    bodyBox: {
      left: 151,
      top: 455,
      width: 3730,
      // ★ここが「本文は無制限」でも崩れない要
      // ここに収まる分だけ本文を入れて、溢れたら本文だけ次ページへ
      maxHeight: 772
    },
    elementsBlock: {
      left: 407,
      top: 1207,
      width: 3474,
      height: 935
    },
    bottomSafe: 120,

    pill: {
      maxLines: 2,
      fontSize: 28, // ※必要なら後で調整
      lineHeight: 1.4,
      paddingY: 14,
      paddingX: 24,
      radius: 999
    }
  },

  // スタンプ（確定）
  stamp: {
    size: 400,
    top: 359,
    left: 3575,
    text: {
      fontSize: 80,
      letterSpacing: 16
    }
  },

  // P01はあとであなたのP01 "specs" から値を入れ替える前提で枠だけ用意
  p01: {
    grid: {
      // 6画像グリッド（ここはP01の数値で確定させてください）
      left: 313,
      top: 520,
      width: 1500,
      height: 1900,
      gap: 40,
      radius: 40
    }
  }
} as const;