export interface GoalTypeInterface {
    code: string;
    name: string;
    icon: string;
    value: number;
}

// GoalTypeCodes stores the values of the 'code' property of each goal type as a dictionary
export const GoalTypeCodes = {
    Immobili: '1',
    Motori: '2',
    Viaggi: '3',
    Anniversari: '4',
    Collezioni: '5',
    Pip: 'pip',
    Pac: 'pac',
    Protezione: 'life-ins'
};
