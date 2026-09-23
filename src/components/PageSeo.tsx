import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getPageSeo, getBreadcrumbs, renderSeoHead } from '../data/seo';

export function PageSeo() {
  const { pathname, hash } = useLocation();
  const meta = getPageSeo(pathname);
  useEffect(() => {
    const template = document.createElement('template');
    template.innerHTML = renderSeoHead(meta);
    document.head.querySelectorAll('[data-page-seo], meta[property="og:image"], meta[property="twitter:image"], meta[property="twitter:card"], title, meta[name="title"], meta[name="description"], meta[name="robots"], link[rel="canonical"], #page-schema, meta[property="og:title"], meta[property="og:description"], meta[property="og:url"], meta[property="og:type"], meta[property="twitter:title"], meta[property="twitter:description"], meta[property="twitter:url"]').forEach(node => node.remove());
    document.head.append(template.content);
    if (hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView());
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  if (meta.path === '/' || meta.noindex) return null;
  return <nav aria-label="Breadcrumb" className="relative top-24 max-w-7xl mx-auto px-6 text-sm text-gray-400">
    <ol className="flex flex-wrap gap-2">{getBreadcrumbs(meta).map((crumb, index, list) => <li key={crumb.path}>
      {index > 0 && <span aria-hidden="true" className="mr-2">/</span>}
      {index === list.length - 1 ? <span aria-current="page">{crumb.name}</span> : <Link className="hover:text-brand-cyan underline" to={crumb.path}>{crumb.name}</Link>}
    </li>)}</ol>
  </nav>;
}


