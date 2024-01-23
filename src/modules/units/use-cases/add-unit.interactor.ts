import { UseCase } from "@/kernel/contracts";
import { Unit } from "../entities/Unit";
import { ResponseApi } from "@/kernel/types";
import { UnitRepository } from "./ports/unit.repository";


export class AddUnitInteractor implements UseCase<Unit, ResponseApi<Unit>>{
    //Constructor de Repository
    constructor(private readonly unitRepository:UnitRepository){}
    execute(payload: Unit): Promise<ResponseApi<Unit>> {
        //Pase de Parametros a Repository
        return this.unitRepository.addUnit(payload);
    }
}