import {GoalInterface} from './goal.interface';

export interface AvatarInterface {
    name: string;
    age: string;
    status: string
    image: string;
    goals: Array<GoalInterface>;
}