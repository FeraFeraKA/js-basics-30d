export function initHandlers(els, actions, render) {
  els.notesAdd.addEventListener("click", () => {
    const title = els.notesInputTitle.value;
    const text = els.notesInputText.value;
    if (actions.addNote(title, text)) {
      els.notesInputTitle.value = "";
      els.notesInputText.value = "";
    }
    render();
  });

  els.notesAdding.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || !event.target.closest("input")) return;
    const title = els.notesInputTitle.value;
    const text = els.notesInputText.value;
    if (actions.addNote(title, text)) {
      els.notesInputTitle.value = "";
      els.notesInputText.value = "";
    }
    render();
  });

  els.notesList.addEventListener("click", (event) => {
    const card = event.target.closest(".notes_card");
    if (!card) return;
    const id = card.dataset.id;
    if (event.target.closest(".notes_delete")) actions.deleteNote(id);
    else if (event.target.closest(".notes_edit")) actions.startEditNote(id);
    else if (event.target.closest(".change_save")) {
      const title = card.querySelector(".notes_change_title").value;
      const text = card.querySelector(".notes_change_text").value;
      if (actions.updateNote(title, text, id)) actions.endEditNote();
    } else if (event.target.closest(".change_cancel")) actions.endEditNote();
    else return;
    render();
  });

  els.notesList.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const card = event.target.closest(".notes_card");
    if (!card) return;
    const id = card.dataset.id;
    if (!event.target.closest("input")) return;
    const title = card.querySelector(".notes_change_title").value;
    const text = card.querySelector(".notes_change_text").value;
    if (actions.updateNote(title, text, id)) actions.endEditNote();
    render();
  });

  els.notesSort.addEventListener("change", () => {
    actions.changeSort(els.notesSort.value);
    render();
  });

  els.notesFilter.addEventListener("change", () => {
    actions.changeFilter(els.notesFilter.value);
    render();
  });

  els.notesReset.addEventListener("click", () => {
    actions.resetSelects();
    els.notesSort.value = "updated-desc";
    els.notesFilter.value = "all";
    render();
  });
}
