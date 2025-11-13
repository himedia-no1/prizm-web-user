/**
 * Learning Data Store (ERD: ai_rags)
 * progress_code: UPLOADED, PROCESSING, COMPLETED, FAILED
 */
const learningDataStore = [
  {
    id: 1,
    workspace_id: 'ws1',
    channel_id: 'c1',
    original_file_name: 'product_requirements.pdf',
    stored_file_name: '2025-10-28-rag-1-product_requirements.pdf',
    extension: 'pdf',
    file_size: 2457600,
    upload_user_id: 'u1',
    uploaded_at: '2025-10-28T09:00:00Z',
    cloud_storage_url: 'https://storage.example.com/rags/2025-10-28-rag-1-product_requirements.pdf',
    progress_code: 'COMPLETED',
    approved: true,
    created_at: '2025-10-28T09:00:00Z',
    updated_at: '2025-10-28T09:15:00Z',
  },
  {
    id: 2,
    workspace_id: 'ws1',
    channel_id: null, // Workspace-wide learning data
    original_file_name: 'company_handbook.docx',
    stored_file_name: '2025-10-29-rag-2-company_handbook.docx',
    extension: 'docx',
    file_size: 1048576,
    upload_user_id: 'u5',
    uploaded_at: '2025-10-29T10:00:00Z',
    cloud_storage_url: 'https://storage.example.com/rags/2025-10-29-rag-2-company_handbook.docx',
    progress_code: 'PROCESSING',
    approved: false,
    created_at: '2025-10-29T10:00:00Z',
    updated_at: '2025-10-29T10:05:00Z',
  },
  {
    id: 3,
    workspace_id: 'ws1',
    channel_id: 'c4',
    original_file_name: 'api_documentation.md',
    stored_file_name: '2025-10-30-rag-3-api_documentation.md',
    extension: 'md',
    file_size: 524288,
    upload_user_id: 'u2',
    uploaded_at: '2025-10-30T11:00:00Z',
    cloud_storage_url: 'https://storage.example.com/rags/2025-10-30-rag-3-api_documentation.md',
    progress_code: 'COMPLETED',
    approved: true,
    created_at: '2025-10-30T11:00:00Z',
    updated_at: '2025-10-30T11:20:00Z',
  },
];

export const listLearningData = () => learningDataStore;

export const updateLearningDataApproval = (id, approved) => {
  const target = learningDataStore.find((item) => String(item.id) === String(id));
  if (!target) {
    return null;
  }
  if (typeof approved === 'boolean') {
    target.approved = approved;
  } else {
    target.approved = !target.approved;
  }
  target.updated_at = new Date().toISOString();
  return target;
};

export const removeLearningData = (id) => {
  const index = learningDataStore.findIndex((item) => String(item.id) === String(id));
  if (index < 0) {
    return false;
  }
  learningDataStore.splice(index, 1);
  return true;
};

export const markLearningDataForReview = (id) => {
  const target = learningDataStore.find((item) => String(item.id) === String(id));
  if (!target) {
    return null;
  }
  target.reviewRequestedAt = new Date().toISOString();
  target.reviewStatus = 'pending';
  return target;
};
