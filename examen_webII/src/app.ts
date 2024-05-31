import { PrismaClient } from '@prisma/client';
import express from 'express';
import bodyParser from 'body-parser';
import auditoriaRouter from './routes/auditoria';

const app = express();

app.use(bodyParser.json());
app.use('/auditoria', auditoriaRouter);

export default app;

const prisma = new PrismaClient();
async function main() {
   

    const auditoria1 = await prisma.auditoria.create({
        data: {
          entidad: 'Cliente',
          detalle: 'Se creó un nuevo cliente',
          fecha: new Date(),
          id_auditado: 1, // Asume que existe un cliente con id 1
        },
      });
    
      const auditoria2 = await prisma.auditoria.create({
        data: {
          entidad: 'Concepto',
          detalle: 'Se creó un nuevo concepto',
          fecha: new Date(),
          id_auditado: 1, // Asume que existe un concepto con id 1
        },
      });
    
      const auditoria3 = await prisma.auditoria.create({
        data: {
          entidad: 'Gasto',
          detalle: 'Se registró un nuevo gasto',
          fecha: new Date(),
          id_auditado: 1, // Asume que existe un gasto con id 1
        },
      });
    
      console.log('Auditoria 1:', auditoria1);
      console.log('Auditoria 2:', auditoria2);
      console.log('Auditoria 3:', auditoria3);
    
    }
    
    main()
      .catch((e) => {
        console.error(e);
        process.exit(1);
      })
      .finally(async () => {
        await prisma.$disconnect();
      });