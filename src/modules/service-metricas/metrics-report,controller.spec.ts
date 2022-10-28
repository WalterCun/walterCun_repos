import {Test} from '@nestjs/testing';
import { MetricasReporteriaController } from './metrics-export.controller';
import { MetricsService } from './metrics.service';



describe('Ejecucion de pruebas de reportes', ()=>{
    let reportController: MetricasReporteriaController;
    let reportService: MetricsService;

    beforeEach(async ()=>{
        const module = await Test.createTestingModule({
            controllers: [MetricasReporteriaController]
        }).compile();

        reportController = module.get<MetricasReporteriaController>(MetricasReporteriaController);
        reportService = module.get<MetricsService>(MetricsService);
    });

    // describe('Ejecucion de casos de pruebas',()=>{
    //     it('Escenario 1: Obtener metrics de repositorio por tribu', async ()=> {
    //         expect().toBe();
    //     });
        
    //     it('Escenario 2: Tribu inexistente', async ()=> {

    //     });
        
    //     it('Escenario 3: Informacion de verificacion', async ()=> {

    //     });
        
    //     it('Escenario 4: Tribu no tiene repositorio que cumplan con la cobertura', async ()=> {

    //     });
    // });
});