export function bindJournal(onOpen: (open: boolean) => void) {
  const directory = document.querySelector<HTMLElement>('.directory')!;
  const journal = document.querySelector<HTMLDialogElement>('.journal')!;
  const entries = new Map(Array.from(directory.querySelectorAll<HTMLElement>('.entry')).map((entry) => [entry.id, entry]));
  let current: HTMLElement | null = null;
  let returnFocus: HTMLElement | null = null;
  const enhanced = typeof journal.showModal === 'function';

  function sync(restoreFocus = true) {
    if (!enhanced) return;
    const entry = entries.get(location.hash.slice(1));
    if (entry === current) return;

    if (!entry) {
      if (!current) return;
      directory.append(current);
      current = null;
      journal.close();
      onOpen(false);
      if (restoreFocus) {
        const fallback = document.querySelector<HTMLElement>('.main-nav a');
        (returnFocus?.getClientRects().length ? returnFocus : fallback)?.focus({ preventScroll: true });
      }
      returnFocus = null;
      return;
    }

    const opening = !journal.open;
    if (opening) returnFocus = document.activeElement as HTMLElement;
    if (current) directory.append(current);
    journal.append(entry);
    current = entry;
    const label = entry.getAttribute('aria-labelledby');
    if (label) journal.setAttribute('aria-labelledby', label);
    journal.scrollTop = 0;
    if (opening) {
      journal.showModal();
      onOpen(true);
    }
    entry.querySelector<HTMLElement>('.entry-close')?.focus({ preventScroll: true });
  }

  function goTo(id: string, restoreFocus = true) {
    if (!enhanced) {
      location.hash = id;
      return;
    }
    if (location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
    sync(restoreFocus);
  }

  if (enhanced) {
    document.documentElement.dataset.routing = '';
    document.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.altKey || event.ctrlKey || event.metaKey
        || event.shiftKey || !(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const id = link.hash.slice(1);
      if (id !== 'world' && !entries.has(id)) return;
      event.preventDefault();
      goTo(id);
    });
    journal.addEventListener('cancel', (event) => {
      event.preventDefault();
      goTo('world');
    });
    journal.addEventListener('click', (event) => {
      if (event.target !== journal) return;
      const rect = journal.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY > rect.bottom) goTo('world');
    });
    window.addEventListener('hashchange', () => sync());
    window.addEventListener('popstate', () => sync());
    sync();
  }

  return { goTo, get open() { return journal.open; } };
}
