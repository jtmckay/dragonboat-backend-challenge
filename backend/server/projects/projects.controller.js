import ProjectsService from "./projects.service";

export default class {
  getOne = (id) => {
    const service = new ProjectsService();

    return service.getOne(id);
  };

  get = () => {
    const service = new ProjectsService();

    return service.getAll();
  };

  move = (options) => {
    const service = new ProjectsService();
    return service.move(options);
  };
}
