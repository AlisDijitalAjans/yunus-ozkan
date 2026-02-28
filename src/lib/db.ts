import { createClient, type Row } from "@libsql/client";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export default db;

// ─── Schema ────────────────────────────────────────────────────

export async function initDb() {
  await db.batch([
    `CREATE TABLE IF NOT EXISTS blog_posts (
      slug             TEXT PRIMARY KEY,
      title            TEXT NOT NULL,
      excerpt          TEXT NOT NULL,
      image            TEXT NOT NULL,
      date             TEXT NOT NULL,
      category         TEXT NOT NULL,
      reading_time     TEXT NOT NULL DEFAULT '5 dk okuma',
      author           TEXT NOT NULL DEFAULT 'Yunus Özkan İnşaat Ekibi',
      sections         TEXT NOT NULL DEFAULT '[]',
      ai_analysis      TEXT NOT NULL DEFAULT '{}',
      faqs             TEXT DEFAULT '[]',
      html_content     TEXT DEFAULT '',
      focus_keyword    TEXT DEFAULT '',
      status           TEXT NOT NULL DEFAULT 'published',
      meta_title       TEXT DEFAULT '',
      meta_description TEXT DEFAULT '',
      created_at       TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS services (
      id               TEXT PRIMARY KEY,
      title            TEXT NOT NULL,
      "desc"           TEXT NOT NULL,
      image            TEXT NOT NULL,
      features         TEXT NOT NULL DEFAULT '[]',
      media_type       TEXT DEFAULT NULL,
      html_content     TEXT DEFAULT '',
      faqs             TEXT DEFAULT '[]',
      focus_keyword    TEXT DEFAULT '',
      status           TEXT NOT NULL DEFAULT 'published',
      meta_title       TEXT DEFAULT '',
      meta_description TEXT DEFAULT '',
      slug             TEXT DEFAULT '',
      sort_order       INTEGER NOT NULL DEFAULT 0,
      created_at       TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS projects (
      id               TEXT PRIMARY KEY,
      title            TEXT NOT NULL,
      video            TEXT NOT NULL DEFAULT '',
      image            TEXT DEFAULT '',
      description      TEXT NOT NULL,
      category         TEXT NOT NULL,
      location         TEXT NOT NULL DEFAULT 'Kayseri',
      html_content     TEXT DEFAULT '',
      faqs             TEXT DEFAULT '[]',
      focus_keyword    TEXT DEFAULT '',
      status           TEXT NOT NULL DEFAULT 'published',
      meta_title       TEXT DEFAULT '',
      meta_description TEXT DEFAULT '',
      slug             TEXT DEFAULT '',
      sort_order       INTEGER NOT NULL DEFAULT 0,
      created_at       TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS gallery (
      id               TEXT PRIMARY KEY,
      src              TEXT NOT NULL,
      title            TEXT NOT NULL,
      category         TEXT NOT NULL,
      sort_order       INTEGER NOT NULL DEFAULT 0,
      created_at       TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS site_settings (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )`,
  ]);
}

// ─── JSON parse helper ─────────────────────────────────────────

function jsonParse<T>(val: unknown, fallback: T): T {
  if (!val || val === "") return fallback;
  try {
    return JSON.parse(String(val));
  } catch {
    return fallback;
  }
}

// ─── Row Mappers ───────────────────────────────────────────────

export interface DbBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  readingTime: string;
  author: string;
  sections: unknown[];
  aiAnalysis: { summary: string; keyPoints: string[]; relatedTopics: string[] };
  faqs: { question: string; answer: string }[];
  htmlContent: string;
  focusKeyword: string;
  status: string;
  metaTitle: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
}

export function rowToBlogPost(row: Row): DbBlogPost {
  return {
    slug: String(row.slug),
    title: String(row.title),
    excerpt: String(row.excerpt),
    image: String(row.image),
    date: String(row.date),
    category: String(row.category),
    readingTime: String(row.reading_time),
    author: String(row.author),
    sections: jsonParse(row.sections, []),
    aiAnalysis: jsonParse(row.ai_analysis, {
      summary: "",
      keyPoints: [],
      relatedTopics: [],
    }),
    faqs: jsonParse(row.faqs, []),
    htmlContent: String(row.html_content || ""),
    focusKeyword: String(row.focus_keyword || ""),
    status: String(row.status),
    metaTitle: String(row.meta_title || ""),
    metaDescription: String(row.meta_description || ""),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export interface DbService {
  id: string;
  title: string;
  desc: string;
  image: string;
  features: string[];
  mediaType: string | null;
  htmlContent: string;
  faqs: { question: string; answer: string }[];
  focusKeyword: string;
  status: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export function rowToService(row: Row): DbService {
  return {
    id: String(row.id),
    title: String(row.title),
    desc: String(row.desc),
    image: String(row.image),
    features: jsonParse(row.features, []),
    mediaType: row.media_type ? String(row.media_type) : null,
    htmlContent: String(row.html_content || ""),
    faqs: jsonParse(row.faqs, []),
    focusKeyword: String(row.focus_keyword || ""),
    status: String(row.status),
    metaTitle: String(row.meta_title || ""),
    metaDescription: String(row.meta_description || ""),
    slug: String(row.slug || ""),
    sortOrder: Number(row.sort_order || 0),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export interface DbProject {
  id: string;
  title: string;
  video: string;
  image: string;
  description: string;
  category: string;
  location: string;
  htmlContent: string;
  faqs: { question: string; answer: string }[];
  focusKeyword: string;
  status: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export function rowToProject(row: Row): DbProject {
  return {
    id: String(row.id),
    title: String(row.title),
    video: String(row.video || ""),
    image: String(row.image || ""),
    description: String(row.description),
    category: String(row.category),
    location: String(row.location),
    htmlContent: String(row.html_content || ""),
    faqs: jsonParse(row.faqs, []),
    focusKeyword: String(row.focus_keyword || ""),
    status: String(row.status),
    metaTitle: String(row.meta_title || ""),
    metaDescription: String(row.meta_description || ""),
    slug: String(row.slug || ""),
    sortOrder: Number(row.sort_order || 0),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export interface DbGalleryItem {
  id: string;
  src: string;
  title: string;
  category: string;
  sortOrder: number;
  createdAt: string;
}

export function rowToGalleryItem(row: Row): DbGalleryItem {
  return {
    id: String(row.id),
    src: String(row.src),
    title: String(row.title),
    category: String(row.category),
    sortOrder: Number(row.sort_order || 0),
    createdAt: String(row.created_at),
  };
}
