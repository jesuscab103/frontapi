import { UseCase } from "@/kernel/contracts";
import { ConsultUnit } from "../adapters/dtos/UnitDtos";
import { ResponseApi } from "@/kernel/types";
import { Unit } from "../entities/Unit";
import { UnitRepository } from "./ports/unit.repository";


export class GetUnitsInteractor implements UseCase<ConsultUnit, ResponseApi<Unit>>{
    //Constructor de Repository

    constructor(private readonly unitRepository: UnitRepository) { }
    execute(payload: ConsultUnit): Promise<ResponseApi<Unit>> {
        //Pase de PArametros a Repository
        return this.unitRepository.getUnits(payload);
    }
}