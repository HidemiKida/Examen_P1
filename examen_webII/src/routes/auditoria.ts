import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Método DELETE para eliminar un registro de auditoría
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Obtener el registro de auditoría antes de eliminarlo
    const auditoria = await prisma.auditoria.findUnique({
      where: { id: Number(id) },
    });

    if (!auditoria) {
      return res.status(404).json({ error: 'Registro de auditoría no encontrado' });
    }

    // Eliminar el registro de auditoría
    await prisma.auditoria.delete({
      where: { id: Number(id) },
    });

    // Recuperar el elemento dado de baja en la entidad de origen
    if (auditoria.entidad === 'Cliente') {
      await prisma.cliente.update({
        where: { id: auditoria.id_auditado },
        data: { estado: 'Activo' },
      });
    } else if (auditoria.entidad === 'Concepto') {
      await prisma.concepto.update({
        where: { id: auditoria.id_auditado },
        data: { estado: 'Activo' },
      });
    } else if (auditoria.entidad === 'Gasto') {
      await prisma.gasto.update({
        where: { id: auditoria.id_auditado },
        data: { estado: 'Activo' },
      });
    }

    res.json({ message: 'Registro de auditoría eliminado y entidad recuperada' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando el registro de auditoría' });
  } finally {
    await prisma.$disconnect();
  }
});

export default router;
