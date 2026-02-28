"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
interface BlogListItem {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

interface BlogContentProps {
  posts: BlogListItem[];
}

export default function BlogContent({ posts }: BlogContentProps) {
  return (
    <section className="section-padding pt-0">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass group overflow-hidden border border-transparent hover:border-primary-gold/50 transition-[border-color] duration-500 cursor-pointer rounded-2xl h-full"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[16/10]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="glass text-primary-gold text-xs font-semibold py-1 px-3 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Date */}
                <div className="flex items-center gap-2 text-theme-text-muted text-sm mb-3">
                  <Calendar className="size-4" />
                  <span>{post.date}</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-theme-text group-hover:text-primary-gold transition-colors duration-300 text-lg mb-2.5 line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-theme-text-muted leading-relaxed text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <span className="text-primary-gold font-semibold group-hover:translate-x-1 transition-transform duration-300 text-sm inline-flex items-center gap-1.5">
                  Devamını Oku
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
