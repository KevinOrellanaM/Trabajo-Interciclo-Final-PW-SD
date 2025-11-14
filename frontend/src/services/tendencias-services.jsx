export async function getTendencias() {
  const res = await fetch("http://localhost:8000/api/tendencias");
  return await res.json();
}
