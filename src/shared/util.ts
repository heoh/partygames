export function closeActiveDropdown() {
  document.activeElement instanceof HTMLElement && document.activeElement.blur();
}
