(() => {
  const group = document.querySelector('#personal-projects');
  const filters = group.querySelector('.profile-filters');
  const projects = [...group.querySelectorAll('.profile-project')];
  const filterItems = [...group.querySelectorAll('[data-project-category]')];
  const status = group.querySelector('.profile-filter-status');

  if (projects.length) {
    filters.hidden = false;
    filters.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-project-filter]');
      if (!button) return;

      filters.querySelectorAll('button').forEach((filter) => {
        filter.setAttribute('aria-pressed', String(filter === button));
      });
      const category = button.dataset.projectFilter;
      const showAll = button.hasAttribute('data-project-filter-all');
      filterItems.forEach((project) => {
        project.hidden = !showAll && project.dataset.projectCategory !== category;
      });
      status.hidden = false;
      status.textContent = `${button.textContent} 프로젝트 ${projects.filter((project) => !project.hidden).length}개`;
    });
  }

  const dialog = document.querySelector('#project-modal');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  const content = dialog.querySelector('.profile-modal__content');
  const scroller = dialog.querySelector('.profile-modal__scroll');
  let trigger;
  let previousOverflow;

  document.addEventListener('click', (event) => {
    const link = event.target.closest('[data-project-modal]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const template = document.getElementById(link.dataset.projectModal);
    if (!template) return;

    event.preventDefault();
    trigger = link;
    content.replaceChildren(template.content.cloneNode(true));
    previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    dialog.showModal();
    scroller.scrollTop = 0;
  });

  dialog.addEventListener('click', (event) => {
    if (event.target.closest('[data-project-close]')) {
      dialog.close();
      return;
    }
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });

  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]')].filter((element) => element.getClientRects().length);
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = previousOverflow;
    content.replaceChildren();
    trigger.focus({ preventScroll: true });
  });
})();
