export function $(sel, root=document){ return root.querySelector(sel); }
export function $all(sel, root=document){ return [...root.querySelectorAll(sel)]; }

export function toast(msg, type='ok'){
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=>{ t.remove(); }, 2800);
}

export function setTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

export function initThemeToggle(btn){
  const theme = localStorage.getItem('theme') || 'light';
  setTheme(theme);
  if(btn){
    btn.textContent = theme === 'dark' ? '🌙 Dark' : '☀️ Light';
    btn.addEventListener('click', ()=>{
      const cur = document.documentElement.getAttribute('data-theme') || 'light';
      const next = cur === 'dark' ? 'light' : 'dark';
      setTheme(next);
      btn.textContent = next === 'dark' ? '🌙 Dark' : '☀️ Light';
    });
  }
}

export function setActiveTab(tabsRoot, tabId){
  tabsRoot.querySelectorAll('[data-tab]')?.forEach(b=>b.classList.toggle('active', b.dataset.tab===tabId));
  document.querySelectorAll('[data-panel]')?.forEach(p=>p.style.display = p.dataset.panel===tabId ? 'block' : 'none');
}
