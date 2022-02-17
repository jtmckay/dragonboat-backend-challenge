// This model mocks a real database model for the sake com simplicity
const projectList = [
  {
    id: 1,
    title: "Project 1",
    score: 50,
    children: [
      3, 4
    ]
  },
  {
    id: 2,
    title: "Project 2",
    score: 20,
    children: [
      5
    ]
  },
  {
    id: 3,
    title: "Project 3",
    score: 100,
    children: [
      6, 7
    ]
  },
  {
    id: 4,
    title: "Project 4",
    score: 10,
    children: [],
  },
  {
    id: 5,
    title: "Project 5",
    score: 100,
    children: [],
  },
  {
    id: 6,
    title: "Project 6",
    score: 0,
    children: [],
  },
  {
    id: 7,
    title: "Project 7",
    score: 100,
    children: [],
  },
];

export default class {
  // receives conditions like { title: 'Project 5' } and returns a list of matches
  static findAll = (conditions = {}) => {
    return projectList
      .filter((obj) =>
        Object.entries(conditions).reduce((curr, [key, condition]) => {
          if (!curr) return false;
          return obj[key] === condition;
        }, true)
      )
      .sort((a, b) => (a.id > b.id ? 1 : -1));
  };

  // receives conditions like { title: 'Project 5' } and returns the first match
  static findOne = (conditions = {}) => {
    return projectList.find((obj) =>
      Object.entries(conditions).reduce((curr, [key, condition]) => {
        if (!curr) return false;
        return obj[key] === condition;
      }, true)
    );
  };

  // You can add more methods to this mock to extend its functionality or
  // rewrite it to use any kind of database system (eg. mongo, postgres, etc.)
  // it is not part of the evaluation process

  static setChildren = (project = {}) => {
    const existingRecord = projectList.find(i => i.id === project.id)
    existingRecord.children = project.children
  }
}
