"use client";

import React, { useState, useEffect, useCallback } from "react";
import { PortfolioDatabase } from "@/data/initial-data";
import { ProjectDetailData, EducationItem, WorkExperienceItem, SkillCategory } from "@/types";
import {
  Lock,
  LogOut,
  Save,
  Plus,
  Trash2,
  AlertCircle,
  Layers,
  GraduationCap,
  Briefcase,
  User,
  RefreshCw,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Wrench,
  Globe,
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  // Content state
  const [content, setContent] = useState<PortfolioDatabase | null>(null);
  const [activeTab, setActiveTab] = useState<"projects" | "profile" | "skills" | "experience" | "education">("projects");
  const [saveStatus, setSaveStatus] = useState<{ message: string; type: "success" | "error" | null }>({
    message: "",
    type: null,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(false);

  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/content");
      if (res.ok) {
        const data = await res.json();
        if (data._storageInfo?.isSupabaseConfigured) {
          setIsSupabaseConnected(true);
        }
        setContent(data);
      }
    } catch {
      setSaveStatus({ message: "ডেটা লোড করতে সমস্যা হয়েছে", type: "error" });
    }
  }, []);

  // Check auth session on load
  useEffect(() => {
    let isMounted = true;
    async function initAuth() {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (isMounted) {
          setIsAuthenticated(data.isAuthenticated);
          if (data.isAuthenticated) {
            const contentRes = await fetch("/api/admin/content");
            if (contentRes.ok) {
              const contentData = await contentRes.json();
              if (isMounted) setContent(contentData);
            }
          }
        }
      } catch {
        if (isMounted) setIsAuthenticated(false);
      }
    }
    initAuth();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAuth(true);
    setAuthError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsAuthenticated(true);
        fetchContent();
      } else {
        setAuthError(data.error || "পাসওয়ার্ড সঠিক নয়");
      }
    } catch {
      setAuthError("লগইন রিকোয়েস্টে সমস্যা হয়েছে");
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAuthenticated(false);
    setPasswordInput("");
  };

  const handleSave = async () => {
    if (!content) return;
    setIsSaving(true);
    setSaveStatus({ message: "সংরক্ষণ করা হচ্ছে...", type: null });

    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      const data = await res.json();
      if (res.ok) {
        const destination = data.target === "supabase-cloud" ? "Supabase ক্লাউড ডেটাবেস" : "লোকাল ফাইল স্টোরেজ";
        setSaveStatus({
          message: `সব ডেটা সফলভাবে ${destination}-এ সংরক্ষিত হয়েছে! (Live updated)`,
          type: "success",
        });
        setTimeout(() => setSaveStatus({ message: "", type: null }), 4500);
      } else {
        setSaveStatus({ message: data.error || "সেভ করতে সমস্যা হয়েছে", type: "error" });
      }
    } catch {
      setSaveStatus({ message: "সার্ভারে কানেক্ট করতে ব্যর্থ হয়েছে", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  // Profile handlers
  const updateProfileField = (field: keyof PortfolioDatabase["personalInfo"], value: string) => {
    if (!content) return;
    setContent({
      ...content,
      personalInfo: {
        ...content.personalInfo,
        [field]: value,
      },
    });
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !content) return;

    setIsUploading(true);
    setSaveStatus({ message: "ছবি আপলোড হচ্ছে...", type: null });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        updateProfileField("profileImagePath", data.url);
        setSaveStatus({
          message: "ছবি সফলভাবে আপলোড হয়েছে! পরিবর্তন স্থায়ী করতে 'পরিবর্তন সেভ করুন'-এ চাপ দিন।",
          type: "success",
        });
      } else {
        setSaveStatus({ message: data.error || "ছবি আপলোড করতে ব্যর্থ হয়েছে", type: "error" });
      }
    } catch {
      setSaveStatus({ message: "ছবি আপলোডে নেটওয়ার্ক সমস্যা হয়েছে", type: "error" });
    } finally {
      setIsUploading(false);
    }
  };

  // Project handlers
  const updateProject = (index: number, field: keyof ProjectDetailData, value: unknown) => {
    if (!content) return;
    const updated = [...content.projects];
    updated[index] = { ...updated[index], [field]: value };
    setContent({ ...content, projects: updated });
  };

  const addProject = () => {
    if (!content) return;
    const newProject: ProjectDetailData = {
      slug: `new-project-${Date.now()}`,
      title: "নতুন প্রজেক্টের নাম",
      tagline: "প্রজেক্টের এক লাইনের বিবরণ",
      category: "Mobile Application",
      status: "in-development",
      isFeatured: true,
      role: "Lead Developer",
      timeline: "Ongoing",
      summary: "প্রজেক্টের সারসংক্ষেপ...",
      verifiedProblem: "প্রজেক্টটি কোন সমস্যার সমাধান করে...",
      verifiedSolution: "কীভাবে সমাধান করা হয়েছে...",
      keyFeatures: ["ফিচার ১", "ফিচার ২"],
      architecturalDecisions: ["টেকনিক্যাল সিদ্ধান্ত ১"],
      challenges: [{ challenge: "সমস্যা...", solution: "সমাধান..." }],
      knownLimitations: ["বর্তমান সীমাবদ্ধতা..."],
      techStack: {
        core: ["Flutter", "Dart"],
        secondary: ["SQLite"],
      },
      links: {
        github: "https://github.com/Sadihasnat91",
      },
    };
    setContent({ ...content, projects: [newProject, ...content.projects] });
  };

  const deleteProject = (index: number) => {
    if (!content) return;
    if (confirm("আপনি কি নিশ্চিত এই প্রজেক্টটি ডিলিট করতে চান?")) {
      const updated = content.projects.filter((_, i) => i !== index);
      setContent({ ...content, projects: updated });
    }
  };

  // Education handlers
  const updateEducation = (index: number, field: keyof EducationItem, value: string) => {
    if (!content) return;
    const updated = [...content.education];
    updated[index] = { ...updated[index], [field]: value };
    setContent({ ...content, education: updated });
  };

  const addEducation = () => {
    if (!content) return;
    const newEdu: EducationItem = {
      degree: "ডিগ্রির নাম",
      institution: "প্রতিষ্ঠানের নাম",
      year: "২০২৬",
      field: "মেজর বিষয়",
    };
    setContent({ ...content, education: [...content.education, newEdu] });
  };

  const deleteEducation = (index: number) => {
    if (!content) return;
    setContent({
      ...content,
      education: content.education.filter((_, i) => i !== index),
    });
  };

  // Experience handlers
  const updateExperience = (index: number, field: keyof WorkExperienceItem, value: unknown) => {
    if (!content) return;
    const updated = [...content.experience];
    updated[index] = { ...updated[index], [field]: value };
    setContent({ ...content, experience: updated });
  };

  const addExperience = () => {
    if (!content) return;
    const newExp: WorkExperienceItem = {
      role: "Software Engineer",
      company: "Company Name",
      location: "Khulna, Bangladesh",
      period: "Current Role",
      focus: ["দায়িত্ব ১", "দায়িত্ব ২"],
    };
    setContent({ ...content, experience: [...content.experience, newExp] });
  };

  const deleteExperience = (index: number) => {
    if (!content) return;
    setContent({
      ...content,
      experience: content.experience.filter((_, i) => i !== index),
    });
  };

  // Skills handlers
  const updateSkillCategory = (catIdx: number, field: keyof SkillCategory, value: unknown) => {
    if (!content) return;
    const updated = [...content.skills];
    updated[catIdx] = { ...updated[catIdx], [field]: value };
    setContent({ ...content, skills: updated });
  };

  const addSkillCategory = () => {
    if (!content) return;
    const newCat: SkillCategory = {
      category: "নতুন ক্যাটেগরি",
      description: "ক্যাটেগরির বিবরণ...",
      skills: [
        {
          name: "নতুন স্কিল",
          verifiedContext: "কোথায় ব্যবহার করা হয়েছে...",
          badge: "Core",
        },
      ],
    };
    setContent({ ...content, skills: [...content.skills, newCat] });
  };

  const deleteSkillCategory = (catIdx: number) => {
    if (!content) return;
    setContent({
      ...content,
      skills: content.skills.filter((_, i) => i !== catIdx),
    });
  };

  const addSkillItem = (catIdx: number) => {
    if (!content) return;
    const updated = [...content.skills];
    updated[catIdx].skills.push({
      name: "নতুন প্রযুক্তি",
      verifiedContext: "ব্যবহারের বিবরণ...",
      badge: "Production",
    });
    setContent({ ...content, skills: updated });
  };

  const updateSkillItem = (
    catIdx: number,
    skillIdx: number,
    field: "name" | "verifiedContext" | "badge",
    value: string
  ) => {
    if (!content) return;
    const updated = [...content.skills];
    const catSkills = [...updated[catIdx].skills];
    catSkills[skillIdx] = { ...catSkills[skillIdx], [field]: value };
    updated[catIdx] = { ...updated[catIdx], skills: catSkills };
    setContent({ ...content, skills: updated });
  };

  const deleteSkillItem = (catIdx: number, skillIdx: number) => {
    if (!content) return;
    const updated = [...content.skills];
    updated[catIdx].skills = updated[catIdx].skills.filter((_, i) => i !== skillIdx);
    setContent({ ...content, skills: updated });
  };

  // 1. Loading State
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#090B10] flex items-center justify-center text-[#9AA5B5]">
        <div className="flex items-center gap-3 font-mono text-sm">
          <RefreshCw className="w-5 h-5 animate-spin text-[#C5F467]" />
          <span>অ্যাডমিন সেশন যাচাই করা হচ্ছে...</span>
        </div>
      </div>
    );
  }

  // 2. Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#090B10]">
        <div className="w-full max-w-md rounded-2xl border border-[#29313C] bg-[#121720] p-8 shadow-2xl">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#090B10] border border-[#29313C] flex items-center justify-center text-[#C5F467] mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-[#F5F7FA] font-[family-name:var(--font-heading)]">
              অ্যাডমিন প্যানেল লগইন
            </h1>
            <p className="text-xs text-[#9AA5B5] mt-2">
              পোর্টফোলিওর প্রজেক্ট, স্কিল ও প্রোফাইল ডেটা ম্যানেজ করতে পাসওয়ার্ড লিখুন।
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#9AA5B5] block mb-2">
                অ্যাডমিন পাসওয়ার্ড
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="পাসওয়ার্ড দিন..."
                className="w-full px-4 py-3 rounded-lg bg-[#090B10] border border-[#29313C] text-[#F5F7FA] text-sm focus:border-[#C5F467] focus:outline-none"
                required
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-950/40 border border-red-800/40 text-red-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmittingAuth}
              className="w-full py-3 rounded-lg bg-[#C5F467] text-[#090B10] font-semibold text-sm hover:bg-[#D4F880] transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isSubmittingAuth ? "যাচাই করা হচ্ছে..." : "লগইন করুন"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 3. Admin Dashboard
  return (
    <div className="min-h-screen bg-[#090B10] text-[#F5F7FA] pb-24">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 border-b border-[#29313C] bg-[#121720]/95 backdrop-blur px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#090B10] border border-[#29313C] flex items-center justify-center font-mono font-bold text-xs text-[#C5F467]">
            AP
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold font-[family-name:var(--font-heading)] leading-none">
              Sadik Hasnat — Admin Panel
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-mono text-[#9AA5B5]">
                Live Dynamic Content Manager
              </span>
              <span className="text-[#29313C]">•</span>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono border ${
                  isSupabaseConnected
                    ? "border-[#C5F467]/30 text-[#C5F467] bg-[#C5F467]/10"
                    : "border-sky-500/30 text-sky-400 bg-sky-950/20"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSupabaseConnected ? "bg-[#C5F467] animate-pulse" : "bg-sky-400"
                  }`}
                />
                {isSupabaseConnected ? "Supabase Cloud Sync" : "Local JSON Storage"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C5F467] text-[#090B10] font-bold text-xs hover:bg-[#D4F880] transition-all disabled:opacity-50 cursor-pointer shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "সংরক্ষণ হচ্ছে..." : "পরিবর্তন সেভ করুন"}</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#29313C] bg-[#090B10] text-[#9AA5B5] hover:text-[#F5F7FA] text-xs transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">লগআউট</span>
          </button>
        </div>
      </header>

      {/* Save Notification Banner */}
      {saveStatus.message && (
        <div
          className={`px-4 py-2.5 text-xs font-mono text-center border-b transition-all ${
            saveStatus.type === "success"
              ? "bg-[#C5F467]/15 border-[#C5F467]/30 text-[#C5F467]"
              : "bg-red-950/50 border-red-800/40 text-red-300"
          }`}
        >
          {saveStatus.message}
        </div>
      )}

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#29313C] pb-4 mb-8">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
              activeTab === "projects"
                ? "bg-[#C5F467] text-[#090B10]"
                : "bg-[#121720] border border-[#29313C] text-[#9AA5B5] hover:text-[#F5F7FA]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>প্রজেক্টস ({content?.projects.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
              activeTab === "profile"
                ? "bg-[#C5F467] text-[#090B10]"
                : "bg-[#121720] border border-[#29313C] text-[#9AA5B5] hover:text-[#F5F7FA]"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>প্রোফাইল ও সোশ্যাল লিংক</span>
          </button>

          <button
            onClick={() => setActiveTab("skills")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
              activeTab === "skills"
                ? "bg-[#C5F467] text-[#090B10]"
                : "bg-[#121720] border border-[#29313C] text-[#9AA5B5] hover:text-[#F5F7FA]"
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>স্কিল ও টেকনোলজি ({content?.skills.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab("experience")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
              activeTab === "experience"
                ? "bg-[#C5F467] text-[#090B10]"
                : "bg-[#121720] border border-[#29313C] text-[#9AA5B5] hover:text-[#F5F7FA]"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>অভিজ্ঞতা ({content?.experience.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab("education")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
              activeTab === "education"
                ? "bg-[#C5F467] text-[#090B10]"
                : "bg-[#121720] border border-[#29313C] text-[#9AA5B5] hover:text-[#F5F7FA]"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>শিক্ষা ({content?.education.length || 0})</span>
          </button>
        </div>

        {/* Tab Content */}
        {!content ? (
          <div className="py-20 text-center text-[#9AA5B5]">ডেটা লোড হচ্ছে...</div>
        ) : (
          <div>
            {/* =========================================================================
                TAB 1: PROJECTS MANAGER
                ========================================================================= */}
            {activeTab === "projects" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]">
                      প্রজেক্টস ম্যানেজমেন্ট
                    </h2>
                    <p className="text-xs text-[#9AA5B5]">
                      নতুন প্রজেক্ট যোগ করুন, টাইটেল, টেকনোলজি বা স্ট্যাটাস এডিট করুন।
                    </p>
                  </div>

                  <button
                    onClick={addProject}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#121720] border border-[#29313C] text-[#C5F467] text-xs font-mono hover:border-[#C5F467]/60 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>নতুন প্রজেক্ট যোগ করুন</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {content.projects.map((project, idx) => (
                    <div
                      key={project.slug || idx}
                      className="rounded-xl border border-[#29313C] bg-[#121720] p-6 space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-[#29313C]/60 pb-3">
                        <span className="text-xs font-mono text-[#C5F467] font-bold">
                          #{idx + 1} — {project.title}
                        </span>

                        <button
                          onClick={() => deleteProject(idx)}
                          className="p-1.5 rounded text-red-400 hover:bg-red-950/40 transition-colors cursor-pointer"
                          title="ডিলিট করুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                            প্রজেক্ট টাইটেল
                          </label>
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => updateProject(idx, "title", e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                            Slug (ইউআরএল পাথ)
                          </label>
                          <input
                            type="text"
                            value={project.slug}
                            onChange={(e) => updateProject(idx, "slug", e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm font-mono text-[#C5F467]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                            ক্যাটেগরি
                          </label>
                          <select
                            value={project.category}
                            onChange={(e) => updateProject(idx, "category", e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                          >
                            <option value="Mobile Application">Mobile Application</option>
                            <option value="Full-Stack SaaS">Full-Stack SaaS</option>
                            <option value="Web Engineering">Web Engineering</option>
                            <option value="AI & Cloud Engineering">AI & Cloud Engineering</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                            স্ট্যাটাস
                          </label>
                          <select
                            value={project.status}
                            onChange={(e) => updateProject(idx, "status", e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                          >
                            <option value="production">Production</option>
                            <option value="in-development">Active R&D</option>
                            <option value="planned">Planned</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                            GitHub লিংক
                          </label>
                          <input
                            type="text"
                            value={project.links.github || ""}
                            onChange={(e) =>
                              updateProject(idx, "links", {
                                ...project.links,
                                github: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                            লাইভ ডেমো লিংক (যেমন: https://your-app.vercel.app)
                          </label>
                          <input
                            type="text"
                            placeholder="https://resto-lz6b.vercel.app"
                            value={project.links.liveDemo || ""}
                            onChange={(e) =>
                              updateProject(idx, "links", {
                                ...project.links,
                                liveDemo: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                          ট্যাগলাইন
                        </label>
                        <input
                          type="text"
                          value={project.tagline}
                          onChange={(e) => updateProject(idx, "tagline", e.target.value)}
                          className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                          সামারি / সারসংক্ষেপ
                        </label>
                        <textarea
                          rows={2}
                          value={project.summary}
                          onChange={(e) => updateProject(idx, "summary", e.target.value)}
                          className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =========================================================================
                TAB 2: PROFILE MANAGER
                ========================================================================= */}
            {activeTab === "profile" && (
              <div className="rounded-xl border border-[#29313C] bg-[#121720] p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]">
                    প্রোফাইল এবং যোগাযোগের তথ্য
                  </h2>
                  <p className="text-xs text-[#9AA5B5]">
                    আপনার নাম, পদবি, বায়ো এবং যোগাযোগের লিঙ্ক পরিবর্তন করুন।
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                      পূর্ণ নাম
                    </label>
                    <input
                      type="text"
                      value={content.personalInfo.name}
                      onChange={(e) => updateProfileField("name", e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                      পদবি / বর্তমান রোল
                    </label>
                    <input
                      type="text"
                      value={content.personalInfo.currentRole}
                      onChange={(e) => updateProfileField("currentRole", e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                      প্রতিষ্ঠান (Company)
                    </label>
                    <input
                      type="text"
                      value={content.personalInfo.currentCompany}
                      onChange={(e) => updateProfileField("currentCompany", e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                      লোকেশন
                    </label>
                    <input
                      type="text"
                      value={content.personalInfo.location}
                      onChange={(e) => updateProfileField("location", e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                      ইমেইল ঠিকানা
                    </label>
                    <input
                      type="email"
                      value={content.personalInfo.email}
                      onChange={(e) => updateProfileField("email", e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                      WhatsApp নম্বর
                    </label>
                    <input
                      type="text"
                      value={content.personalInfo.whatsapp}
                      onChange={(e) => updateProfileField("whatsapp", e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                      ফোন নম্বর
                    </label>
                    <input
                      type="text"
                      value={content.personalInfo.phone}
                      onChange={(e) => updateProfileField("phone", e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                    />
                  </div>

                  {/* Profile Image Manager (Device Upload / Link) */}
                  <div className="sm:col-span-2 rounded-xl border border-[#29313C] bg-[#090B10]/80 p-4 space-y-4">
                    <div className="flex items-center justify-between border-b border-[#29313C]/60 pb-2">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-[#C5F467]" />
                        <span className="text-xs font-mono font-semibold text-[#F5F7FA]">
                          পোর্টফোলিও প্রোফাইল ছবি (Device Upload & Direct Link)
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#9AA5B5]">
                        হোমপেজ ও অ্যাবাউট পেজে প্রদর্শিত হবে
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                      {/* Image Preview */}
                      <div className="md:col-span-3 flex flex-col items-center justify-center">
                        <div className="relative w-28 h-32 rounded-xl border border-[#29313C] overflow-hidden bg-[#121720] shadow-md flex items-center justify-center">
                          {content.personalInfo.profileImagePath ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={content.personalInfo.profileImagePath}
                              alt="Profile preview"
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            <span className="text-xs text-[#9AA5B5]">ছবি নেই</span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-[#9AA5B5] mt-1.5">
                          লাইভ প্রিভিউ
                        </span>
                      </div>

                      {/* Options: File Upload or Image Link */}
                      <div className="md:col-span-9 space-y-3.5">
                        {/* Option 1: Device File Upload */}
                        <div className="p-3 rounded-lg border border-[#29313C] bg-[#121720]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <span className="text-xs font-bold text-[#F5F7FA] block">
                              ১. ডিভাইস থেকে নতুন ছবি আপলোড করুন
                            </span>
                            <span className="text-[11px] text-[#9AA5B5]">
                              আপনার কম্পিউটার বা ফোন থেকে .jpg, .png, .webp ছবি নির্বাচন করুন
                            </span>
                          </div>

                          <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#C5F467] text-[#090B10] text-xs font-bold hover:bg-[#D4F880] transition-colors cursor-pointer shrink-0">
                            <Upload className="w-3.5 h-3.5" />
                            <span>{isUploading ? "আপলোড হচ্ছে..." : "ফাইল সিলেক্ট করুন"}</span>
                            <input
                              type="file"
                              accept="image/*"
                              disabled={isUploading}
                              onChange={handleImageFileUpload}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {/* Option 2: Image URL / Path */}
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <LinkIcon className="w-3.5 h-3.5 text-[#C5F467]" />
                            <label className="text-[11px] font-mono text-[#9AA5B5]">
                              ২. অথবা ছবির লিংক / পাথ লিখুন (ইন্টারনেট URL বা /profile.jpg)
                            </label>
                          </div>
                          <input
                            type="text"
                            value={content.personalInfo.profileImagePath}
                            onChange={(e) => updateProfileField("profileImagePath", e.target.value)}
                            placeholder="https://example.com/photo.jpg অথবা /uploads/photo.jpg"
                            className="w-full px-3 py-2 rounded bg-[#121720] border border-[#29313C] text-sm text-[#F5F7FA] font-mono focus:border-[#C5F467] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Links Section */}
                  <div className="sm:col-span-2 rounded-xl border border-[#29313C] bg-[#090B10]/80 p-4 space-y-4">
                    <div className="flex items-center justify-between border-b border-[#29313C]/60 pb-2">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-[#C5F467]" />
                        <span className="text-xs font-mono font-semibold text-[#F5F7FA]">
                          সোশ্যাল মিডিয়া প্রোফাইল লিংক (Social Links)
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#9AA5B5]">
                        ফুটার ও যোগাযোগের কার্ডে প্রদর্শিত হবে
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                          GitHub প্রোফাইল লিংক
                        </label>
                        <input
                          type="url"
                          value={content.personalInfo.githubUrl || ""}
                          onChange={(e) => updateProfileField("githubUrl", e.target.value)}
                          placeholder="https://github.com/your-username"
                          className="w-full px-3 py-2 rounded bg-[#121720] border border-[#29313C] text-sm text-[#F5F7FA]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                          LinkedIn প্রোফাইল লিংক
                        </label>
                        <input
                          type="url"
                          value={content.personalInfo.linkedinUrl || ""}
                          onChange={(e) => updateProfileField("linkedinUrl", e.target.value)}
                          placeholder="https://linkedin.com/in/your-profile"
                          className="w-full px-3 py-2 rounded bg-[#121720] border border-[#29313C] text-sm text-[#F5F7FA]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                          Facebook প্রোফাইল লিংক
                        </label>
                        <input
                          type="url"
                          value={content.personalInfo.facebookUrl || ""}
                          onChange={(e) => updateProfileField("facebookUrl", e.target.value)}
                          placeholder="https://facebook.com/your-profile"
                          className="w-full px-3 py-2 rounded bg-[#121720] border border-[#29313C] text-sm text-[#F5F7FA]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                          Instagram প্রোফাইল লিংক
                        </label>
                        <input
                          type="url"
                          value={content.personalInfo.instagramUrl || ""}
                          onChange={(e) => updateProfileField("instagramUrl", e.target.value)}
                          placeholder="https://instagram.com/your-profile"
                          className="w-full px-3 py-2 rounded bg-[#121720] border border-[#29313C] text-sm text-[#F5F7FA]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                    শর্ট বায়ো
                  </label>
                  <textarea
                    rows={3}
                    value={content.personalInfo.shortBio}
                    onChange={(e) => updateProfileField("shortBio", e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                  />
                </div>
              </div>
            )}

            {/* =========================================================================
                TAB: CAPABILITIES & ENGINEERING SKILLS MANAGER
                ========================================================================= */}
            {activeTab === "skills" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]">
                      Capabilities & Engineering Practices (স্কিলস ম্যানেজমেন্ট)
                    </h2>
                    <p className="text-xs text-[#9AA5B5]">
                      হোমপেজ ও অ্যাবাউট পেজের স্কিল ক্যাটেগরি, বিবরণ এবং প্রতিটি টেকনোলজি এডিট, অ্যাড বা ডিলিট করুন।
                    </p>
                  </div>

                  <button
                    onClick={addSkillCategory}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#121720] border border-[#29313C] text-[#C5F467] text-xs font-mono hover:border-[#C5F467]/60 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>নতুন স্কিল ক্যাটেগরি যোগ করুন</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {content.skills.map((cat, catIdx) => (
                    <div
                      key={catIdx}
                      className="rounded-xl border border-[#29313C] bg-[#121720] p-6 space-y-5"
                    >
                      <div className="flex items-center justify-between border-b border-[#29313C]/60 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#C5F467]" />
                          <span className="text-xs font-mono text-[#C5F467] font-bold">
                            ক্যাটেগরি #{catIdx + 1}
                          </span>
                        </div>

                        <button
                          onClick={() => deleteSkillCategory(catIdx)}
                          className="p-1.5 text-red-400 hover:bg-red-950/40 rounded transition-colors cursor-pointer"
                          title="সম্পূর্ণ ক্যাটেগরি ডিলিট করুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                            ক্যাটেগরি টাইটেল (Category Name)
                          </label>
                          <input
                            type="text"
                            value={cat.category}
                            onChange={(e) => updateSkillCategory(catIdx, "category", e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                            ক্যাটেগরির বিবরণ (Description)
                          </label>
                          <input
                            type="text"
                            value={cat.description}
                            onChange={(e) => updateSkillCategory(catIdx, "description", e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                          />
                        </div>
                      </div>

                      {/* Skills Items Under This Category */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-[#9AA5B5] uppercase">
                            প্রযুক্তি ও টুলস তালিকা ({cat.skills.length})
                          </span>
                          <button
                            onClick={() => addSkillItem(catIdx)}
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-[#C5F467] hover:underline cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>স্কিল যোগ করুন</span>
                          </button>
                        </div>

                        <div className="space-y-2.5">
                          {cat.skills.map((skill, skillIdx) => (
                            <div
                              key={skillIdx}
                              className="p-3.5 rounded-lg border border-[#29313C]/70 bg-[#090B10] grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                            >
                              <div className="sm:col-span-3">
                                <label className="text-[10px] font-mono text-[#9AA5B5] block mb-0.5">
                                  স্কিলের নাম (Skill Name)
                                </label>
                                <input
                                  type="text"
                                  value={skill.name}
                                  onChange={(e) =>
                                    updateSkillItem(catIdx, skillIdx, "name", e.target.value)
                                  }
                                  className="w-full px-2.5 py-1.5 rounded bg-[#121720] border border-[#29313C] text-xs text-[#F5F7FA]"
                                />
                              </div>

                              <div className="sm:col-span-6">
                                <label className="text-[10px] font-mono text-[#9AA5B5] block mb-0.5">
                                  ব্যবহারের প্রেক্ষাপট (Verified Context)
                                </label>
                                <input
                                  type="text"
                                  value={skill.verifiedContext}
                                  onChange={(e) =>
                                    updateSkillItem(catIdx, skillIdx, "verifiedContext", e.target.value)
                                  }
                                  className="w-full px-2.5 py-1.5 rounded bg-[#121720] border border-[#29313C] text-xs text-[#F5F7FA]"
                                />
                              </div>

                              <div className="sm:col-span-2">
                                <label className="text-[10px] font-mono text-[#9AA5B5] block mb-0.5">
                                  ব্যাজ (Badge)
                                </label>
                                <input
                                  type="text"
                                  value={skill.badge || ""}
                                  onChange={(e) =>
                                    updateSkillItem(catIdx, skillIdx, "badge", e.target.value)
                                  }
                                  placeholder="যেমন: Core"
                                  className="w-full px-2.5 py-1.5 rounded bg-[#121720] border border-[#29313C] text-xs text-[#C5F467] font-mono"
                                />
                              </div>

                              <div className="sm:col-span-1 flex justify-end">
                                <button
                                  onClick={() => deleteSkillItem(catIdx, skillIdx)}
                                  className="p-1 text-red-400 hover:bg-red-950/40 rounded transition-colors cursor-pointer"
                                  title="ডিলিট করুন"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =========================================================================
                TAB 3: EXPERIENCE MANAGER
                ========================================================================= */}
            {activeTab === "experience" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]">
                      অভিজ্ঞতা (Work Experience)
                    </h2>
                    <p className="text-xs text-[#9AA5B5]">
                      কাজের অভিজ্ঞতা যোগ এবং আপডেট করুন।
                    </p>
                  </div>

                  <button
                    onClick={addExperience}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#121720] border border-[#29313C] text-[#C5F467] text-xs font-mono hover:border-[#C5F467]/60 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>নতুন অভিজ্ঞতা যোগ করুন</span>
                  </button>
                </div>

                {content.experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-[#29313C] bg-[#121720] p-6 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-[#29313C]/60 pb-3">
                      <span className="text-xs font-mono text-[#C5F467] font-bold">
                        #{idx + 1} — {exp.role} @ {exp.company}
                      </span>
                      <button
                        onClick={() => deleteExperience(idx)}
                        className="p-1.5 text-red-400 hover:bg-red-950/40 rounded transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                          রোল / পদবি
                        </label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => updateExperience(idx, "role", e.target.value)}
                          className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                          কোম্পানি
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(idx, "company", e.target.value)}
                          className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                          সময়কাল (Period)
                        </label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => updateExperience(idx, "period", e.target.value)}
                          className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* =========================================================================
                TAB 4: EDUCATION MANAGER
                ========================================================================= */}
            {activeTab === "education" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]">
                      শিক্ষাগত যোগ্যতা (Education)
                    </h2>
                    <p className="text-xs text-[#9AA5B5]">
                      শিক্ষা প্রতিষ্ঠান ও ডিগ্রির তালিকা আপডেট করুন।
                    </p>
                  </div>

                  <button
                    onClick={addEducation}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#121720] border border-[#29313C] text-[#C5F467] text-xs font-mono hover:border-[#C5F467]/60 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>নতুন শিক্ষা যোগ করুন</span>
                  </button>
                </div>

                {content.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-[#29313C] bg-[#121720] p-6 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-[#29313C]/60 pb-3">
                      <span className="text-xs font-mono text-[#C5F467] font-bold">
                        #{idx + 1} — {edu.degree}
                      </span>
                      <button
                        onClick={() => deleteEducation(idx)}
                        className="p-1.5 text-red-400 hover:bg-red-950/40 rounded transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                          ডিগ্রি
                        </label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(idx, "degree", e.target.value)}
                          className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                          প্রতিষ্ঠান
                        </label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateEducation(idx, "institution", e.target.value)}
                          className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-[#9AA5B5] block mb-1">
                          সাল (Year)
                        </label>
                        <input
                          type="text"
                          value={edu.year}
                          onChange={(e) => updateEducation(idx, "year", e.target.value)}
                          className="w-full px-3 py-2 rounded bg-[#090B10] border border-[#29313C] text-sm text-[#F5F7FA]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
