/** @format */

export const mockPerson = {
  pilotId: 123456,
  firstName: "Bruce",
  lastName: "Wayne",
  email: "mail@mail.com",
  phone: "555-555-5555",
  address: "1234 Wayne Manor",
  ssn: "123-45-6789",
  npnId: 123456,
  viewSSN: true,
  status: "Active",
  ceCredits: "1/2",
  availability: "Deployed",
  activePendingLicenses: 5,
  licenses: {
    data: {
      $values: [
        {
          id: 1,
          licenseNumber: "7423949",
          state: "FL",
          licenseType: "Adjuster License",
          status: "Pending",
        },
        {
          id: 2,
          licenseNumber: "7423949",
          state: "TX",
          licenseType: "Adjuster License",
          status: "Active",
        },
        {
          id: 3,
          licenseNumber: "7423949",
          state: "TX",
          licenseType: "Adjuster License",
          status: "Pending",
        },
        {
          id: 4,
          licenseNumber: "7423949",
          state: "TX",
          licenseType: "Adjuster License",
          status: "Pending",
        },
        {
          id: 5,
          licenseNumber: "7423949",
          state: "TX",
          licenseType: "Adjuster License",
          status: "Pending",
        },
        {
          id: 6,
          licenseNumber: "7423949",
          state: "TX",
          licenseType: "Adjuster License",
          status: "Pending",
        },
      ],
    },
  },
  certifications: {
    data: {
      $values: [
        {
          id: 1,
          certificationName: "Certification 1",
          dateCompleted: "2021-10-01",
          dateExpired: "2022-10-01",
        },
        {
          id: 2,
          certificationName: "Certification 2",
          dateCompleted: "2021-10-01",
          dateExpired: "2022-10-01",
        },
        {
          id: 3,
          certificationName: "Certification 3",
          dateCompleted: "2021-10-01",
          dateExpired: "2022-10-01",
        },
      ],
    },
  },
  deployments: {
    data: {
      $values: [
        {
          id: 1,
          deploymentId: "123",
          deploymentState: "TX",
          dateArrived: "2022-10-01",
          dateReleased: "2022-10-01",
          compliant: "Abc",
        },
        {
          id: 2,
          deploymentId: "123",
          deploymentState: "TX",
          dateArrived: "2022-10-01",
          dateReleased: "2022-10-01",
          compliant: "Abc",
        },
        {
          id: 3,
          deploymentId: "123",
          deploymentState: "TX",
          dateArrived: "2022-10-01",
          dateReleased: "2022-10-01",
          compliant: "Abc",
        },
      ],
    },
  },
  rirActions: {
    data: {
      $values: [
        {
          id: 1,
          state: "FL",
          reason: "Abc",
          penalty: "No",
          actionDate: "2022-10-01",
          effectiveDate: "2022-10-01",
        },
        {
          id: 2,
          state: "FL",
          reason: "Abc",
          penalty: "No",
          actionDate: "2022-10-01",
          effectiveDate: "2022-10-01",
        },
        {
          id: 3,
          state: "FL",
          reason: "Abc",
          penalty: "No",
          actionDate: "2022-10-01",
          effectiveDate: "2022-10-01",
        },
      ],
    },
  },
  personeNotes: {
    data: {
      $values: [
        {
          id: 1,
          state: "FL",
          category: "Abc",
          content: "Abc",
          createdDate: "2022-10-01",
          updateDate: "2022-10-01",
        },
        {
          id: 2,
          state: "FL",
          category: "Abc",
          content: "Abc",
          createdDate: "2022-10-01",
          updateDate: "2022-10-01",
        },
        {
          id: 3,
          state: "FL",
          category: "Abc",
          content: "Abc",
          createdDate: "2022-10-01",
          updateDate: "2022-10-01",
        },
      ],
    },
  },
};
