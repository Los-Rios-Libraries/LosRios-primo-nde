export const VIEW_CONSTANTS = {
  libraryAcronym:<string> 'arc',
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
  almaDHelp: 'https://answers.library.losrios.edu/arc/faq/372430'
} as const;
