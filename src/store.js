import { createStore, action, thunk } from 'easy-peasy';
import { debug } from 'easy-peasy';

const searchTableModel = {
  order: 'asc',
  orderBy: 'lastname',
  filterName: '',
  page: 0,
  rowCount: 0,
  rowsPerPage: 10,
  searchData: [],


  // Actions
  setOrder: action((state, order) => {
    state.order = order;
  }),

  setOrderBy: action((state, orderBy) => {
    state.orderBy = orderBy;
  }),

  setFilterName: action((state, filterName) => {
    state.filterName = filterName;
  }),

  setPage: action((state, page) => {
    state.page = page;
  }),

  setRowCount: action((state, rowCount) => {
    state.rowCount = rowCount;
  }),

  setRowsPerPage: action((state, rowsPerPage) => {
    state.rowsPerPage = rowsPerPage;
  }),

  setSearchData: action((state, payload) => {
    if (typeof (payload) === 'undefined' || payload === null) {
    }
    else {
      console.log("Inside Store::::::::::::setSearchData::::::" + debug(payload[0]?.licenseNumber));
    }
    state.searchData = payload;
  }),

  getSearchData: thunk(async (actions, token, { getState }) => {
    console.log("Inside Store::::::::::::getSearchData::::::" + debug(store.getState().searchData));
    //console.log("Inside Store::::::::::::getSearchData::::::" + debug(store.getState().searchTable.searchData));
    return getState().searchData;
  }),

}; //end searchTableModel
const licensesTableModel = { data: [], count: 1 };
// const licensesTableModel = {
//   data:
//     [
//       {
//         licenseNumber: "012345",
//         state: "AL",
//         licenseType: "Adjuster License",
//         status: "Pending"
//       },
//       {
//         licenseNumber: "011111",
//         state: "TX",
//         licenseType: "Emergency License",
//         status: "Active"
//       },
//     ]
// }; //end licensesTableModel

const certificationsTableModel = {
  data:
    [
      { certificationName: "" },
      { dateCompleted: "" },
      { dateeExpired: "" }
    ]
}; //end certificationsTableModel

const deploymentsTableModel = {
  data:
    [
      { certificationName: "" },
      { dateCompleted: "" },
      { dateeExpired: "" }
    ]
}; //end deploymentsTableModel

const rirsActionsTableModel = {
}; //end rirsActionsTableModel

const notesTableModel = {
  name: "",
  pilotId: "",
  noteCategory: "",
  state: "",
  note: "",
  createdBy: "",
  createdAt: ""
}; //end notesTableModel


const peopleModel = {
  //   firstName: 'Jessie',
  //   lastName: "Fung",
  //   pilotId: 90239,
  //   email: "wjcfung@hotmail.com",
  //   phoneNumber: "251-999-9999",
  //   address: "1051 Hillcrest road, Mobile, AL 36695",
  //   npnId: '123456',
  //   ceCredit: "1/2",
  //   status: "Active",
  //   availiability: "Deployed",
  //   ActivePendingLicenses: 0,
  //   checkFlag: "",
  //   viewSSN: false,
  //   SSN: "",
  //   licenses: licensesTableModel,
  //   certifications: certificationsTableModel,
  //   deployments: searchTableModel,
  //   rirsActions: rirsActionsTableModel,
  //   notes: notesTableModel,
  //   setPeople: action((state, payload) => {
  //     state.peopleModel = payload;
  //     // console.log("Inside Store::::::::::::after set people::::::" + debug(state.peopleModel.firstName));
  //   }),
  //   getPeople: thunk(async (actions, token, { getState }) => {
  //      console.log("Inside Store::::::::::::after get people::::::" + debug(getState().peopleModel.firstName));
  //     return getState().peopleModel;
  //   }),
  firstName: "",
  lastName: "",
  pilotId: 0,
  email: "",
  phoneNumber: "",
  address: "",
  npnId: 0,
  ceCredit: "",
  status: "",
  availiability: "",
  ActivePendingLicenses: 0,
  checkFlag: "",
  viewSSN: false,
  SSN: "",
  licenses: licensesTableModel,
  certifications: certificationsTableModel,
  deployments: searchTableModel,
  rirsActions: rirsActionsTableModel,
  notes: notesTableModel,
  setPeople: action((state, payload) => {
    state.peopleModel = payload;
    //console.log("Inside Store::::::::::::after set people::::::" + debug(state.peopleModel.firstName));
  }),
  getPeople: thunk(async (actions, token, { getState }) => {
    // if (getState().peopleModel === 'undefined')
    // return null;
    // else    //console.log("Inside Store::::::::::::after get people::::::" + debug(getState().peopleModel.firstName));
    return getState().peopleModel;
  }),
  //data.licenses.data.$values[0].licenseNumber

}; //end peopleModel

const store = createStore({
  searchTable: searchTableModel,
  people: peopleModel,
});

export default store;
