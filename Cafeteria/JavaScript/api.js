const API_URL = "http://localhost:3000/cafes";

export async function getCafes() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Erro ao carregar cafés");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar cafés:", error);
    return [];
  }
}

export async function getCafePorId(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Café não encontrado");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
