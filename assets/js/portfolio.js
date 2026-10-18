(() => {
  document.querySelectorAll('[data-project-group]').forEach((group) => {
    const cards = [...group.querySelectorAll('.profile-project')];
    const filters = group.querySelector('.profile-filters');
    const stores = group.querySelector('.profile-store-links');
    const more = group.querySelector('[data-project-more]');
    const status = group.querySelector('.profile-filter-status');
    const title = group.querySelector('h3').textContent;
    let category = null;
    let expanded = false;

    const matches = (card) => !category || card.dataset.projectCategory === category;
    const render = (announce = false) => {
      const matching = cards.filter(matches);
      const extraCount = matching.filter((card) => card.hasAttribute('data-project-extra')).length;
      cards.forEach((card) => {
        card.hidden = !matches(card) || (!expanded && card.hasAttribute('data-project-extra'));
      });
      if (stores) stores.hidden = !!category && category !== '앱';
      more.hidden = !extraCount;
      more.setAttribute('aria-expanded', String(expanded));
      more.setAttribute('aria-label', expanded ? `${title} 접기` : `${title} ${extraCount}개 더 보기`);
      more.querySelector('[data-project-more-label]').textContent = expanded ? '접기' : '더 보기';
      more.querySelector('[data-project-more-count]').textContent = expanded ? '' : `+${extraCount}`;
      if (announce) {
        status.hidden = false;
        const label = category ? `${category} 프로젝트` : title;
        status.textContent = `${label} ${matching.filter((card) => !card.hidden).length}개 표시 · 전체 ${matching.length}개`;
      }
    };

    if (filters && cards.length) {
      filters.hidden = false;
      filters.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-project-filter]');
        if (!button) return;
        category = button.hasAttribute('data-project-filter-all') ? null : button.dataset.projectFilter;
        expanded = false;
        filters.querySelectorAll('button').forEach((filter) => filter.setAttribute('aria-pressed', String(filter === button)));
        render(true);
      });
    }

    more.addEventListener('click', () => {
      const firstNew = cards.find((card) => card.hidden && matches(card));
      expanded = !expanded;
      render(true);
      if (expanded && firstNew) {
        firstNew.querySelector('a').focus({ preventScroll: true });
        firstNew.scrollIntoView({ block: 'nearest' });
      } else {
        more.scrollIntoView({ block: 'nearest' });
      }
    });
    render();
  });

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
