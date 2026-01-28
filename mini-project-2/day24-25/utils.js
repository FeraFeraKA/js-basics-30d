export function filterNotes(notes, sorting, filtering) {
  let result = [...notes];
  if (sorting === "updated-desc") result = result.sort((a, b) => b.updatedAt - a.updatedAt);
  else if (sorting === "updated-asc") result = result.sort((a, b) => a.updatedAt - b.updatedAt);
  else if (sorting === "title") result = result.sort((a, b) => a.title.localeCompare(b.title));

  if (filtering === "updated") result = result.filter((note) => note.createdAt !== note.updatedAt);

  return result;
}

export function notesState(notes, filteredNotes) {
  if (notes.length === 0) return "Нет заметок";
  else if (notes.length !== 0 && filteredNotes.length === 0) return "Ничего не найдено";
  else return "";
}

export function formatDate(timestamp) {
  if (typeof timestamp !== "number") return "—";
  const date = new Date(timestamp);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  return day + "." + month + "." + year + ", " + hours + ":" + minutes;
}
