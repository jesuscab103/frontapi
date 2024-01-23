import { ConsultUnit } from "../../adapters/dtos/UnitDtos";
import { Unit } from "../../entities/Unit";
import { ResponseApi } from "@/kernel/types";

export interface UnitRepository {
    //Estructura de Funciones
    addUnit(unit:Unit): Promise<ResponseApi<Unit>>;
    getUnits(unit:ConsultUnit):Promise<ResponseApi<Unit>>;
}