export function filterNotes(notes, sorting, filtering) {
  let result = [...notes];
  if (sorting === "updated-desc")
    result = result.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  else if (sorting === "updated-asc")
    result = result.sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime());
  else if (sorting === "title") result = result.sort((a, b) => a.title.localeCompare(b.title));

  if (filtering === "updated")
    result = result.filter((note) => +note.createdAt !== +note.updatedAt);

  return result;
}

export function notesState(notes, filteredNotes) {
  if (notes.length === 0) return "Нет заметок";
  else if (notes.length !== 0 && filteredNotes.length === 0) return "Ничего не найдено";
  else return "";
}
