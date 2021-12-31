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

  public async createSkill(skill : ISkill) {
    try {
      return this.axios.post<ISkill>('/skill', skill);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async fetchSkills() {
    try {
      return this.axios.get<ISkill[]>('/skill');
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async updateSkill(skill : ISkill) {
    try {
      return this.axios.put<ISkill>(`skill/${skill.id}`, skill);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async deleteSkill(skill : ISkill) {
    try {
      return this.axios.delete(`/skill/${skill.id}`);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

}

export default PortfolioDataService;
