import { initThemeToggle } from './ui.js';
import { getUser, roleHome, logout } from './auth.js';

export function mountTopbar({ root, title }){
  const u = getUser();
  root.innerHTML = `
  <div class="topbar">
    <div class="brand">
      <div class="badge"></div>
      <div>
        <h1>${title || 'DSI Transport Management System'}</h1>
        <small>Places-Only v4</small>
      </div>
    </div>
    <div class="actions">
      <button class="btn" id="themeBtn">☀️ Light</button>
      ${u ? `<button class="btn" id="homeBtn">🏠 Home</button>
            <button class="btn" id="profileBtn">👤 Profile</button>
            <button class="btn danger" id="logoutBtn">Logout</button>` : ''}
    </div>
  </div>`;

  initThemeToggle(root.querySelector('#themeBtn'));

  if(u){
    root.querySelector('#homeBtn')?.addEventListener('click', ()=>{
      location.href = '../' + roleHome(u.role);
    });
    root.querySelector('#profileBtn')?.addEventListener('click', ()=>{
      location.href = '../pages/profile.html';
    });
    root.querySelector('#logoutBtn')?.addEventListener('click', logout);
  }
}
