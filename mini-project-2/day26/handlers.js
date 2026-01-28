import { render, deleteCard } from "./render.js";

export function initHandlers(els, actions) {
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
    const actionBtn = event.target.closest("[data-action]");
    if (!actionBtn) return;
    const action = actionBtn.dataset.action;
    const id = card.dataset.id;
    switch (action) {
      case "delete":
        actions.deleteNote(id);
        deleteCard(id);
        break;

      case "edit":
        actions.startEditNote(id);
        render();
        break;

      case "save":
        const title = card.querySelector(".notes_change_title").value;
        const text = card.querySelector(".notes_change_text").value;
        if (actions.updateNote(title, text, id)) actions.endEditNote();
        render();
        break;

      case "cancel":
        actions.endEditNote();
        render();
        break;

      default:
        return;
    }
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
