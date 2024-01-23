import { ResponseApi } from "@/kernel/types";
import { Unit } from "../entities/Unit";
import { UnitRepository } from "../use-cases/ports/unit.repository";
import axios, { AxiosResponse } from 'axios';
import { ConsultUnit } from "./dtos/UnitDtos";


export class UnitStorageGateway implements UnitRepository {
    
    //Función de Consulta Unidades
    async getUnits(unit: ConsultUnit): Promise<ResponseApi<Unit>> {
       
        try {
            //Envios de Petición a Back
            const url = `http://localhost:3100/units/get-all-unit/${unit.startdate}/${unit.enddate}`;
            const response: AxiosResponse<{ total: number, entities: Array<any> }> = await axios.post(url);
            //Asignar Datos de respuesta
            return {
                status: response.status,
                entities: response.data.entities,
                total: response.data.total,
                result : true
            };
        } catch (error) {
            // Manejo de Errores
            console.error("Error al realizar la solicitud:", error);
            return {
                status: 500,
                result: false,
            };
        }
    }

    //Función de Registro
    async addUnit(unit: Unit): Promise<ResponseApi<Unit>> {
        //Estructura de Datos para Petición
        const url = "http://localhost:3100/units/add-unit";
        const headers = {
            "Tcv-Client-Id": "N2U5YzQyNzgzMTA4ODFhN2U4YTZjZmNkMzU1Yjg3ZjljNWUxYzNlMDRjYjNlODc0MjRiM2Q2YzRkYjkxMTEzNGEyYjcxMjU2YmFjYjAxMzM5YjM1OWU0NzBjYTgwMjMzODI1M2IxOTY5NjI5M2RlNmQyMTBlZDU1ZDU3N2U3M2IK",
        };
        try {
            //Ejecuta POST
            const response: AxiosResponse<{ registered: boolean }> = await axios.post(url, unit, { headers });
            return {
                status: response.status,
                result: response.data.registered,
            };
        } catch (error) {
            
            console.error("Error al realizar la solicitud:", error);
            return {
                status: 500,
                result: false,
            }; 
        }
    }

}