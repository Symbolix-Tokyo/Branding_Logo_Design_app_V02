export type CoverImageRole =
  | "hero_main"
  | "hero_secondary"
  | "work_process"
  | "people_scene"
  | "place_space"
  | "detail_texture";

export type ElementKey = "value" | "promise" | "proof" | "tone" | "nature";

export type ElementItem = {
  key: ElementKey;
  no: number;
  title: string;
  bullets: string[];
  pill: string;
  copy?: string;  // P03用: コピーテキスト
  images?: Array<{ src: string; alt: string }>;  // P03用: イメージインスピレーション
};

export type PdfData = {
  clientName: string;
  dateText: string;
  docTitleRight: string;

  projectTitleLines: string[]; // ["HOFU style","ブランドロゴデザイン","のご提案"]
  projectSubtitle: string;

  stampText: string;

  conceptHeading: string;
  conceptBody: string;

  elements: ElementItem[];

  coverImages: Array<{ role: CoverImageRole; src: string; alt?: string }>;
};