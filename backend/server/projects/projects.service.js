import Projects from "db/projects";
import Service from "../utils/Service";

import ObjectDoesNotExistError from "../utils/exceptions/ObjectDoesNotExistError";

function nextAncestorIfRelated (projectsById, parentId, childIdToCheck) {
  if (projectsById[childIdToCheck].children.some(childId => childId === parentId)) {
    return childIdToCheck
  }
  return projectsById[childIdToCheck].children.reduce((acc, curr) => {
    if (acc) {
      return acc
    }
    if (curr) {
      return curr
    }
    return nextAncestorIfRelated(projectsById, parentId, curr)
  }, undefined)
}

export default class extends Service {
  getOne = (id) => {
    const project = Projects.findOne({ id });
    if (!project) throw new ObjectDoesNotExistError();

    return project;
  };

  getAll = () => {
    return Projects.findAll();
  };

  move = async (options) => {
    const { newParentId, oldParentId, childId } = options
    if (oldParentId) {
      const oldParent = { ...await this.getOne(oldParentId) }
      if (oldParent) {
        oldParent.children = oldParent.children.filter(i => i !== childId)
        await Projects.setChildren(oldParent)
      }
    }
    if (newParentId) {
      const projectsById = await this.getAll().reduce((accumulator, p) => ({ ...accumulator, [p.id]: p }), {})
      const newParent = projectsById[newParentId]
      newParent.children.push(childId)

      const newGrandParentId = nextAncestorIfRelated(projectsById, newParentId, childId)
      if (newGrandParentId) {
        const grandParent = projectsById[newGrandParentId]
        grandParent.children = grandParent.children.filter(i => i !== newParentId)
        await Projects.setChildren(grandParent)
      }
      await Projects.setChildren(newParent)
    }
    return {};
  };
}
