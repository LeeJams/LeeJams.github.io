(() => {
  const group = document.querySelector('#personal-projects');
  const filters = group.querySelector('.profile-filters');
  const projects = [...group.querySelectorAll('.profile-project')];
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
      projects.forEach((project) => {
        project.hidden = !showAll && project.dataset.projectCategory !== category;
      });
      status.hidden = false;
      status.textContent = `${button.textContent} 프로젝트 ${projects.filter((project) => !project.hidden).length}개`;
    });
  }
})();
