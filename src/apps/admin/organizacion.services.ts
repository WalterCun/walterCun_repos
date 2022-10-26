import { Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Organizacion } from "src/modules/entitys/organizacion.entity";
import { Repository } from "typeorm";



@Injectable()
export class OrganizacionServices {

    constructor(
        @InjectRepository(Organizacion) private readonly _org: Repository<Organizacion>,
    ){}

    
    async createOrganizacion(data: Organizacion): Promise<Organizacion>{

        // const newOrg = await this._org.save({
        //     name: data.name,
        //     statu:data.status,
        //     tribu:data.tribu
        // });

        // return newOrg;

        return this._org.save(data);

    }

    // Metodo para obtener 1 registro de de la organizacion mediante el identificador
    // async getOrganizacion(id: number): Promise<Organizacion> {

    //     const org: Organizacion = await this._org.findOne({ 
    //         where: { id_organizacion:id }, 
    //         relations: ['tribu'] 
    //     });

    //     if (!org) throw new NotFoundException("Resorce not found");

    //     return org;
    // }

}