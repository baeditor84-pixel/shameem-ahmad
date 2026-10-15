'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  SiteData,
  defaultSiteData,
  DoctorItem,
  HospitalItem,
  TestimonialItem,
  PatientPhotoItem,
  HeroSettings,
  ContactSettings,
  InquiryItem,
} from '@/data/defaultSiteData';

interface SiteContentContextType {
  siteData: SiteData;
  isLoading: boolean;
  isSaving: boolean;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
  saveChanges: (newData?: SiteData) => Promise<boolean>;
  resetToDefault: () => Promise<boolean>;
  refreshData: () => Promise<void>;
  
  // Doctors
  addDoctor: (doctor: Omit<DoctorItem, 'id'>) => void;
  updateDoctor: (id: string, doctor: Partial<DoctorItem>) => void;
  deleteDoctor: (id: string) => void;

  // Hospitals
  addHospital: (hospital: Omit<HospitalItem, 'id'>) => void;
  updateHospital: (id: string, hospital: Partial<HospitalItem>) => void;
  deleteHospital: (id: string) => void;

  // Testimonials
  addTestimonial: (item: Omit<TestimonialItem, 'id'>) => void;
  updateTestimonial: (id: string, item: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;

  // Patient Photos Gallery
  addPatientPhoto: (photo: Omit<PatientPhotoItem, 'id'>) => void;
  updatePatientPhoto: (id: string, photo: Partial<PatientPhotoItem>) => void;
  deletePatientPhoto: (id: string) => void;

  // Hero & Contact Settings
  updateHero: (hero: Partial<HeroSettings>) => void;
  updateContact: (contact: Partial<ContactSettings>) => void;

  // Inquiries
  updateInquiryStatus: (id: string, status: 'new' | 'contacted' | 'resolved') => void;
  deleteInquiry: (id: string) => void;

  // Import / Export
  exportBackup: () => void;
  importBackup: (jsonData: string) => Promise<boolean>;

  // Git & Vercel Sync
  isGitSyncing: boolean;
  syncToGitAndVercel: (
    customMessage?: string,
    token?: string
  ) => Promise<{ success: boolean; message: string; method?: string; error?: string }>;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'shameem_site_content_cache';

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [isGitSyncing, setIsGitSyncing] = useState<boolean>(false);

  // Load content from API with localStorage fallback
  const refreshData = useCallback(async () => {
    try {
      const res = await fetch('/api/content', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setSiteData(json.data);
          if (typeof window !== 'undefined') {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(json.data));
          }
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn('Could not fetch /api/content, checking local cache:', e);
    }

    // Fallback to local storage if API call fails
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setSiteData(parsed);
          setIsLoading(false);
          return;
        } catch {}
      }
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Check local storage immediately for fast render
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        try {
          setSiteData(JSON.parse(cached));
        } catch {}
      }
    }
    refreshData();
  }, [refreshData]);

  // Save changes to API & update localStorage
  const saveChanges = async (newData?: SiteData): Promise<boolean> => {
    const dataToSave = newData || siteData;
    setIsSaving(true);
    setSaveStatus('saving');

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setSiteData(json.data);
          if (typeof window !== 'undefined') {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(json.data));
          }
          setIsSaving(false);
          setSaveStatus('saved');
          setTimeout(() => setSaveStatus('idle'), 3000);
          return true;
        }
      }
      throw new Error('Server returned error');
    } catch (error) {
      console.error('Failed to save to server:', error);
      // Fallback: save to localStorage anyway so changes aren't lost
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
      }
      setIsSaving(false);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 4000);
      return false;
    }
  };

  // Reset to default data
  const resetToDefault = async (): Promise<boolean> => {
    const ok = await saveChanges(defaultSiteData);
    if (ok) {
      setSiteData(defaultSiteData);
    }
    return ok;
  };

  // Doctors CRUD
  const addDoctor = (doc: Omit<DoctorItem, 'id'>) => {
    const newDoc: DoctorItem = {
      ...doc,
      id: `doc-${Date.now()}`,
    };
    const updated = {
      ...siteData,
      doctors: [...siteData.doctors, newDoc],
    };
    setSiteData(updated);
    saveChanges(updated);
  };

  const updateDoctor = (id: string, updates: Partial<DoctorItem>) => {
    const updated = {
      ...siteData,
      doctors: siteData.doctors.map((d) => (d.id === id ? { ...d, ...updates } : d)),
    };
    setSiteData(updated);
    saveChanges(updated);
  };

  const deleteDoctor = (id: string) => {
    const updated = {
      ...siteData,
      doctors: siteData.doctors.filter((d) => d.id !== id),
    };
    setSiteData(updated);
    saveChanges(updated);
  };

  // Hospitals CRUD
  const addHospital = (hosp: Omit<HospitalItem, 'id'>) => {
    const newHosp: HospitalItem = {
      ...hosp,
      id: `hosp-${Date.now()}`,
    };
    const updated = {
      ...siteData,
      hospitals: [...siteData.hospitals, newHosp],
    };
    setSiteData(updated);
    saveChanges(updated);
  };

  const updateHospital = (id: string, updates: Partial<HospitalItem>) => {
    const updated = {
      ...siteData,
      hospitals: siteData.hospitals.map((h) => (h.id === id ? { ...h, ...updates } : h)),
    };
    setSiteData(updated);
    saveChanges(updated);
  };

  const deleteHospital = (id: string) => {
    const updated = {
      ...siteData,
      hospitals: siteData.hospitals.filter((h) => h.id !== id),
    };
    setSiteData(updated);
    saveChanges(updated);
  };

  // Testimonials CRUD
  const addTestimonial = (test: Omit<TestimonialItem, 'id'>) => {
    const newTest: TestimonialItem = {
      ...test,
      id: `test-${Date.now()}`,
    };
    const updated = {
      ...siteData,
      testimonials: [newTest, ...siteData.testimonials],
    };
    setSiteData(updated);
    saveChanges(updated);
  };

  const updateTestimonial = (id: string, updates: Partial<TestimonialItem>) => {
    const updated = {
      ...siteData,
      testimonials: siteData.testimonials.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    };
    setSiteData(updated);
    saveChanges(updated);
  };

  const deleteTestimonial = (id: string) => {
    const updated = {
      ...siteData,
      testimonials: siteData.testimonials.filter((t) => t.id !== id),
    };
    setSiteData(updated);
    saveChanges(updated);
  };

  // Patient Photos CRUD
  const addPatientPhoto = (photo: Omit<PatientPhotoItem, 'id'>) => {
    const newPhoto: PatientPhotoItem = {
      ...photo,
      id: `photo-${Date.now()}`,
    };
    const updated = {
      ...siteData,
      patientPhotos: [newPhoto, ...siteData.patientPhotos],
    };
    setSiteData(updated);
    saveChanges(updated);
  };

  const updatePatientPhoto = (id: string, updates: Partial<PatientPhotoItem>) => {
    const updated = {
      ...siteData,
      patientPhotos: siteData.patientPhotos.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    };
    setSiteData(updated);
    saveChanges(updated);
  };

  const deletePatientPhoto = (id: string) => {
    const updated = {
      ...siteData,
      patientPhotos: siteData.patientPhotos.filter((p) => p.id !== id),
    };
    setSiteData(updated);
    saveChanges(updated);
  };

  // Hero & Contact Settings
  const updateHero = (heroUpdates: Partial<HeroSettings>) => {
    const updated = {
      ...siteData,
      hero: { ...siteData.hero, ...heroUpdates },
    };
    setSiteData(updated);
    saveChanges(updated);
  };

  const updateContact = (contactUpdates: Partial<ContactSettings>) => {
    const updated = {
      ...siteData,
      contact: { ...siteData.contact, ...contactUpdates },
    };
    setSiteData(updated);
    saveChanges(updated);
  };

  // Inquiries
  const updateInquiryStatus = (id: string, status: 'new' | 'contacted' | 'resolved') => {
    const updated = {
      ...siteData,
      inquiries: siteData.inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq)),
    };
    setSiteData(updated);
    saveChanges(updated);
  };

  const deleteInquiry = (id: string) => {
    const updated = {
      ...siteData,
      inquiries: siteData.inquiries.filter((inq) => inq.id !== id),
    };
    setSiteData(updated);
    saveChanges(updated);
  };

  // Export / Import
  const exportBackup = () => {
    const jsonStr = JSON.stringify(siteData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shameem-website-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importBackup = async (jsonData: string): Promise<boolean> => {
    try {
      const parsed = JSON.parse(jsonData);
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Invalid JSON format');
      }
      return await saveChanges(parsed);
    } catch (e) {
      console.error('Import backup failed:', e);
      return false;
    }
  };

  const syncToGitAndVercel = async (
    customMessage?: string,
    token?: string
  ): Promise<{ success: boolean; message: string; method?: string; error?: string }> => {
    setIsGitSyncing(true);
    try {
      // 1. Ensure local state is saved
      await saveChanges(siteData);

      // 2. Call /api/git/sync
      const savedToken =
        token ||
        (typeof window !== 'undefined'
          ? localStorage.getItem('shameem_github_token') || undefined
          : undefined);

      const res = await fetch('/api/git/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: siteData,
          commitMessage:
            customMessage ||
            `chore(content): update website content via Admin Panel (${new Date().toLocaleDateString()})`,
          githubToken: savedToken,
        }),
      });

      const json = await res.json();
      setIsGitSyncing(false);
      return json;
    } catch (err: any) {
      setIsGitSyncing(false);
      return { success: false, message: 'Sync failed', error: err?.message };
    }
  };

  return (
    <SiteContentContext.Provider
      value={{
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
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = (): SiteContentContextType => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
};
