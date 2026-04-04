import { IHabitsRepository } from "../repositories/habits.repository";

export class HabitsService {
  constructor(private repo: IHabitsRepository) {}

  async createHabit(data: any) {
    return this.repo.create(data);
  }

  async listHabits() {
    return this.repo.findAll();
  }

  async updateHabit(id: string, data: any) {
    return this.repo.update(id, data);
  }

  async deleteHabit(id: string) {
    return this.repo.delete(id);
  }

  async logHabit(habitId: string, data: any) {
    return this.repo.createLog(habitId, data);
  }
}
