import React from 'react';
import { BLOG_POSTS } from '../data/blogPosts';
import { BlogCard } from '../components/BlogCard';
export function ComparisonsPage() {
  return <main className="max-w-5xl mx-auto px-6 pt-28 pb-20 min-h-screen">
    <h1 className="text-4xl font-bold mb-6">AI Tool Comparisons</h1>
    <p className="text-gray-300 mb-10">Side-by-side editorial comparisons to help you choose software for your work.</p>
    <div className="grid md:grid-cols-2 gap-8">{BLOG_POSTS.filter(post => post.slug.startsWith('/comparisons/')).map(post => <BlogCard key={post.slug} post={post} />)}</div>
  </main>;
}

