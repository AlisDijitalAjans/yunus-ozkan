import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db, { initDb } from "@/lib/db";
import { blogPosts } from "@/data/blogPosts";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { galleryItems } from "@/data/gallery";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Create tables
    await initDb();

    const counts = { blog: 0, services: 0, projects: 0, gallery: 0 };

    // Seed blog posts
    const existingBlogs = await db.execute("SELECT COUNT(*) as c FROM blog_posts");
    if (Number(existingBlogs.rows[0].c) === 0) {
      for (const post of blogPosts) {
        await db.execute({
          sql: `INSERT INTO blog_posts (slug, title, excerpt, image, date, category, reading_time, author, sections, ai_analysis, faqs, html_content, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published')`,
          args: [
            post.slug,
            post.title,
            post.excerpt,
            post.image,
            post.date,
            post.category,
            post.readingTime,
            post.author,
            JSON.stringify(post.sections),
            JSON.stringify(post.aiAnalysis),
            JSON.stringify(post.faqs || []),
            post.htmlContent || "",
          ],
        });
      }
      counts.blog = blogPosts.length;
    }

    // Seed services
    const existingServices = await db.execute("SELECT COUNT(*) as c FROM services");
    if (Number(existingServices.rows[0].c) === 0) {
      for (let i = 0; i < services.length; i++) {
        const s = services[i];
        await db.execute({
          sql: `INSERT INTO services (id, title, "desc", image, features, media_type, html_content, faqs, status, sort_order)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'published', ?)`,
          args: [
            s.id,
            s.title,
            s.desc,
            s.image,
            JSON.stringify(s.features),
            s.mediaType || null,
            s.htmlContent || "",
            JSON.stringify(s.faqs || []),
            i,
          ],
        });
      }
      counts.services = services.length;
    }

    // Seed projects
    const existingProjects = await db.execute("SELECT COUNT(*) as c FROM projects");
    if (Number(existingProjects.rows[0].c) === 0) {
      for (let i = 0; i < projects.length; i++) {
        const p = projects[i];
        await db.execute({
          sql: `INSERT INTO projects (id, title, video, description, category, location, html_content, faqs, status, sort_order)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'published', ?)`,
          args: [
            p.id,
            p.title,
            p.video,
            p.description,
            p.category,
            p.location,
            p.htmlContent || "",
            JSON.stringify(p.faqs || []),
            i,
          ],
        });
      }
      counts.projects = projects.length;
    }

    // Seed gallery
    const existingGallery = await db.execute("SELECT COUNT(*) as c FROM gallery");
    if (Number(existingGallery.rows[0].c) === 0) {
      for (let i = 0; i < galleryItems.length; i++) {
        const g = galleryItems[i];
        await db.execute({
          sql: `INSERT INTO gallery (id, src, title, category, sort_order)
                VALUES (?, ?, ?, ?, ?)`,
          args: [g.id, g.src, g.title, g.category, i],
        });
      }
      counts.gallery = galleryItems.length;
    }

    // Seed site settings
    const existingSettings = await db.execute("SELECT COUNT(*) as c FROM site_settings");
    if (Number(existingSettings.rows[0].c) === 0) {
      const defaultSettings = [
        ["company_name", "Yunus Özkan İnşaat"],
        ["phone", "0533 771 11 82"],
        ["phone_raw", "905337711182"],
        ["email", "info@yunusozkaninsaat.com"],
        ["address", "Kayseri, Türkiye"],
      ];
      for (const [key, value] of defaultSettings) {
        await db.execute({
          sql: "INSERT INTO site_settings (key, value) VALUES (?, ?)",
          args: [key, value],
        });
      }
    }

    return NextResponse.json({ success: true, counts });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Seed failed" },
      { status: 500 }
    );
  }
}
