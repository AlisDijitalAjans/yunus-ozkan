"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  badge: string;
  title: string;
  highlight: string;
  description: string;
}

export default function PageHeader({ badge, title, highlight, description }: PageHeaderProps) {
  return (
    <section className="pt-36 pb-8 md:pt-40 md:pb-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl text-center mx-auto"
        >
          <span className="inline-block glass rounded-full text-primary-gold font-semibold py-1.5 px-4 text-sm mb-4">
            {badge}
          </span>
          <h1 className="font-bold text-theme-text text-fluid-section mb-5">
            {title} <span className="text-gradient-gold">{highlight}</span>
          </h1>
          <p className="text-theme-text-secondary leading-relaxed text-lg">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
