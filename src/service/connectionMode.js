import { LOCAL_API_URL } from "../config.js";
export async function detectConnectionMode(){
  try{
    const controller = new AbortController();
    const timeout = setTimeout(()=> controller.abort(), 1500);
    const res = await fetch(`${LOCAL_API_URL}/health`, { signal: controller.signal });
    clearTimeout(timeout);
    if(res.ok) return { mode:'LOCAL', label:'🟢 LOCAL MODE — School Network', color:'#10b981' };
    throw new Error();
  }catch{
    return { mode:'ONLINE', label:'🌐 ONLINE MODE — Internet', color:'#3b82f6' };
  }
}
