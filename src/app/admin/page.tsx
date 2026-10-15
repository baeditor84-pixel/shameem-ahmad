'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSiteContent } from '@/context/SiteContentContext';
import {
  DoctorItem,
  HospitalItem,
  TestimonialItem,
  PatientPhotoItem,
  InquiryItem,
} from '@/data/defaultSiteData';
import {
  Shield,
  Stethoscope,
  Building2,
  Users,
  Sliders,
  Mail,
  Plus,
  Trash2,
  Edit,
  Save,
  RotateCcw,
  Download,
  Upload,
  ExternalLink,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Star,
  Image as ImageIcon,
  MessageSquare,
  Search,
  X,
  Phone,
  Check,
  Eye,
  RefreshCw,
  GitBranch,
  Rocket,
  Terminal,
  Globe,
} from 'lucide-react';

export default function AdminPage() {
  const {
    siteData,
    isLoading,
    isSaving,
    saveStatus,
    saveChanges,
    resetToDefault,
    refreshData,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    addHospital,
    updateHospital,
    deleteHospital,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    addPatientPhoto,
    updatePatientPhoto,
    deletePatientPhoto,
    updateHero,
    updateContact,
    updateInquiryStatus,
    deleteInquiry,
    exportBackup,
    importBackup,
    isGitSyncing,
    syncToGitAndVercel,
  } = useSiteContent();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'doctors' | 'hospitals' | 'patients' | 'settings' | 'inquiries' | 'media' | 'git'
  >('doctors');

  // Git / GitHub & Vercel Sync State
  const [gitInfo, setGitInfo] = useState<{
    branch: string;
    lastCommit: string;
    gitAvailable: boolean;
    owner: string;
    repo: string;
    hasEnvToken: boolean;
  } | null>(null);
  const [customCommitMsg, setCustomCommitMsg] = useState<string>('');
  const [githubToken, setGithubToken] = useState<string>('');
  const [autoPushOnSave, setAutoPushOnSave] = useState<boolean>(true);
  const [syncResponse, setSyncResponse] = useState<any>(null);

  // Available Server Images for Picker
  const [serverImages, setServerImages] = useState<{ path: string; name: string }[]>([]);

  // Modals state
  const [doctorModalOpen, setDoctorModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<DoctorItem | null>(null);

  const [hospitalModalOpen, setHospitalModalOpen] = useState(false);
  const [editingHospital, setEditingHospital] = useState<HospitalItem | null>(null);

  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);

  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<PatientPhotoItem | null>(null);

  // Settings local state
  const [heroForm, setHeroForm] = useState(siteData.hero);
  const [contactForm, setContactForm] = useState(siteData.contact);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Toast message
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Check login on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem('shameem_admin_auth');
      if (auth === 'true') {
        setIsAuthenticated(true);
      }
      const savedToken = localStorage.getItem('shameem_github_token');
      if (savedToken) setGithubToken(savedToken);

      const savedAutoPush = localStorage.getItem('shameem_autopush_git');
      if (savedAutoPush !== null) setAutoPushOnSave(savedAutoPush === 'true');
    }
    fetchServerImages();
    fetchGitStatus();
  }, []);

  // Sync settings forms when siteData updates
  useEffect(() => {
    setHeroForm(siteData.hero);
    setContactForm(siteData.contact);
  }, [siteData]);

  const fetchGitStatus = async () => {
    try {
      const res = await fetch('/api/git/sync');
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setGitInfo(json);
        }
      }
    } catch (e) {
      console.warn('Could not fetch git status:', e);
    }
  };

  const handleGitSync = async (msg?: string) => {
    const commitMsg =
      msg ||
      customCommitMsg ||
      `chore(content): update website content via Admin Panel (${new Date().toLocaleTimeString()})`;
    showToast('Pushing changes to GitHub & Vercel...', 'success');
    const res = await syncToGitAndVercel(commitMsg, githubToken);
    setSyncResponse(res);
    if (res.success) {
      showToast(res.message || 'Pushed to GitHub! Vercel is updating the website.');
      fetchGitStatus();
    } else {
      showToast(res.error || 'Failed to sync to GitHub', 'error');
    }
  };

  const fetchServerImages = async () => {
    try {
      const res = await fetch('/api/images');
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setServerImages(json.images || []);
        }
      }
    } catch (e) {
      console.warn('Could not fetch server images:', e);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default password is 'admin' or 'shameem2026' or custom password
    const validPass = siteData.adminPassword || 'admin';
    if (passwordInput === validPass || passwordInput === 'admin' || passwordInput === 'shameem2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('shameem_admin_auth', 'true');
      setLoginError('');
      showToast('Welcome to Shameem Ahmad Admin Portal!');
    } else {
      setLoginError('Incorrect passcode. Try "admin" or "shameem2026"');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('shameem_admin_auth');
  };

  // Generic File Upload Handler
  const handleFileUpload = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        showToast('Image uploaded successfully!');
        fetchServerImages();
        return data.url;
      }
      showToast('Failed to upload image', 'error');
      return null;
    } catch (err) {
      console.error(err);
      showToast('Image upload failed', 'error');
      return null;
    }
  };

  // ==========================================
  // LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-card border border-gray-200/90 p-8 sm:p-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-brand-navy rounded-2xl flex items-center justify-center mx-auto text-brand-teal shadow-sm">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="font-heading text-2xl font-extrabold text-brand-navy">
              Shameem Ahmad Admin
            </h1>
            <p className="text-xs text-brand-muted">
              Live Medical Interpreter & Hospital Network Management Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                Admin Passcode
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter passcode (default: admin)"
                className="w-full px-4 py-3 rounded-xl bg-[#FAFAF8] border border-gray-200 text-sm focus:border-brand-teal focus:bg-white outline-none transition-all"
                autoFocus
              />
              <p className="text-[11px] text-gray-500 mt-1.5">
                Default password: <span className="font-mono text-brand-teal font-semibold">admin</span> or <span className="font-mono text-brand-teal font-semibold">shameem2026</span>
              </p>
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-brand-navy hover:bg-brand-navy-light text-white font-semibold text-sm rounded-xl shadow transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Shield className="w-4 h-4 text-brand-teal" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 text-center">
            <Link
              href="/"
              className="text-xs font-medium text-brand-teal hover:underline inline-flex items-center"
            >
              ← Back to Live Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#F4F4F1] flex flex-col font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-3 text-xs sm:text-sm font-semibold transition-all duration-300 ${
            toast.type === 'success'
              ? 'bg-brand-navy text-white border border-brand-teal'
              : 'bg-red-600 text-white'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-brand-teal flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-white flex-shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-brand-navy text-white border-b border-brand-navy-light px-4 sm:px-6 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Sync Status */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-brand-teal font-extrabold text-lg">
              SA
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-heading font-extrabold text-base sm:text-lg tracking-tight">
                  Shameem Ahmad Admin
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse"></span>
                  Website Synced
                </span>
              </div>
              <p className="text-[11px] text-gray-300">
                Delhi NCR Medical Interpreter · Live Dynamic Controller
              </p>
            </div>
          </div>

          {/* Quick Action Controls */}
          <div className="flex items-center flex-wrap gap-2">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/15 transition-all"
              title="Open public website in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5 text-brand-teal" />
              <span>Live Website</span>
            </Link>

            {/* Git & Vercel Sync Button */}
            <button
              onClick={() => handleGitSync()}
              disabled={isGitSyncing}
              className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-xs font-semibold text-white shadow-sm transition-all disabled:opacity-50"
              title="Push to GitHub and trigger Vercel deploy"
            >
              {isGitSyncing ? (
                <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
              ) : (
                <Rocket className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
              )}
              <span>{isGitSyncing ? 'Syncing...' : 'Sync GitHub & Vercel'}</span>
            </button>

            <button
              onClick={() => saveChanges().then((ok) => ok && showToast('All changes saved to server!'))}
              disabled={isSaving}
              className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-brand-teal hover:bg-brand-teal-dark text-xs font-semibold text-white shadow-sm transition-all disabled:opacity-50"
            >
              {isSaving ? (
                <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
              ) : saveStatus === 'saved' ? (
                <Check className="w-3.5 h-3.5 mr-1.5 text-white" />
              ) : (
                <Save className="w-3.5 h-3.5 mr-1.5" />
              )}
              <span>{isSaving ? 'Saving...' : 'Save All'}</span>
            </button>

            <button
              onClick={exportBackup}
              title="Download JSON Backup"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white border border-white/10 transition-all"
            >
              <Download className="w-4 h-4 text-gray-200" />
            </button>

            <button
              onClick={() => {
                if (confirm('Restore all original sample data? This will reset custom additions.')) {
                  resetToDefault().then(() => showToast('Reset to original website data!'));
                }
              }}
              title="Reset to Default Content"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-gray-300 hover:text-amber-300 border border-white/10 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleLogout}
              title="Log out"
              className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 transition-all ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto hide-scrollbar bg-white p-1.5 rounded-2xl border border-gray-200 shadow-xs">
          <button
            onClick={() => setActiveTab('doctors')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'doctors'
                ? 'bg-brand-navy text-white shadow-sm'
                : 'text-gray-600 hover:bg-stone-100 hover:text-brand-navy'
            }`}
          >
            <Stethoscope className="w-4 h-4 text-brand-teal" />
            <span>Doctors ({siteData.doctors.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('hospitals')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'hospitals'
                ? 'bg-brand-navy text-white shadow-sm'
                : 'text-gray-600 hover:bg-stone-100 hover:text-brand-navy'
            }`}
          >
            <Building2 className="w-4 h-4 text-brand-teal" />
            <span>Hospitals ({siteData.hospitals.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('patients')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'patients'
                ? 'bg-brand-navy text-white shadow-sm'
                : 'text-gray-600 hover:bg-stone-100 hover:text-brand-navy'
            }`}
          >
            <Users className="w-4 h-4 text-brand-teal" />
            <span>Our Patients & Reviews ({siteData.testimonials.length} reviews · {siteData.patientPhotos.length} photos)</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap relative ${
              activeTab === 'inquiries'
                ? 'bg-brand-navy text-white shadow-sm'
                : 'text-gray-600 hover:bg-stone-100 hover:text-brand-navy'
            }`}
          >
            <Mail className="w-4 h-4 text-brand-teal" />
            <span>Patient Leads ({siteData.inquiries.length})</span>
            {siteData.inquiries.filter((i) => i.status === 'new').length > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-500 absolute top-2 right-2"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-brand-navy text-white shadow-sm'
                : 'text-gray-600 hover:bg-stone-100 hover:text-brand-navy'
            }`}
          >
            <Sliders className="w-4 h-4 text-brand-teal" />
            <span>Hero & Contact Info</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'media'
                ? 'bg-brand-navy text-white shadow-sm'
                : 'text-gray-600 hover:bg-stone-100 hover:text-brand-navy'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-brand-teal" />
            <span>Image Library ({serverImages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('git')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'git'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'text-purple-700 bg-purple-50 hover:bg-purple-100'
            }`}
          >
            <GitBranch className="w-4 h-4 text-purple-600" />
            <span>GitHub & Vercel Sync</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: DOCTORS MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === 'doctors' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-subtle">
              <div>
                <h2 className="font-heading text-xl font-bold text-brand-navy">
                  Doctor Leaders ({siteData.doctors.length})
                </h2>
                <p className="text-xs text-brand-muted">
                  Add, edit, or delete doctors. Upload official clinical portraits and configure specialties.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setEditingDoctor(null);
                    setDoctorModalOpen(true);
                  }}
                  className="inline-flex items-center px-4 py-2.5 rounded-xl bg-brand-teal hover:bg-brand-teal-dark text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  <span>Add New Doctor</span>
                </button>
              </div>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {siteData.doctors.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-subtle flex flex-col justify-between group hover:shadow-card transition-all"
                >
                  <div>
                    {/* Doctor Image */}
                    <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                      <Image
                        src={doc.image || '/images/doc-dr-abhishek-goyal.jpg'}
                        alt={doc.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover object-top"
                      />
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="font-heading font-bold text-base text-brand-navy">
                        {doc.name}
                      </h3>
                      <p className="text-xs font-semibold text-brand-teal leading-snug">
                        {doc.title}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        🏥 {doc.hospital}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {doc.specialties.slice(0, 3).map((spec) => (
                          <span
                            key={spec}
                            className="text-[10px] bg-stone-100 text-gray-700 px-2 py-0.5 rounded-md border border-gray-200"
                          >
                            {spec}
                          </span>
                        ))}
                        {doc.specialties.length > 3 && (
                          <span className="text-[10px] text-gray-500 font-semibold">
                            +{doc.specialties.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-3 bg-stone-50 border-t border-gray-100 flex items-center justify-end space-x-2">
                    <button
                      onClick={() => {
                        setEditingDoctor(doc);
                        setDoctorModalOpen(true);
                      }}
                      className="p-2 rounded-lg bg-white border border-gray-200 text-brand-navy hover:text-brand-teal hover:border-brand-teal text-xs font-semibold flex items-center space-x-1 transition-all"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete ${doc.name}?`)) {
                          deleteDoctor(doc.id);
                          showToast(`Deleted ${doc.name}`);
                        }
                      }}
                      className="p-2 rounded-lg bg-white border border-gray-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center space-x-1 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: HOSPITALS MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === 'hospitals' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-subtle">
              <div>
                <h2 className="font-heading text-xl font-bold text-brand-navy">
                  Partner Hospitals ({siteData.hospitals.length})
                </h2>
                <p className="text-xs text-brand-muted">
                  Manage premier hospital networks, locations, accreditation badges, and facility highlights.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingHospital(null);
                  setHospitalModalOpen(true);
                }}
                className="inline-flex items-center px-4 py-2.5 rounded-xl bg-brand-teal hover:bg-brand-teal-dark text-white text-xs font-semibold shadow-sm transition-all"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                <span>Add Hospital</span>
              </button>
            </div>

            {/* Hospitals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {siteData.hospitals.map((hosp) => (
                <div
                  key={hosp.id}
                  className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-subtle flex flex-col justify-between group hover:shadow-card transition-all"
                >
                  <div>
                    {/* Hospital Image */}
                    <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                      <Image
                        src={hosp.image || '/images/hosp-max.jpg'}
                        alt={hosp.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-brand-navy shadow-sm border border-white/60">
                        {hosp.accreditation}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div>
                        <h3 className="font-heading font-extrabold text-lg text-brand-navy">
                          {hosp.name}
                        </h3>
                        <p className="text-xs text-brand-muted font-medium mt-0.5">
                          📍 {hosp.location}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {hosp.highlights.map((h) => (
                          <span
                            key={h}
                            className="text-xs font-semibold bg-stone-100 text-gray-700 px-2.5 py-1 rounded-lg border border-gray-200"
                          >
                            ✓ {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-4 bg-stone-50 border-t border-gray-100 flex items-center justify-end space-x-2">
                    <button
                      onClick={() => {
                        setEditingHospital(hosp);
                        setHospitalModalOpen(true);
                      }}
                      className="p-2 rounded-xl bg-white border border-gray-200 text-brand-navy hover:text-brand-teal hover:border-brand-teal text-xs font-semibold flex items-center space-x-1.5 transition-all"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete ${hosp.name}?`)) {
                          deleteHospital(hosp.id);
                          showToast(`Deleted ${hosp.name}`);
                        }
                      }}
                      className="p-2 rounded-xl bg-white border border-gray-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center space-x-1.5 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: OUR PATIENTS & REVIEWS */}
        {/* ======================================================== */}
        {activeTab === 'patients' && (
          <div className="space-y-10">
            {/* Sub-section 1: Testimonials / Reviews */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-subtle">
                <div>
                  <h2 className="font-heading text-xl font-bold text-brand-navy">
                    Patient Testimonials & Reviews ({siteData.testimonials.length})
                  </h2>
                  <p className="text-xs text-brand-muted">
                    Manage verified international patient reviews, flags, star ratings, and treatment quotes.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingTestimonial(null);
                    setTestimonialModalOpen(true);
                  }}
                  className="inline-flex items-center px-4 py-2.5 rounded-xl bg-brand-teal hover:bg-brand-teal-dark text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  <span>Add Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {siteData.testimonials.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-white border border-gray-200 shadow-subtle flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                          ))}
                        </div>
                        <span className="text-xl">{item.flag}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                        &ldquo;{item.comment}&rdquo;
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="font-heading font-bold text-xs sm:text-sm text-brand-navy">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-brand-muted">
                          {item.country} · <span className="text-brand-teal font-medium">{item.treatment}</span>
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setEditingTestimonial(item);
                            setTestimonialModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg border border-gray-200 hover:text-brand-teal text-gray-600"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete review from ${item.name}?`)) {
                              deleteTestimonial(item.id);
                              showToast(`Deleted review from ${item.name}`);
                            }
                          }}
                          className="p-1.5 rounded-lg border border-gray-200 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub-section 2: Patient Photo Journey Gallery */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-subtle">
                <div>
                  <h2 className="font-heading text-xl font-bold text-brand-navy">
                    Our Patients Journey Gallery ({siteData.patientPhotos.length} Photos)
                  </h2>
                  <p className="text-xs text-brand-muted">
                    Photos of hospital arrivals, doctor consultations, recovery, and patient departures.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setEditingPhoto(null);
                      setPhotoModalOpen(true);
                    }}
                    className="inline-flex items-center px-4 py-2.5 rounded-xl bg-brand-teal hover:bg-brand-teal-dark text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4 mr-1.5" />
                    <span>Add Patient Photo</span>
                  </button>
                </div>
              </div>

              {/* Photos Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {siteData.patientPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-subtle flex flex-col justify-between group"
                  >
                    <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-3">
                      <p className="text-[11px] text-gray-700 font-medium line-clamp-2 leading-tight">
                        {photo.alt}
                      </p>
                    </div>

                    <div className="p-2 bg-stone-50 border-t border-gray-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setEditingPhoto(photo);
                          setPhotoModalOpen(true);
                        }}
                        className="text-[11px] font-semibold text-brand-navy hover:text-brand-teal flex items-center"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          if (confirm('Delete this patient photo?')) {
                            deletePatientPhoto(photo.id);
                            showToast('Photo deleted');
                          }
                        }}
                        className="text-[11px] font-semibold text-red-600 hover:text-red-700 flex items-center"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: PATIENT LEADS / INQUIRIES */}
        {/* ======================================================== */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-subtle">
              <div>
                <h2 className="font-heading text-xl font-bold text-brand-navy">
                  Patient Consultation Inquiries ({siteData.inquiries.length})
                </h2>
                <p className="text-xs text-brand-muted">
                  Inquiries submitted directly through the website form. Contact patients instantly via WhatsApp or phone.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Filter inquiries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-stone-100 text-xs border border-gray-200 outline-none focus:bg-white"
                />
              </div>
            </div>

            {siteData.inquiries.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-3">
                <Mail className="w-12 h-12 text-gray-300 mx-auto" />
                <h3 className="font-heading font-bold text-lg text-brand-navy">
                  No Patient Inquiries Yet
                </h3>
                <p className="text-xs text-brand-muted max-w-sm mx-auto">
                  When international patients submit the contact form on your website, their messages, chosen specialty, and medical file names will appear here immediately.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {siteData.inquiries
                  .filter((inq) =>
                    searchQuery
                      ? inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        inq.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        inq.specialty.toLowerCase().includes(searchQuery.toLowerCase())
                      : true
                  )
                  .map((inq) => (
                    <div
                      key={inq.id}
                      className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-heading font-bold text-base text-brand-navy">
                            {inq.name}
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-stone-100 text-gray-700 border border-gray-200">
                            🌍 {inq.country}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-brand-teal-light text-brand-teal-dark border border-brand-teal/20">
                            🗣️ {inq.language}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                            🩺 {inq.specialty}
                          </span>

                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              inq.status === 'new'
                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                : inq.status === 'contacted'
                                ? 'bg-sky-100 text-sky-800 border border-sky-200'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}
                          >
                            ● {inq.status}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-gray-800 bg-[#FAFAF8] p-3 rounded-xl border border-gray-200/60 leading-relaxed">
                          &ldquo;{inq.message}&rdquo;
                        </p>

                        <div className="flex items-center space-x-4 text-[11px] text-gray-400">
                          <span>
                            🕒 {new Date(inq.createdAt).toLocaleDateString()} at{' '}
                            {new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {inq.fileName && (
                            <span className="text-brand-teal font-medium flex items-center">
                              📎 {inq.fileName}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        {/* Direct WhatsApp Response */}
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(
                            `Hello ${inq.name}! This is Shameem Ahmad, Medical Interpreter in Delhi NCR. I received your inquiry regarding ${inq.specialty}. How can I assist you with your hospital appointment?`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-all"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp Reply</span>
                        </a>

                        {/* Status Switcher */}
                        <select
                          value={inq.status}
                          onChange={(e) =>
                            updateInquiryStatus(inq.id, e.target.value as 'new' | 'contacted' | 'resolved')
                          }
                          className="px-2.5 py-2 rounded-xl bg-stone-100 border border-gray-200 text-xs font-semibold text-gray-700 outline-none"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="resolved">Resolved</option>
                        </select>

                        <button
                          onClick={() => {
                            if (confirm(`Delete inquiry from ${inq.name}?`)) {
                              deleteInquiry(inq.id);
                              showToast('Inquiry deleted');
                            }
                          }}
                          className="p-2 rounded-xl border border-gray-200 text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: HERO & CONTACT SETTINGS */}
        {/* ======================================================== */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hero Section Config */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-subtle space-y-5">
              <div className="flex items-center space-x-3 pb-3 border-b border-gray-100">
                <div className="p-2 rounded-xl bg-brand-teal-light text-brand-teal">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-lg text-brand-navy">
                    Hero Banner Configuration
                  </h2>
                  <p className="text-xs text-brand-muted">
                    Main headline, subline, portrait photo, and top counters
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-brand-navy mb-1">
                    Tagline Badge
                  </label>
                  <input
                    type="text"
                    value={heroForm.tagline}
                    onChange={(e) => setHeroForm({ ...heroForm, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-gray-200 text-xs focus:bg-white focus:border-brand-teal outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-brand-navy mb-1">
                    Main Headline
                  </label>
                  <textarea
                    rows={2}
                    value={heroForm.headline}
                    onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-gray-200 text-xs focus:bg-white focus:border-brand-teal outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-brand-navy mb-1">
                    Subline Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={heroForm.subline}
                    onChange={(e) => setHeroForm({ ...heroForm, subline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-gray-200 text-xs focus:bg-white focus:border-brand-teal outline-none resize-none"
                  />
                </div>

                {/* Portrait Photo */}
                <div>
                  <label className="block font-semibold text-brand-navy mb-1">
                    Shameem Hero Portrait Image Path
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-14 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                      <Image
                        src={heroForm.portraitImage || '/images/shameem-hero.jpg'}
                        alt="Hero Portrait"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <input
                      type="text"
                      value={heroForm.portraitImage}
                      onChange={(e) => setHeroForm({ ...heroForm, portraitImage: e.target.value })}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-stone-50 border border-gray-200 text-xs focus:bg-white focus:border-brand-teal outline-none"
                    />
                    <label className="px-3 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-semibold cursor-pointer hover:bg-brand-navy-light flex items-center">
                      <Upload className="w-3.5 h-3.5 mr-1 text-brand-teal" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            const url = await handleFileUpload(e.target.files[0]);
                            if (url) {
                              setHeroForm({ ...heroForm, portraitImage: url });
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* 3 Stats */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div>
                    <label className="block font-semibold text-brand-navy mb-1">Stat 1</label>
                    <input
                      type="text"
                      value={heroForm.statLanguages}
                      onChange={(e) => setHeroForm({ ...heroForm, statLanguages: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-gray-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-brand-navy mb-1">Stat 2</label>
                    <input
                      type="text"
                      value={heroForm.statHospitals}
                      onChange={(e) => setHeroForm({ ...heroForm, statHospitals: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-gray-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-brand-navy mb-1">Stat 3</label>
                    <input
                      type="text"
                      value={heroForm.statConfidential}
                      onChange={(e) => setHeroForm({ ...heroForm, statConfidential: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-gray-200 text-xs"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => {
                      updateHero(heroForm);
                      showToast('Hero settings updated & synced!');
                    }}
                    className="w-full py-3 bg-brand-navy text-white rounded-xl font-semibold hover:bg-brand-navy-light transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Save className="w-4 h-4 text-brand-teal" />
                    <span>Save Hero Changes</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Information Config */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-subtle space-y-5">
              <div className="flex items-center space-x-3 pb-3 border-b border-gray-100">
                <div className="p-2 rounded-xl bg-brand-navy text-brand-teal">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-lg text-brand-navy">
                    Direct Contact Channels
                  </h2>
                  <p className="text-xs text-brand-muted">
                    Official phone, WhatsApp number, email, and location
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-brand-navy mb-1">
                    Display Phone Number
                  </label>
                  <input
                    type="text"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="+91 81783 00511"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-gray-200 text-xs focus:bg-white focus:border-brand-teal outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-brand-navy mb-1">
                    WhatsApp Number (International format digits without +)
                  </label>
                  <input
                    type="text"
                    value={contactForm.whatsapp}
                    onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                    placeholder="918178300511"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-gray-200 text-xs focus:bg-white focus:border-brand-teal outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-brand-navy mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="shameemahmadaams@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-gray-200 text-xs focus:bg-white focus:border-brand-teal outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-brand-navy mb-1">
                    Location / Hospital Coverage
                  </label>
                  <input
                    type="text"
                    value={contactForm.location}
                    onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                    placeholder="Delhi NCR, India (Gurugram, Saket, Noida, Faridabad)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-gray-200 text-xs focus:bg-white focus:border-brand-teal outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-brand-navy mb-1">
                    Working Hours
                  </label>
                  <input
                    type="text"
                    value={contactForm.workingHours}
                    onChange={(e) => setContactForm({ ...contactForm, workingHours: e.target.value })}
                    placeholder="24/7 International Patient Assistance"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-gray-200 text-xs focus:bg-white focus:border-brand-teal outline-none"
                  />
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => {
                      updateContact(contactForm);
                      showToast('Contact settings updated & synced!');
                    }}
                    className="w-full py-3 bg-brand-navy text-white rounded-xl font-semibold hover:bg-brand-navy-light transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Save className="w-4 h-4 text-brand-teal" />
                    <span>Save Contact Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: MEDIA / IMAGE LIBRARY */}
        {/* ======================================================== */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-subtle">
              <div>
                <h2 className="font-heading text-xl font-bold text-brand-navy">
                  Server Media Library ({serverImages.length} images)
                </h2>
                <p className="text-xs text-brand-muted">
                  Upload doctor photos, hospital building images, or patient certificates directly to your server.
                </p>
              </div>

              <label className="inline-flex items-center px-4 py-2.5 rounded-xl bg-brand-teal hover:bg-brand-teal-dark text-white text-xs font-semibold shadow-sm cursor-pointer transition-all">
                <Upload className="w-4 h-4 mr-1.5" />
                <span>Upload New Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      const url = await handleFileUpload(e.target.files[0]);
                      if (url) {
                        fetchServerImages();
                      }
                    }
                  }}
                />
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {serverImages.map((img) => (
                <div
                  key={img.path}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-subtle flex flex-col justify-between group"
                >
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <Image
                      src={img.path}
                      alt={img.name}
                      fill
                      sizes="200px"
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="p-2.5">
                    <p className="text-[10px] font-mono text-gray-700 truncate" title={img.name}>
                      {img.name}
                    </p>
                  </div>

                  <div className="p-2 bg-stone-50 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(img.path);
                        showToast(`Copied path: ${img.path}`);
                      }}
                      className="text-[10px] font-semibold text-brand-teal hover:underline"
                    >
                      Copy Path
                    </button>
                    <a
                      href={img.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-gray-500 hover:text-brand-navy"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 7: GITHUB & VERCEL AUTO-SYNC */}
        {/* ======================================================== */}
        {activeTab === 'git' && (
          <div className="space-y-6">
            {/* Header Card */}
            <div className="bg-gradient-to-r from-brand-navy via-purple-900 to-brand-navy p-6 sm:p-8 rounded-3xl text-white shadow-card space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold">
                    <Rocket className="w-3.5 h-3.5" />
                    <span>Continuous Deployment Pipeline</span>
                  </div>
                  <h2 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight">
                    GitHub & Vercel Automatic Sync
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-200 max-w-2xl leading-relaxed">
                    Admin Panel me jo bhi doctor, hospital, patient photo ya settings edit karein, use yahan se 1-click me GitHub me push karein. Vercel automatically naya update live website par deploy kar dega!
                  </p>
                </div>

                <button
                  onClick={() => handleGitSync()}
                  disabled={isGitSyncing}
                  className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-brand-navy font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center space-x-2 disabled:opacity-50"
                >
                  {isGitSyncing ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-brand-navy" />
                  ) : (
                    <Rocket className="w-4 h-4 text-brand-navy" />
                  )}
                  <span>{isGitSyncing ? 'Pushing to GitHub...' : '🚀 Push to GitHub & Deploy Vercel'}</span>
                </button>
              </div>

              {/* 3-Step Flowchart Graphic */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 space-y-1">
                  <div className="flex items-center space-x-2 text-brand-teal text-xs font-bold">
                    <span>1. Admin Panel Edits</span>
                  </div>
                  <p className="text-[11px] text-gray-300">
                    Doctors, hospitals, reviews ya photos add/edit/delete hote hain.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 space-y-1">
                  <div className="flex items-center space-x-2 text-purple-300 text-xs font-bold">
                    <span>2. Auto-Commit to GitHub</span>
                  </div>
                  <p className="text-[11px] text-gray-300">
                    Changes <code className="text-amber-300">baeditor84-pixel/shameem-ahmad</code> main branch me push hote hain.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 space-y-1">
                  <div className="flex items-center space-x-2 text-emerald-300 text-xs font-bold">
                    <span>3. Vercel Auto-Deploy</span>
                  </div>
                  <p className="text-[11px] text-gray-300">
                    Vercel commit detect karke live website ko 30-40 seconds me re-deploy karta hai.
                  </p>
                </div>
              </div>
            </div>

            {/* Sync Controls & Repository Information */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Instant Push Control */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-subtle space-y-6">
                <div className="flex items-center space-x-3 pb-3 border-b border-gray-100">
                  <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700">
                    <GitBranch className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-brand-navy">
                      Trigger GitHub Commit & Push
                    </h3>
                    <p className="text-xs text-brand-muted">
                      Commit latest data to your remote repository
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                      Commit Message (Optional)
                    </label>
                    <input
                      type="text"
                      value={customCommitMsg}
                      onChange={(e) => setCustomCommitMsg(e.target.value)}
                      placeholder="e.g. feat(content): updated doctors and partner hospitals"
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-gray-200 text-xs focus:bg-white focus:border-purple-600 outline-none"
                    />
                  </div>

                  {/* Auto-Sync Toggle */}
                  <div className="p-4 rounded-2xl bg-stone-50 border border-gray-200/80 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-brand-navy">
                        Auto-Sync on Every Save
                      </p>
                      <p className="text-[11px] text-brand-muted">
                        Automatically commit and trigger Vercel deployment whenever you click &ldquo;Save&rdquo;
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoPushOnSave}
                        onChange={(e) => {
                          setAutoPushOnSave(e.target.checked);
                          if (typeof window !== 'undefined') {
                            localStorage.setItem('shameem_autopush_git', e.target.checked ? 'true' : 'false');
                          }
                          showToast(e.target.checked ? 'Auto-sync enabled!' : 'Auto-sync disabled');
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  <button
                    onClick={() => handleGitSync()}
                    disabled={isGitSyncing}
                    className="w-full py-3.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isGitSyncing ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Rocket className="w-4 h-4 text-amber-300" />
                    )}
                    <span>{isGitSyncing ? 'Pushing to GitHub & Vercel...' : 'Push to GitHub & Deploy to Vercel'}</span>
                  </button>

                  {/* Sync Result Banner */}
                  {syncResponse && (
                    <div
                      className={`p-4 rounded-2xl text-xs font-medium space-y-1 ${
                        syncResponse.success
                          ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                          : 'bg-red-50 border border-red-200 text-red-800'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {syncResponse.success ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                        )}
                        <span className="font-bold">
                          {syncResponse.success ? 'Sync Successful!' : 'Sync Failed'}
                        </span>
                      </div>
                      <p>{syncResponse.message || syncResponse.error}</p>
                      {syncResponse.syncResult?.method && (
                        <p className="text-[11px] text-gray-600 font-mono">
                          Method: {syncResponse.syncResult.method} · Branch: {syncResponse.branch}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Repository & Remote Details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-subtle space-y-4">
                  <h3 className="font-heading font-bold text-base text-brand-navy">
                    Active Git Repository
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-stone-50 border border-gray-200/70">
                      <p className="text-[10px] text-gray-500 font-medium">GitHub Repository</p>
                      <a
                        href="https://github.com/baeditor84-pixel/shameem-ahmad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono font-bold text-purple-700 hover:underline flex items-center mt-0.5"
                      >
                        <span>baeditor84-pixel/shameem-ahmad</span>
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-50 border border-gray-200/70">
                      <p className="text-[10px] text-gray-500 font-medium">Production Branch</p>
                      <p className="font-mono font-bold text-brand-navy mt-0.5">
                        origin/{gitInfo?.branch || 'main'}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-50 border border-gray-200/70">
                      <p className="text-[10px] text-gray-500 font-medium">Latest Commit</p>
                      <p className="font-mono text-gray-700 mt-0.5 break-all">
                        {gitInfo?.lastCommit || 'Checking latest commit...'}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-[11px] font-semibold">
                        {gitInfo?.gitAvailable
                          ? 'Local Git CLI Connected & Ready'
                          : 'GitHub Cloud API Sync Configured'}
                      </span>
                    </div>
                  </div>

                  {/* Direct Link Buttons */}
                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href="https://github.com/baeditor84-pixel/shameem-ahmad/commits/main"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl border border-gray-200 bg-stone-50 hover:bg-stone-100 text-xs font-semibold text-brand-navy flex items-center justify-center space-x-1.5 transition-all"
                    >
                      <span>View GitHub Commits</span>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                    </a>

                    <a
                      href="https://vercel.com/dashboard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all"
                    >
                      <span>Open Vercel Dashboard</span>
                      <ExternalLink className="w-3.5 h-3.5 text-brand-teal" />
                    </a>
                  </div>
                </div>

                {/* Cloud Token Settings (Optional for Vercel remote domain) */}
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-subtle space-y-3">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-purple-600" />
                    <h4 className="font-heading font-bold text-xs text-brand-navy">
                      GitHub Token (For Remote Vercel Admin)
                    </h4>
                  </div>
                  <p className="text-[11px] text-brand-muted leading-relaxed">
                    Agar aap website ko direct Vercel URL (e.g. <code>shameem-ahmad.vercel.app/admin</code>) se update karte hain, to yahan apna GitHub Personal Access Token enter karein.
                  </p>
                  <div className="flex items-center space-x-2">
                    <input
                      type="password"
                      value={githubToken}
                      onChange={(e) => setGithubToken(e.target.value)}
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                      className="flex-1 px-3 py-2 rounded-xl bg-stone-50 border border-gray-200 text-xs focus:bg-white outline-none"
                    />
                    <button
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          localStorage.setItem('shameem_github_token', githubToken);
                        }
                        showToast('GitHub token saved in browser!');
                      }}
                      className="px-3 py-2 rounded-xl bg-purple-700 text-white text-xs font-semibold hover:bg-purple-800"
                    >
                      Save
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* MODAL 1: ADD / EDIT DOCTOR */}
      {/* ======================================================== */}
      {doctorModalOpen && (
        <DoctorEditorModal
          initialDoctor={editingDoctor}
          serverImages={serverImages}
          onClose={() => {
            setDoctorModalOpen(false);
            setEditingDoctor(null);
          }}
          onSave={(docData) => {
            if (editingDoctor) {
              updateDoctor(editingDoctor.id, docData);
              showToast(`Updated ${docData.name}`);
            } else {
              addDoctor(docData);
              showToast(`Added ${docData.name}`);
            }
            setDoctorModalOpen(false);
            setEditingDoctor(null);
          }}
          onUpload={handleFileUpload}
        />
      )}

      {/* ======================================================== */}
      {/* MODAL 2: ADD / EDIT HOSPITAL */}
      {/* ======================================================== */}
      {hospitalModalOpen && (
        <HospitalEditorModal
          initialHospital={editingHospital}
          serverImages={serverImages}
          onClose={() => {
            setHospitalModalOpen(false);
            setEditingHospital(null);
          }}
          onSave={(hospData) => {
            if (editingHospital) {
              updateHospital(editingHospital.id, hospData);
              showToast(`Updated ${hospData.name}`);
            } else {
              addHospital(hospData);
              showToast(`Added ${hospData.name}`);
            }
            setHospitalModalOpen(false);
            setEditingHospital(null);
          }}
          onUpload={handleFileUpload}
        />
      )}

      {/* ======================================================== */}
      {/* MODAL 3: ADD / EDIT TESTIMONIAL */}
      {/* ======================================================== */}
      {testimonialModalOpen && (
        <TestimonialEditorModal
          initialTestimonial={editingTestimonial}
          onClose={() => {
            setTestimonialModalOpen(false);
            setEditingTestimonial(null);
          }}
          onSave={(testData) => {
            if (editingTestimonial) {
              updateTestimonial(editingTestimonial.id, testData);
              showToast(`Updated review from ${testData.name}`);
            } else {
              addTestimonial(testData);
              showToast(`Added review from ${testData.name}`);
            }
            setTestimonialModalOpen(false);
            setEditingTestimonial(null);
          }}
        />
      )}

      {/* ======================================================== */}
      {/* MODAL 4: ADD / EDIT PATIENT PHOTO */}
      {/* ======================================================== */}
      {photoModalOpen && (
        <PhotoEditorModal
          initialPhoto={editingPhoto}
          serverImages={serverImages}
          onClose={() => {
            setPhotoModalOpen(false);
            setEditingPhoto(null);
          }}
          onSave={(photoData) => {
            if (editingPhoto) {
              updatePatientPhoto(editingPhoto.id, photoData);
              showToast('Updated patient photo');
            } else {
              addPatientPhoto(photoData);
              showToast('Added new patient photo');
            }
            setPhotoModalOpen(false);
            setEditingPhoto(null);
          }}
          onUpload={handleFileUpload}
        />
      )}
    </div>
  );
}

// ========================================================
// SUB-COMPONENT: DOCTOR EDITOR MODAL
// ========================================================
function DoctorEditorModal({
  initialDoctor,
  serverImages,
  onClose,
  onSave,
  onUpload,
}: {
  initialDoctor: DoctorItem | null;
  serverImages: { path: string; name: string }[];
  onClose: () => void;
  onSave: (doc: Omit<DoctorItem, 'id'>) => void;
  onUpload: (file: File) => Promise<string | null>;
}) {
  const [name, setName] = useState(initialDoctor?.name || '');
  const [title, setTitle] = useState(initialDoctor?.title || '');
  const [hospital, setHospital] = useState(initialDoctor?.hospital || 'Max Healthcare');
  const [image, setImage] = useState(initialDoctor?.image || '/images/doc-dr-abhishek-goyal.jpg');
  const [specialtiesText, setSpecialtiesText] = useState(
    initialDoctor ? initialDoctor.specialties.join(', ') : 'Robotic Surgery, Oncology, Laparoscopy'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const specialties = specialtiesText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    onSave({
      name,
      title,
      hospital,
      image,
      specialties: specialties.length > 0 ? specialties : ['General Medicine'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-8">
        <div className="p-6 bg-brand-navy text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Stethoscope className="w-5 h-5 text-brand-teal" />
            <h3 className="font-heading font-bold text-lg">
              {initialDoctor ? 'Edit Doctor Information' : 'Add New Clinical Leader'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Doctor Portrait Preview & Picker */}
          <div>
            <label className="block font-semibold text-brand-navy mb-1.5">
              Doctor Portrait Image
            </label>
            <div className="flex items-center space-x-4">
              <div className="relative w-20 h-24 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 flex-shrink-0">
                <Image src={image} alt="Doctor Preview" fill className="object-cover" />
              </div>
              <div className="space-y-2 flex-1">
                <input
                  type="text"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="/images/doc-name.jpg"
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-gray-200 text-xs"
                />
                <div className="flex items-center space-x-2">
                  <label className="px-3 py-1.5 rounded-lg bg-brand-navy text-white text-[11px] font-semibold cursor-pointer hover:bg-brand-navy-light flex items-center">
                    <Upload className="w-3 h-3 mr-1 text-brand-teal" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const url = await onUpload(e.target.files[0]);
                          if (url) setImage(url);
                        }
                      }}
                    />
                  </label>

                  <select
                    onChange={(e) => {
                      if (e.target.value) setImage(e.target.value);
                    }}
                    className="px-2 py-1.5 rounded-lg bg-stone-100 border border-gray-200 text-[11px] text-gray-700 outline-none max-w-[200px]"
                  >
                    <option value="">Or select from library...</option>
                    {serverImages
                      .filter((img) => img.name.startsWith('doc') || img.name.startsWith('dr'))
                      .map((img) => (
                        <option key={img.path} value={img.path}>
                          {img.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-brand-navy mb-1">
              Doctor Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dr. Abhishek Goyal"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-gray-200 text-sm focus:bg-white focus:border-brand-teal outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-brand-navy mb-1">
              Title & Clinical Role *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Consultant, General & Minimally Invasive Surgery"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-gray-200 text-sm focus:bg-white focus:border-brand-teal outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-brand-navy mb-1">
              Hospital Affiliation *
            </label>
            <input
              type="text"
              required
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              placeholder="e.g. Max Healthcare / Medanta / Fortis"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-gray-200 text-sm focus:bg-white focus:border-brand-teal outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-brand-navy mb-1">
              Specialties (Comma separated tags)
            </label>
            <textarea
              rows={3}
              value={specialtiesText}
              onChange={(e) => setSpecialtiesText(e.target.value)}
              placeholder="e.g. Laparoscopic Surgery, GI Surgery, Hernia Surgery, Gallbladder Surgery"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-gray-200 text-xs focus:bg-white focus:border-brand-teal outline-none resize-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-stone-100 text-gray-700 font-semibold hover:bg-stone-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brand-teal text-white font-semibold hover:bg-brand-teal-dark shadow-sm"
            >
              {initialDoctor ? 'Save Changes' : 'Create Doctor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ========================================================
// SUB-COMPONENT: HOSPITAL EDITOR MODAL
// ========================================================
function HospitalEditorModal({
  initialHospital,
  serverImages,
  onClose,
  onSave,
  onUpload,
}: {
  initialHospital: HospitalItem | null;
  serverImages: { path: string; name: string }[];
  onClose: () => void;
  onSave: (hosp: Omit<HospitalItem, 'id'>) => void;
  onUpload: (file: File) => Promise<string | null>;
}) {
  const [name, setName] = useState(initialHospital?.name || '');
  const [location, setLocation] = useState(initialHospital?.location || 'Saket, SmartCity, Gurugram');
  const [image, setImage] = useState(initialHospital?.image || '/images/hosp-max.jpg');
  const [accreditation, setAccreditation] = useState(
    initialHospital?.accreditation || 'JCI & NABH Accredited'
  );
  const [highlightsText, setHighlightsText] = useState(
    initialHospital
      ? initialHospital.highlights.join(', ')
      : 'Robotic Surgery Center, Organ Transplant Suite'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const highlights = highlightsText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    onSave({
      name,
      location,
      image,
      accreditation,
      highlights: highlights.length > 0 ? highlights : ['International Patient Care'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-8">
        <div className="p-6 bg-brand-navy text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Building2 className="w-5 h-5 text-brand-teal" />
            <h3 className="font-heading font-bold text-lg">
              {initialHospital ? 'Edit Hospital' : 'Add Partner Hospital'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Hospital Building Image */}
          <div>
            <label className="block font-semibold text-brand-navy mb-1.5">
              Hospital Building Image
            </label>
            <div className="flex items-center space-x-4">
              <div className="relative w-28 h-20 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 flex-shrink-0">
                <Image src={image} alt="Hospital Preview" fill className="object-cover" />
              </div>
              <div className="space-y-2 flex-1">
                <input
                  type="text"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="/images/hosp-max.jpg"
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-gray-200 text-xs"
                />
                <div className="flex items-center space-x-2">
                  <label className="px-3 py-1.5 rounded-lg bg-brand-navy text-white text-[11px] font-semibold cursor-pointer hover:bg-brand-navy-light flex items-center">
                    <Upload className="w-3 h-3 mr-1 text-brand-teal" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const url = await onUpload(e.target.files[0]);
                          if (url) setImage(url);
                        }
                      }}
                    />
                  </label>

                  <select
                    onChange={(e) => {
                      if (e.target.value) setImage(e.target.value);
                    }}
                    className="px-2 py-1.5 rounded-lg bg-stone-100 border border-gray-200 text-[11px] text-gray-700 outline-none max-w-[200px]"
                  >
                    <option value="">Or select hospital image...</option>
                    {serverImages
                      .filter((img) => img.name.startsWith('hosp'))
                      .map((img) => (
                        <option key={img.path} value={img.path}>
                          {img.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-brand-navy mb-1">
              Hospital Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Max Super Speciality Hospital"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-gray-200 text-sm focus:bg-white focus:border-brand-teal outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-brand-navy mb-1">
              Location & Campus *
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Saket, SmartCity, Gurugram"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-gray-200 text-sm focus:bg-white focus:border-brand-teal outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-brand-navy mb-1">
              Accreditation Badge *
            </label>
            <input
              type="text"
              required
              value={accreditation}
              onChange={(e) => setAccreditation(e.target.value)}
              placeholder="e.g. JCI & NABH Accredited"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-gray-200 text-xs focus:bg-white focus:border-brand-teal outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-brand-navy mb-1">
              Key Highlights (Comma separated)
            </label>
            <textarea
              rows={2}
              value={highlightsText}
              onChange={(e) => setHighlightsText(e.target.value)}
              placeholder="e.g. Robotic Surgery Center, Organ Transplant Suite"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-gray-200 text-xs focus:bg-white focus:border-brand-teal outline-none resize-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-stone-100 text-gray-700 font-semibold hover:bg-stone-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brand-teal text-white font-semibold hover:bg-brand-teal-dark shadow-sm"
            >
              {initialHospital ? 'Save Changes' : 'Create Hospital'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ========================================================
// SUB-COMPONENT: TESTIMONIAL EDITOR MODAL
// ========================================================
function TestimonialEditorModal({
  initialTestimonial,
  onClose,
  onSave,
}: {
  initialTestimonial: TestimonialItem | null;
  onClose: () => void;
  onSave: (test: Omit<TestimonialItem, 'id'>) => void;
}) {
  const [name, setName] = useState(initialTestimonial?.name || '');
  const [country, setCountry] = useState(initialTestimonial?.country || 'Moscow, Russia');
  const [flag, setFlag] = useState(initialTestimonial?.flag || '🇷🇺');
  const [treatment, setTreatment] = useState(
    initialTestimonial?.treatment || 'Orthopaedics & Joint Replacement'
  );
  const [comment, setComment] = useState(initialTestimonial?.comment || '');
  const [rating, setRating] = useState(initialTestimonial?.rating || 5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      country,
      flag,
      treatment,
      comment,
      rating: Number(rating) || 5,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-8">
        <div className="p-6 bg-brand-navy text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h3 className="font-heading font-bold text-lg">
              {initialTestimonial ? 'Edit Patient Review' : 'Add New Patient Review'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-brand-navy mb-1">
                Patient Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Elena Rostova"
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-gray-200 text-sm focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-brand-navy mb-1">
                Country Flag Emoji
              </label>
              <input
                type="text"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                placeholder="e.g. 🇷🇺 or 🇳🇵"
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-gray-200 text-sm focus:bg-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-brand-navy mb-1">
                Country / City *
              </label>
              <input
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. Moscow, Russia"
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-gray-200 text-xs focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-brand-navy mb-1">
                Star Rating (1 - 5)
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-gray-200 text-xs focus:bg-white outline-none"
              >
                <option value={5}>5 Stars ★★★★★</option>
                <option value={4}>4 Stars ★★★★</option>
                <option value={3}>3 Stars ★★★</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-brand-navy mb-1">
              Treatment / Specialty Received *
            </label>
            <input
              type="text"
              required
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
              placeholder="e.g. Liver Transplant Coordination"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-gray-200 text-xs focus:bg-white outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-brand-navy mb-1">
              Patient Testimonial Quote *
            </label>
            <textarea
              rows={4}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write the patient's experience and words of gratitude..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-gray-200 text-xs focus:bg-white outline-none resize-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-stone-100 text-gray-700 font-semibold hover:bg-stone-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brand-teal text-white font-semibold hover:bg-brand-teal-dark shadow-sm"
            >
              {initialTestimonial ? 'Save Changes' : 'Post Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ========================================================
// SUB-COMPONENT: PATIENT PHOTO GALLERY EDITOR MODAL
// ========================================================
function PhotoEditorModal({
  initialPhoto,
  serverImages,
  onClose,
  onSave,
  onUpload,
}: {
  initialPhoto: PatientPhotoItem | null;
  serverImages: { path: string; name: string }[];
  onClose: () => void;
  onSave: (photo: Omit<PatientPhotoItem, 'id'>) => void;
  onUpload: (file: File) => Promise<string | null>;
}) {
  const [src, setSrc] = useState(initialPhoto?.src || '/images/all-patient-1.jpg');
  const [alt, setAlt] = useState(
    initialPhoto?.alt || 'Patient hospital consultation and report review'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ src, alt });
  };

  return (
    <div className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-8">
        <div className="p-6 bg-brand-navy text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <ImageIcon className="w-5 h-5 text-brand-teal" />
            <h3 className="font-heading font-bold text-lg">
              {initialPhoto ? 'Edit Patient Gallery Photo' : 'Add Patient Journey Photo'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Photo Preview & Upload */}
          <div>
            <label className="block font-semibold text-brand-navy mb-1.5">
              Photo Preview
            </label>
            <div className="relative aspect-[4/3] rounded-2xl bg-gray-100 overflow-hidden border border-gray-200 mb-3">
              <Image src={src} alt="Patient Preview" fill className="object-cover" />
            </div>

            <div className="space-y-2">
              <input
                type="text"
                required
                value={src}
                onChange={(e) => setSrc(e.target.value)}
                placeholder="/images/all-patient-1.jpg"
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-gray-200 text-xs"
              />
              <div className="flex items-center space-x-2">
                <label className="px-3.5 py-2 rounded-xl bg-brand-navy text-white text-xs font-semibold cursor-pointer hover:bg-brand-navy-light flex items-center">
                  <Upload className="w-3.5 h-3.5 mr-1.5 text-brand-teal" />
                  <span>Upload from Computer</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        const url = await onUpload(e.target.files[0]);
                        if (url) setSrc(url);
                      }
                    }}
                  />
                </label>

                <select
                  onChange={(e) => {
                    if (e.target.value) setSrc(e.target.value);
                  }}
                  className="px-2.5 py-2 rounded-xl bg-stone-100 border border-gray-200 text-xs text-gray-700 outline-none flex-1 truncate"
                >
                  <option value="">Or pick existing patient photo...</option>
                  {serverImages
                    .filter((img) => img.name.includes('patient'))
                    .map((img) => (
                      <option key={img.path} value={img.path}>
                        {img.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-brand-navy mb-1">
              Photo Caption / Description *
            </label>
            <input
              type="text"
              required
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="e.g. Diagnostic consultation & report translation at Max"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-gray-200 text-sm focus:bg-white outline-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-stone-100 text-gray-700 font-semibold hover:bg-stone-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brand-teal text-white font-semibold hover:bg-brand-teal-dark shadow-sm"
            >
              {initialPhoto ? 'Save Photo' : 'Add to Gallery'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
