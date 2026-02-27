"use client";

import EditorHeader from "@/components/admin/EditorHeader";
import FormSidebar, { type SeoData } from "@/components/admin/FormSidebar";

interface EditorLayoutProps {
  // Header
  backHref: string;
  headerTitle: string;
  subtitle: string;
  status: "draft" | "published";
  onStatusChange: (s: "draft" | "published") => void;
  isEdit: boolean;
  isSaving?: boolean;
  onSaveDraft: () => void;
  onPublish: () => void;

  // Sidebar
  sidebarTitle: string;
  seo: SeoData;
  onSeoChange: (field: keyof SeoData, value: string) => void;
  focusKeyword: string;
  onFocusKeywordChange: (value: string) => void;
  content: string;
  postTitle: string;
  hasMedia?: boolean;
  onAiSeoOptimize?: () => void;

  // Slots
  children: React.ReactNode;
  sidebarChildren: React.ReactNode;
}

export default function EditorLayout({
  backHref,
  headerTitle,
  subtitle,
  status,
  onStatusChange,
  isEdit,
  isSaving,
  onSaveDraft,
  onPublish,
  sidebarTitle,
  seo,
  onSeoChange,
  focusKeyword,
  onFocusKeywordChange,
  content,
  postTitle,
  hasMedia,
  onAiSeoOptimize,
  children,
  sidebarChildren,
}: EditorLayoutProps) {
  return (
    <div>
      <EditorHeader
        backHref={backHref}
        title={headerTitle}
        subtitle={subtitle}
        status={status}
        onStatusChange={onStatusChange}
        isEdit={isEdit}
        isSaving={isSaving}
        onSaveDraft={onSaveDraft}
        onPublish={onPublish}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
        {/* Left — Main Content */}
        <div className="space-y-5">{children}</div>

        {/* Right — Sidebar */}
        <FormSidebar
          title={sidebarTitle}
          seo={seo}
          onSeoChange={onSeoChange}
          focusKeyword={focusKeyword}
          onFocusKeywordChange={onFocusKeywordChange}
          content={content}
          postTitle={postTitle}
          hasMedia={hasMedia}
          onAiSeoOptimize={onAiSeoOptimize}
        >
          {sidebarChildren}
        </FormSidebar>
      </div>
    </div>
  );
}
