import generateUniqueID from '../utils/generateUniqueID';
import connection from '../database/connection';

class OngController {
  async index(req, res) {
    const ongs = await connection('ongs').select('*');

    return res.json(ongs);
  }

  async store(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = generateUniqueID();

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return res.json({ id });
  }

  async delete(req, res) {
    const { id } = req.params;

    const incident = await connection('ongs')
      .where('id', id)
      .select('*')
      .first();

    if (!incident) {
      return res.status(401).json({ error: 'Operation failed.' });
    }

    await connection('ongs').where('id', id).delete();

    return res.status(204).send();
  }
}

export default new OngController();
