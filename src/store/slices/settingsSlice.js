export const createSettingsSlice = (set) => ({
  settings: {
    notificationsEnabled: true,
    photoProofEnabled: true,
    comebackMode: false,
  },

  toggleNotifications: () =>
    set(state => ({
      settings: { ...state.settings, notificationsEnabled: !state.settings.notificationsEnabled },
    })),

  togglePhotoProof: () =>
    set(state => ({
      settings: { ...state.settings, photoProofEnabled: !state.settings.photoProofEnabled },
    })),

  setComebackMode: (val) =>
    set(state => ({
      settings: { ...state.settings, comebackMode: val },
    })),
})
