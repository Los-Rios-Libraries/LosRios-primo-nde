export const VIEW_CONSTANTS = {
  libraryAcronym:<string> 'flc',
  libraries: [
    {
      name: 'American River',
      abbr: 'arc',
      path: 'student-resources/library',
      phone: '484-8455',
    },

    {
      name: 'Cosumnes River',
      abbr: 'crc',
      path: 'student-resources/library',
      phone: '691-7266',
    },

    {
      name: 'Folsom Lake',
      abbr: 'flc',
      path: 'student-resources/library',
      phone: '608-6613',
    },

    {
      name: 'Sacramento City',
      abbr: 'scc',
      path: 'library',
      phone: '558-2301',
    },
  ],
  almaDFaq:<string> 'https://answers.library.losrios.edu/flc/search/?t=0&adv=1&topics=Digital%20Books',
  limitedDeliveryFaq:<string> '407119',
  subjectInfoFaqId:<string> '414406',
  collectionRoot:<string> '8189463160005325'
} as const;
