import {GoalInterface} from './goal.interface';
import {StatusInterface} from './status.interface';

export interface AvatarInterface {
    name: string;
    age: string;
    status: StatusInterface;
    image: string;
    goals: Array<GoalInterface>;
    planDuration: number;
    yearlySavings: number;
}
