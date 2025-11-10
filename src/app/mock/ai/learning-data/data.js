const learningDataStore = [
  { id: 1, source: 'document.pdf', author: 'User 1', createdAt: '2025-10-28', approved: true },
  { id: 2, source: 'chat_channel_general', author: 'User 2', createdAt: '2025-10-29', approved: false },
  { id: 3, source: 'note_20251030', author: 'User 3', createdAt: '2025-10-30', approved: true },
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
  target.updatedAt = new Date().toISOString();
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
