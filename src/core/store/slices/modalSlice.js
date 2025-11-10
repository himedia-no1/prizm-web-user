export const createModalSlice = (set) => ({
  modalType: null,
  modalProps: {},
  openModal: (type, props = {}) => set({ modalType: type, modalProps: props }),
  closeModal: () => set({ modalType: null, modalProps: {} }),
});

export default createModalSlice;
