'use strict';

// This interaction changes explanatory text only. It does not run AI agents.
const descriptions = {
  master: ['The coordinating layer', 'Master Agent', 'Coordinates the specialized capabilities, bringing the different supply chain perspectives into a shared structure.'],
  inventory: ['Specialized capability', 'Inventory', 'Focuses on inventory information and stock-related questions. The Master Agent places this perspective within the broader supply chain context.'],
  procurement: ['Specialized capability', 'Procurement', 'Covers purchasing needs and procurement-related workflows as part of the coordinated supply chain concept.'],
  suppliers: ['Specialized capability', 'Supplier management', 'Brings supplier information and relationship context into the coordinated view of the supply chain.'],
  logistics: ['Specialized capability', 'Logistics', 'Addresses logistics-related information and coordination within the wider supply chain structure.'],
  analysis: ['Specialized capability', 'Analysis', 'Examines operational information to help make the supply chain context easier to understand.'],
  reporting: ['Specialized capability', 'Executive reporting', 'Brings operational context into summaries for decision-makers, alongside the other specialized capabilities.']
};

const nodes = document.querySelectorAll('[data-agent]');
const detailFields = ['detail-kicker', 'detail-title', 'detail-description'].map(id => document.getElementById(id));
nodes.forEach(node => {
  node.addEventListener('click', () => {
    nodes.forEach(item => {
      const selected = item === node;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    descriptions[node.dataset.agent].forEach((text, index) => {
      detailFields[index].textContent = text;
    });
  });
});

// Content stays visible when JavaScript or IntersectionObserver is unavailable.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(section => {
    section.classList.add('ready');
    observer.observe(section);
  });
}
