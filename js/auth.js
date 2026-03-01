import { API_BASE } from './config.js';

export function getToken(){ return localStorage.getItem('token'); }
export function setToken(t){ localStorage.setItem('token', t); }
export function clearToken(){ localStorage.removeItem('token'); localStorage.removeItem('user'); }
export function getUser(){
  try{ return JSON.parse(localStorage.getItem('user')||'null'); }catch{return null;}
}
export function setUser(u){ localStorage.setItem('user', JSON.stringify(u)); }

export function roleHome(role){
  if(role==='ADMIN') return 'pages/admin.html';
  if(role==='HOD') return 'pages/hod.html';
  if(role==='TA') return 'pages/ta.html';
  if(role==='HR') return 'pages/hr.html';
  if(role==='EMP') return 'pages/emp.html';
  return 'pages/login.html';
}

export async function fetchMe(){
  const token = getToken();
  if(!token) return null;
  const r = await fetch(`${API_BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` }});
  if(!r.ok) return null;
  const j = await r.json();
  setUser(j.user);
  return j.user;
}

export function requireLogin(){
  const token = getToken();
  const u = getUser();
  if(!token || !u){
    location.href = '../pages/login.html';
    return null;
  }
  return { token, user: u };
}

export function logout(){
  clearToken();
  location.href = '../pages/login.html';
}

export async function login(email,password){
  const r = await fetch(`${API_BASE}/auth/login`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({email,password})
  });
  const j = await r.json().catch(()=>({}));
  if(!r.ok) throw new Error(j.error || 'Login failed');
  setToken(j.token);
  setUser(j.user);
  return j;
}

export async function registerEmp(payload){
  const r = await fetch(`${API_BASE}/auth/register`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  const j = await r.json().catch(()=>({}));
  if(!r.ok) throw new Error(j.error || 'Register failed');
  setToken(j.token);
  setUser(j.user);
  return j;
}
