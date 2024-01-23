import { Entity } from '@/kernel/types';

//Estructura de Unidad
export type Unit = Entity<number> & {
    idgps?: number;
    brand?: string;
    model?: string;
    plate?: string;
    serie?: string;
    year?: string;
    color?: string;
    line?: string;
    unit_name?: string;
    group_name?: string;
};