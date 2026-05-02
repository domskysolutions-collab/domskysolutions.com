import React from 'react';
import { useParams } from 'react-router-dom';
import { getToolBySlug } from '../data/tools';
import { ToolDetailPage } from './ToolDetailPage';
import { ToolPage } from './tools/ToolPage';

/**
 * /tools/:slug — AI workspace tools from config, or legacy tool review pages.
 */
export function ToolsSlugPage() {
  const { slug } = useParams<{ slug: string }>();
  const aiTool = slug ? getToolBySlug(slug) : undefined;

  if (aiTool) {
    return <ToolDetailPage tool={aiTool} />;
  }

  return <ToolPage />;
}
