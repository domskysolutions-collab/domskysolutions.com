import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { toolsDropdown } from '../data/navigation';

const links = [['/uses','Lean Stack'],['/reviews','Reviews'],['/comparisons','Comparisons'],['/blog','Blog'],['/about','About']];
export const Navbar = () => {
  const location = useLocation();
  const [open,setOpen] = useState(false);
  const [toolsOpen,setToolsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const toolsButton = useRef<HTMLButtonElement>(null);
  useEffect(()=>{setOpen(false);setToolsOpen(false);},[location.pathname,location.hash]);
  const linkStyle='block py-3 text-sm font-medium text-gray-300 hover:text-brand-cyan transition-colors';
  return <nav aria-label="Main navigation" className="fixed inset-x-0 top-0 z-50 bg-brand-bg/95 backdrop-blur-md border-b border-brand-border" onKeyDown={event=>{if(event.key==='Escape'){if(toolsOpen){setToolsOpen(false);toolsButton.current?.focus();}else{setOpen(false);menuButton.current?.focus();}}}}>
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      <div className="flex items-center justify-between gap-10 min-h-24">
        <Link to="/" aria-label="Domsky Solutions home" className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan">
          <img src="/images/domsky-logo-transparent.png" alt="Domsky Solutions" width={374} height={109} className="block w-[160px] sm:w-[185px] h-auto object-contain" />
        </Link>
        <button ref={menuButton} type="button" className="lg:hidden p-3 text-white" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="primary-navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
        <div id="primary-navigation" className={`${open?'flex':'hidden'} lg:flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-8 absolute lg:static top-full left-0 right-0 p-6 lg:p-0 bg-brand-bg max-h-[calc(100dvh-96px)] overflow-y-auto lg:overflow-visible border-b lg:border-0 border-brand-border`}>
          <div className="relative" onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setToolsOpen(false);}}>
            <button ref={toolsButton} type="button" className={`${linkStyle} flex items-center justify-between gap-2 w-full`} aria-expanded={toolsOpen} aria-controls="free-tools-menu" onClick={()=>setToolsOpen(!toolsOpen)}>Free Tools <ChevronDown size={16}/></button>
            {toolsOpen&&<div id="free-tools-menu" className="lg:absolute lg:top-full lg:left-0 lg:w-80 rounded-xl border border-brand-border bg-brand-surface p-3 shadow-xl">
              {toolsDropdown.filter(item=>item.section==='FREE TOOLS').map(item=><Link key={item.link} to={item.link} className="block rounded-lg px-4 py-3 hover:bg-brand-surface-hover"><span className="block text-white font-semibold text-sm">{item.title}</span><span className="block text-gray-400 text-xs mt-1 leading-relaxed">{item.description}</span></Link>)}
            </div>}
          </div>
          {links.map(([to,label])=><Link key={to} to={to} className={linkStyle} aria-current={location.pathname===to?'page':undefined}>{label}</Link>)}
          <Link to="/#stack-finder" className="rounded-lg border border-brand-cyan/50 px-5 py-3 text-sm font-bold text-brand-cyan hover:bg-brand-surface">Find my stack</Link>
        </div>
      </div>
    </div>
  </nav>;
};
