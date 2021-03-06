import { Injectable } from '@angular/core';

import {ProfileInterface} from '../model/profile.interface';
import {GoalTypeCodes} from '../model/goal-type.interface';

@Injectable()
export class SavingsEvolutionService {

  constructor() { }

  calculateSavingsEvolution(profile: ProfileInterface) {
    const savingsEvolution = this.getEmptyArray(profile);
    const expensesEvolution = this.calculateExpensesEvolution(profile);
    savingsEvolution[0] = profile.initialCapital - expensesEvolution[0];
    for (let i = 1; i <= profile.planDuration; i++) {
      const previousYearSavings = savingsEvolution[i - 1];
      savingsEvolution[i] = previousYearSavings + profile.yearlySavings - expensesEvolution[i];
    }
    return savingsEvolution;
  }

  calculateExpensesEvolution(profile: ProfileInterface) {
    const expensesEvolution = this.getEmptyArray(profile);
    for (const goal of profile.goals) {
      const goalYear = goal.age - profile.age;
      if (goal.type && goal.type.code === GoalTypeCodes.Immobili && goal.debtYearlyRate > 0) {
        const endOfMortgage = goalYear + goal.debtDuration;
        const valueNotCoveredByMortgage = goal.value - goal.debtYearlyRate * goal.debtDuration;
        expensesEvolution[goalYear] = expensesEvolution[goalYear] + valueNotCoveredByMortgage;
        for (let i = goalYear; i < endOfMortgage; i++) {
          expensesEvolution[i] = expensesEvolution[i] + goal.debtYearlyRate;
        }
      } else if (goal.type && goal.type.code === GoalTypeCodes.Pip && goal.debtYearlyRate > 0) {
        for (let i = goalYear; i < profile.planDuration; i++) {
          console.log('expensesEvolution[i]', i, expensesEvolution[i], goal.debtYearlyRate, goal, profile);
          expensesEvolution[i] = expensesEvolution[i] + goal.debtYearlyRate;
        }
      } else if (goal.type && goal.type.code === GoalTypeCodes.Pac && goal.debtYearlyRate > 0) {
        const endOfPac = goalYear + goal.investmentDuration;
        for (let i = goalYear; i < endOfPac; i++) {
          expensesEvolution[i] = expensesEvolution[i] + goal.debtYearlyRate;
        }
      } else {
          expensesEvolution[goalYear] = expensesEvolution[goalYear] + goal.value;
      }
    }
    return expensesEvolution;
  }

  private getEmptyArray(profile: ProfileInterface) {
    return new Array(profile.planDuration + 1).fill(0);
  }

}
