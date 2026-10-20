---
title: 이재민 · Portfolio
permalink: /about/
layout: page
body_class: profile-page-body
description: 비즈니스의 맥락을 이해하고 기술을 실제로 쓰이는 제품으로 연결하는 개발자 이재민의 포트폴리오. 프로젝트, 경력, 자격증과 수상을 소개합니다.
comments: false
---

{% assign portfolio = site.data.portfolio %}
{% assign projects = site.projects | concat: site.apps | where_exp: 'project', 'project.published != false' | sort: 'order' %}
{% assign company_projects = projects | where: 'group', 'company' %}
{% assign personal_projects = projects | where_exp: 'project', 'project.group != "company"' %}
{% assign personal_details = personal_projects | where_exp: 'project', 'project.listing_only != true' %}
{% assign personal_primary = personal_details | where_exp: 'project', 'project.more != true' %}
{% assign personal_more = personal_details | where: 'more', true %}
{% assign personal_extra = personal_projects | where: 'listing_only', true %}
{% assign personal_cards = personal_primary | concat: personal_more | concat: personal_extra %}

<div class="profile-page">
  <header class="profile-hero" aria-labelledby="profile-title">
    <div class="profile-hero__identity">
      <p class="profile-eyebrow">{{ portfolio.role }} · Portfolio</p>
      <h1 id="profile-title">{{ portfolio.name }} <span>LeeJam.</span></h1>
    </div>
    <figure class="profile-hero__portrait">
      <img src="{{ site.author.avatar | relative_url }}" alt="개발자 이재민" width="1015" height="1015" fetchpriority="high" />
    </figure>
    <div class="profile-hero__content">
      <p class="profile-hero__headline">문제를 이해하고,<br />쓰이는 결과를 만듭니다.</p>
      <p class="profile-hero__intro">{{ portfolio.intro }}</p>
      <div class="profile-actions" aria-label="프로필 링크">
        <a href="mailto:{{ site.author.email }}">이메일 <span aria-hidden="true">↗</span></a>
        <a href="https://github.com/{{ site.author.github }}" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a>
        <a href="{{ portfolio.linkedin }}" target="_blank" rel="noopener">LinkedIn <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </header>

  <nav class="profile-nav" aria-label="포트폴리오 목차">
    <a href="#company-projects">회사 프로젝트 <span>{{ company_projects.size }}</span></a>
    <a href="#personal-projects">개인 프로젝트 <span>{{ personal_projects.size }}</span></a>
    <a href="#experience">경력</a>
    <a href="#skills">기술</a>
    <a href="#credentials">자격·수상</a>
    <a href="#education">학력·교육</a>
  </nav>

  <section class="profile-section profile-section--projects" id="projects" aria-labelledby="projects-title">
    <p class="profile-section__label">01 / Projects</p>
    <div class="profile-section__body">
      <div class="profile-section__heading">
        <h2 id="projects-title">만들고, 개선한 것들</h2>
        <span class="profile-count">{{ projects.size }} projects</span>
      </div>
      <p class="profile-section__lead">업무의 문제를 해결한 경험부터 직접 출시한 제품까지.</p>
      <section class="profile-project-group" id="company-projects" aria-labelledby="company-projects-title" data-project-group>
        <div class="profile-project-group__heading"><h3 id="company-projects-title">회사 프로젝트</h3><span class="profile-count">{{ company_projects.size }} projects</span></div>
        <p class="profile-project-group__intro">업무의 목적과 맡은 과제, 이를 풀기 위한 선택과 성과를 정리했습니다.</p>
        {% include portfolio-project-list.html projects=company_projects limit=6 list_id='company-project-list' %}
      </section>
      <section class="profile-project-group" id="personal-projects" aria-labelledby="personal-projects-title" data-project-group>
        <div class="profile-project-group__heading"><h3 id="personal-projects-title">개인 프로젝트</h3><span class="profile-count">{{ personal_projects.size }} projects</span></div>
        <p class="profile-project-group__intro">직접 겪은 불편과 가까운 사람들의 필요를 앱으로 풀어갑니다. 개인 앱은 기획·디자인·개발·출시·운영까지 1인 개발로 진행했습니다. 기여도 100%.</p>
        <div class="profile-store-links" data-project-category="앱">
          <a href="https://apps.apple.com/kr/developer/jaemin-lee/id1799551230" target="_blank" rel="noopener">
            <img class="profile-store-links__icon" src="{{ '/assets/img/stores/app-store.png' | relative_url }}" alt="" width="32" height="32" decoding="async" />
            <span class="profile-store-links__label">App Store <span class="profile-store-links__caption">전체 보기</span></span>
            <span class="profile-store-links__arrow" aria-hidden="true">↗</span>
          </a>
          <a href="https://play.google.com/store/apps/collection/cluster?gsr=SlJqGDFjMDBLMU5GR3R4bS8wbGdKLysycFE9PbICMgoVChFpby5sZWVqYW0uRmx1eGlsZRAHEhcIAhITNTUyOTI1NTg2NzgzNzMxNTgxMRgAsBIA:S:ANO1ljLdG_s" target="_blank" rel="noopener">
            <img class="profile-store-links__icon" src="{{ '/assets/img/stores/google-play.svg' | relative_url }}" alt="" width="32" height="32" decoding="async" />
            <span class="profile-store-links__label">Google Play <span class="profile-store-links__caption">전체 보기</span></span>
            <span class="profile-store-links__arrow" aria-hidden="true">↗</span>
          </a>
        </div>
        <div class="profile-filters" role="group" aria-label="개인 프로젝트 분류" hidden>
          <button type="button" data-project-filter="all" data-project-filter-all aria-pressed="true">전체</button>
          {% assign categories = personal_projects | map: 'category' | compact | uniq %}
          {% for category in categories %}
          <button type="button" data-project-filter="{{ category | escape }}" aria-pressed="false">{{ category | escape }}</button>
          {% endfor %}
        </div>
        {% include portfolio-project-list.html projects=personal_cards list_id='personal-project-list' %}
      </section>
    </div>
  </section>

  <section class="profile-section" id="experience" aria-labelledby="experience-title">
    <p class="profile-section__label">02 / Experience</p>
    <div class="profile-section__body">
      <h2 id="experience-title">제품과 함께 쌓은 경험</h2>
      <div class="profile-timeline">
        {% for job in portfolio.experience %}
        <article class="profile-record">
          <p class="profile-record__date">{{ job.period }}</p>
          <div><h3>{{ job.company }}</h3><p class="profile-record__subtitle">{{ job.role }}</p><p>{{ job.description }}</p></div>
        </article>
        {% endfor %}
      </div>
    </div>
  </section>

  <section class="profile-section" id="skills" aria-labelledby="skills-title">
    <p class="profile-section__label">03 / Toolkit</p>
    <div class="profile-section__body">
      <h2 id="skills-title">문제에 맞는 도구를 선택합니다.</h2>
      <dl class="profile-skills">
        {% for skill in portfolio.skills %}<div><dt>{{ skill.area }}</dt><dd>{{ skill.items }}</dd></div>{% endfor %}
      </dl>
    </div>
  </section>

  <section class="profile-section" id="credentials" aria-labelledby="credentials-title">
    <p class="profile-section__label">04 / Credentials</p>
    <div class="profile-section__body">
      <h2 id="credentials-title">자격과 수상</h2>
      <h3 class="profile-subheading">자격증</h3>
      <ul class="profile-credentials">
        {% for certificate in portfolio.certifications %}
        <li><div><h4>{{ certificate.name }}</h4><p>{{ certificate.issuer }}</p></div><span>{{ certificate.date }}</span></li>
        {% endfor %}
      </ul>
      <h3 class="profile-subheading">수상</h3>
      <ul class="profile-credentials">
        {% for award in portfolio.awards %}
        <li><div><h4>{% if award.url %}<a href="{{ award.url | relative_url }}">{{ award.name }} <span aria-hidden="true">↗</span></a>{% else %}{{ award.name }}{% endif %}</h4><p>{{ award.organizer }}</p><p class="profile-credentials__description">{{ award.description }}</p></div><span>{{ award.date }}</span></li>
        {% endfor %}
      </ul>
    </div>
  </section>

  <section class="profile-section" id="education" aria-labelledby="education-title">
    <p class="profile-section__label">05 / Learning</p>
    <div class="profile-section__body">
      <h2 id="education-title">학력과 교육</h2>
      <div class="profile-timeline">
        {% for education in portfolio.education %}
        <article class="profile-record"><p class="profile-record__date">{{ education.period }}</p><div><h3>{{ education.name }}</h3><p>{{ education.detail }}</p></div></article>
        {% endfor %}
      </div>
    </div>
  </section>

  <section class="profile-closing" id="contact" aria-labelledby="contact-title">
    <p class="profile-eyebrow">Let's connect</p>
    <h2 id="contact-title">함께 풀어야 할 문제가 있다면,<br />그 맥락부터 듣고 싶습니다.</h2>
    <p>
      새로운 기능을 만드는 일부터, 느려진 서비스를 개선하고 반복되는 업무를 줄이는 일까지.
      비즈니스의 맥락과 사용자의 불편을 먼저 이해한 뒤,
      팀이 선택할 수 있는 현실적인 해법을 찾고 구현합니다.
    </p>
    <p>
      프론트엔드와 백엔드, 데이터와 운영을 오가며 쌓은 경험을 바탕으로
      제품의 완성도와 팀의 실행력을 함께 높이고 싶습니다.
    </p>
    <div class="profile-actions"><a href="mailto:{{ site.author.email }}">{{ site.author.email }} <span aria-hidden="true">↗</span></a><a href="{{ '/archive/' | relative_url }}">개발 기록 보기 <span aria-hidden="true">→</span></a></div>
  </section>
</div>

<dialog class="profile-modal" id="project-modal" aria-labelledby="project-modal-title">
  <div class="profile-modal__toolbar">
    <span>프로젝트 상세</span>
    <button type="button" class="profile-modal__close" data-project-close aria-label="프로젝트 상세 닫기" autofocus><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" focusable="false"><path d="m6 6 12 12M6 18 18 6" /></svg></button>
  </div>
  <div class="profile-modal__scroll"><div class="profile-modal__content"></div></div>
</dialog>
{% for project in projects %}
{% unless project.listing_only %}
<template id="project-detail-{{ project.slug }}">
  {% assign detail_content = project.content | markdownify %}
  {% include portfolio-project-detail.html project=project content=detail_content modal=true id='project-modal' %}
</template>
{% endunless %}
{% endfor %}
<script src="{{ '/assets/js/portfolio.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
