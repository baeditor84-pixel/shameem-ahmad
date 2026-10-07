import React from 'react';
import { notFound } from 'next/navigation';
import { specialtiesData, getSpecialtyBySlug } from '@/data/specialties';
import { SpecialtyClientView } from './SpecialtyClientView';

export function generateStaticParams() {
  return specialtiesData.map((spec) => ({
    slug: spec.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const specialty = getSpecialtyBySlug(resolvedParams.slug);

  if (!specialty) {
    return {
      title: 'Specialty Not Found - Shameem Ahmad',
    };
  }

  return {
    title: `${specialty.en.title} in Delhi NCR | Shameem Ahmad Medical Interpreter`,
    description: specialty.en.description,
  };
}

export default async function SpecialtyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const specialty = getSpecialtyBySlug(resolvedParams.slug);

  if (!specialty) {
    notFound();
  }

  return <SpecialtyClientView specialty={specialty} />;
}
