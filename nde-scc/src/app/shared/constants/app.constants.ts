export const VIEW_CONSTANTS = {
  libraryAcronym:<string> 'scc',
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
  almaDHelp: 'https://answers.library.losrios.edu/scc/faq/382385',
  collectionsShowingAvailability: ['8191432850005325', '8188683380005325']
} as const;
