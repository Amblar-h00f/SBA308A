export function createProteinCard (protein) {

    let badgeClass = 'badge-danger';
    if (protein.accuracy >  0.7) {
        badgeClass = 'badge-success';
      } else if (protein.accuracy > 0.4) {
        badgeClass = 'badge-warning';
      }
   const card = document.createElement('div');
   card.className = 'protein-card';
   card.dataset.id = protein.id;

   card.innerHTML = `
   <div class="protein-card-header">
   <div class="protein-card-title">
<div class="protein-card-name">${protein.name}</div>
<div class="protein-card-badge ${badgeClass}"${(protein.accuracy * 100).toFixed(1)}% Accuracy</div></div>
<div class="protein-card-id">ID: ${protein.id.substring(0,8)} </div>
</div>
<div class=

<div class="protein-card-id">ID: ${protein.id.substring(0, 8)}...</div>
    </div>
    <div class="protein-card-content">
      <p class="protein-card-info"><span>Method:</span> ${protein.method}</p>
      <p class="protein-card-info"><span>Residues:</span> ${protein.residues}</p>
      <p class="protein-card-info"><span>Published:</span> ${new Date(protein.publishedDate).toLocaleDateString()}</p>
    </div>
    <div class="protein-card-footer">
      <button class="button button-outline button-small view-protein" data-id="${protein.id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        View
      </button>
      <button class="button button-outline button-small edit-protein" data-id="${protein.id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        Edit
      </button>
      <button class="button button-outline button-small delete-protein" data-id="${protein.id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        Delete
      </button>
    </div>
  `;

  return card;
}

// Render protein list
export function renderProteinList(proteins, container) {
  container.innerHTML = '';

  if (proteins.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.textContent = 'No protein data found. Try a different search or add new data.';
    container.appendChild(emptyState);
    return;
  }

  proteins.forEach(protein => {
    const card = createProteinCard(protein);
    container.appendChild(card);
  });
}

// Update pagination UI
export function updatePagination(currentPage, totalPages) {
  const pageInfo = document.getElementById('page-info');
  const prevButton = document.getElementById('prev-page');
  const nextButton = document.getElementById('next-page');

  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  prevButton.disabled = currentPage <= 1;
  nextButton.disabled = currentPage >= totalPages;
}

// Show loading state
export function showLoading() {
  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('protein-list').classList.add('hidden');
}

// Hide loading state
export function hideLoading() {
  document.getElementById('loading').classList.add('hidden');
  document.getElementById('protein-list').classList.remove('hidden');
}

// Populate view modal with protein details
export function populateViewModal(protein) {
  const modalBody = document.getElementById('view-modal-body');
  
  modalBody.innerHTML = `
    <div class="protein-details">
      <div class="protein-detail-item">
        <h3>Name</h3>
        <p>${protein.name}</p>
      </div>
      <div class="protein-detail-item">
        <h3>ID</h3>
        <p>${protein.id}</p>
      </div>
      <div class="protein-detail-item">
        <h3>Method</h3>
        <p>${protein.method}</p>
      </div>
      <div class="protein-detail-item">
        <h3>Residues</h3>
        <p>${protein.residues}</p>
      </div>
      <div class="protein-detail-item">
        <h3>Accuracy</h3>
        <p>${(protein.accuracy * 100).toFixed(2)}%</p>
      </div>
      <div class="protein-detail-item">
        <h3>Published Date</h3>
        <p>${new Date(protein.publishedDate).toLocaleDateString()}</p>
      </div>
      
      <div class="protein-description">
        <h3>Description</h3>
        <p>${protein.description || 'No description available.'}</p>
      </div>
      
      <div class="protein-metrics">
        <h3>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
          Performance Metrics
        </h3>
        <div class="metrics-container">
          <div class="metric-item">
            <div class="metric-header">
              <span>GDT_TS Score</span>
              <span>${protein.metrics?.gdtTs || 'N/A'}</span>
            </div>
            <div class="metric-bar">
              <div class="metric-progress metric-progress-green" style="width: ${(protein.metrics?.gdtTs || 0) * 100}%"></div>
            </div>
          </div>
          <div class="metric-item">
            <div class="metric-header">
              <span>RMSD</span>
              <span>${protein.metrics?.rmsd || 'N/A'} Å</span>
            </div>
            <div class="metric-bar">
              <div class="metric-progress metric-progress-blue" style="width: ${Math.max(0, 100 - (protein.metrics?.rmsd || 0) * 20)}%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Populate edit form with protein data
export function populateEditForm(protein) {
  document.getElementById('edit-id').value = protein.id;
  document.getElementById('edit-name').value = protein.name;
  document.getElementById('edit-method').value = protein.method;
  document.getElementById('edit-residues').value = protein.residues;
  document.getElementById('edit-accuracy').value = protein.accuracy;
  document.getElementById('edit-publishedDate').value = protein.publishedDate.split('T')[0];
  document.getElementById('edit-description').value = protein.description || '';
  document.getElementById('edit-gdtTs').value = protein.metrics?.gdtTs || 0;
  document.getElementById('edit-rmsd').value = protein.metrics?.rmsd || 0;
}

// Show modal
export function showModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Hide modal
export function hideModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
  document.body.style.overflow = ''; // Restore scrolling
}

// Reset form
export function resetForm(formId) {
  document.getElementById(formId).reset();
}

// Show error message
export function showError(message) {
  alert(message); 
}