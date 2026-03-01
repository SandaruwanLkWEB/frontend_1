import { API_BASE } from './config.js';
import { getToken, clearToken } from './auth.js';

async function request(path, opts={}){
  const token = getToken();
  const headers = opts.headers || {};
  if(!(opts.body instanceof FormData)) headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  if(token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  if(res.status === 401){
    clearToken();
    location.href = '../pages/login.html';
    throw new Error('Unauthorized');
  }
  const ct = res.headers.get('content-type') || '';
  const data = ct.includes('application/json') ? await res.json().catch(()=>({})) : await res.text();
  if(!res.ok){
    const msg = data?.error || 'Request failed';
    throw new Error(msg);
  }
  return data;
}

export const api = {
  get: (p)=>request(p),
  post: (p, body)=>request(p, { method:'POST', body: body instanceof FormData ? body : JSON.stringify(body) }),
  put: (p, body)=>request(p, { method:'PUT', body: JSON.stringify(body) }),
  del: (p)=>request(p, { method:'DELETE' }),
  upload: (p, file)=>{
    const fd = new FormData();
    fd.append('file', file);
    return request(p, { method:'POST', body: fd, headers: {} });
  }
};
