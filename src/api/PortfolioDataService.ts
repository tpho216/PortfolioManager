import { AxiosInstance} from "axios";
import { IProject } from "./interfaces/IProject";
import {ISkill} from "./interfaces/ISkill";

class PortfolioDataService {
  private readonly axios: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }
  public async createProject(project : IProject) {
    try {
      return this.axios.post<IProject>('/project', project);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async getProject(id: string) {
    try {
      return this.axios.get<IProject>(`/project/${id}`);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async fetchProjects() {
    try {
      return this.axios.get<IProject[]>('/project');
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async updateProject(project: IProject) {
    try {
      return this.axios.put(`/project/${project.id}`, project);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async deleteProject(project: IProject) {
    try {
      return this.axios.delete(`/project/${project.id}`);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }



  public async getSkills() {
    return this.axios.get<ISkill[]>('/skill');
  }

  public async updateSkill(skill: ISkill) {
    return this.axios.put(`/skill/${skill.id}`, skill);
  }

}

export default PortfolioDataService;
