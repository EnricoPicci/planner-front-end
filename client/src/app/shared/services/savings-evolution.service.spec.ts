import { TestBed, inject } from '@angular/core/testing';

import { SavingsEvolutionService } from './savings-evolution.service';

const initialCapital = 5000;
const yearlySavings = 3000;
const planDuration = 30;
const expensesAtYear10 = 100000;
const expensesAtYear15_1 = 22000;
const expensesAtYear15_2 = 23000;
const expensesAtYear20 = 30000;
const expensesAtYear30 = 15000;
const houseValue = 400000;
const yearlyMortgageRate = 15000;
const mortgageDurationInYears = 20;

describe('SavingsEvolutionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SavingsEvolutionService]
    });
  });

  it('should be created', inject([SavingsEvolutionService], (service: SavingsEvolutionService) => {
    expect(service).toBeTruthy();
  }));

  it('calculates the evolution of expenses', inject([SavingsEvolutionService], (service: SavingsEvolutionService) => {
    const profile = createProfile();
    expect(service.calculateExpensesEvolution(profile)[10]).toBe(expensesAtYear10);
    expect(service.calculateExpensesEvolution(profile)[15]).toBe(expensesAtYear15_1 + expensesAtYear15_2);
    expect(service.calculateExpensesEvolution(profile)[20]).toBe(expensesAtYear20);
    expect(service.calculateExpensesEvolution(profile)[30]).toBe(expensesAtYear30);
  }));
  it('calculates the evolution of expenses with mortgage', inject([SavingsEvolutionService], (service: SavingsEvolutionService) => {
    const profile = createProfileWithMortgage();
    const houseValueNotCoveredByMortgage = houseValue - yearlyMortgageRate * mortgageDurationInYears;
    expect(service.calculateExpensesEvolution(profile)[4]).toBe(0);
    expect(service.calculateExpensesEvolution(profile)[5]).toBe(houseValueNotCoveredByMortgage + yearlyMortgageRate);
    expect(service.calculateExpensesEvolution(profile)[24]).toBe(yearlyMortgageRate);
    expect(service.calculateExpensesEvolution(profile)[25]).toBe(0);
  }));

  it('calculates the evolution of savings after 9 years', inject([SavingsEvolutionService], (service: SavingsEvolutionService) => {
    const profile = createProfile();
    const years = 9;
    const expectedSavings = initialCapital + years * yearlySavings;
    expect(service.calculateSavingsEvolution(profile)[0]).toBe(initialCapital);
    expect(service.calculateSavingsEvolution(profile)[years]).toBe(expectedSavings);
  }));
  it('calculates the evolution of savings after 10 years', inject([SavingsEvolutionService], (service: SavingsEvolutionService) => {
    const profile = createProfile();
    const years = 10;
    const expectedSavings = initialCapital + years * yearlySavings - expensesAtYear10;
    expect(service.calculateSavingsEvolution(profile)[years]).toBe(expectedSavings);
  }));
  it('calculates the evolution of savings after 16 years', inject([SavingsEvolutionService], (service: SavingsEvolutionService) => {
    const profile = createProfile();
    const years = 16;
    const expectedSavings = initialCapital + years * yearlySavings - expensesAtYear10 - expensesAtYear15_1 - expensesAtYear15_2;
    expect(service.calculateSavingsEvolution(profile)[years]).toBe(expectedSavings);
  }));
  it('calculates the evolution of savings after 20 years', inject([SavingsEvolutionService], (service: SavingsEvolutionService) => {
    const profile = createProfile();
    const years = 20;
    const expectedSavings = initialCapital + years * yearlySavings
                                                      - expensesAtYear10
                                                      - expensesAtYear15_1 - expensesAtYear15_2
                                                      - expensesAtYear20;
    expect(service.calculateSavingsEvolution(profile)[years]).toBe(expectedSavings);
  }));
  it('calculates the evolution of savings at end of plan', inject([SavingsEvolutionService], (service: SavingsEvolutionService) => {
    const profile = createProfile();
    const years = planDuration;
    const expectedSavings = initialCapital + years * yearlySavings
                                                      - expensesAtYear10
                                                      - expensesAtYear15_1 - expensesAtYear15_2
                                                      - expensesAtYear20
                                                      - expensesAtYear30;
    expect(service.calculateSavingsEvolution(profile)[years]).toBe(expectedSavings);
  }));

});

function createProfile() {
  const goals = [{name: 'Prima Casa', icon: '', type: null, age: 40, value: expensesAtYear10},
                  {name: 'Auto', icon: '', type: null, age: 45, value: expensesAtYear15_1},
                  {name: 'Vacanza', icon: '', type: null, age: 45, value: expensesAtYear15_2},
                  {name: 'Casa al mare', icon: '', type: null, age: 50, value: expensesAtYear20},
                  {name: 'Studio', icon: '', type: null, age: 60, value: expensesAtYear30}];

  const profile = {
    id: null,
    firstName: 'Enrico',
    lastName: 'Typescript',
    age: 30,
    status: null,
    initialCapital: initialCapital,
    yearlySavings: yearlySavings,
    planDuration: planDuration,
    goals: goals
  };
  return profile;
}

function createProfileWithMortgage() {
  const goals = [{
    'name': 'La mia prima casa',
    'icon': 'proprieta/immobili.png',
    'type': {
      'code': '1',
      'name': 'Immobili',
      'icon': 'proprieta/immobili.png',
      'value': 0  // this is not the value of the House, but just the default value of the GoalType with type 1, i.e. House
    },
    'age': 35,
    'value': houseValue,
    'debtYearlyRate': yearlyMortgageRate,
    'debtDuration': mortgageDurationInYears
  }];

  const profile = {
    id: null,
    firstName: 'Enrico',
    lastName: 'Typescript',
    age: 30,
    status: null,
    initialCapital: initialCapital,
    yearlySavings: yearlySavings,
    planDuration: planDuration,
    goals: goals
  };
  return profile;
}
