from orm import models, fields, data

class Sequence(models.Model):
    _name = 'ir.sequence'
    _rec_name = 'code'

    code = fields.Char(string="Code", required=True, index=True)
    sequence = fields.Integer(string="Sequence", defaults=0)

    def get_next(self, code):
        async def next_sequence(sequence_id):
            sequence = sequence_id.sequence + 1
            await sequence_id.write({'sequence': sequence})
            return sequence
        if not self.ids.length: return self.env['ir.sequence'].search(['code', '=', code], limit=1).then(next_sequence)
        return next_sequence(self)

models.register(Sequence)

def add_sequence(code, sequences):
    async def create_sequence():
        sequence_id = await models.env['ir.sequence'].search(['code', '=', code], limit=1)
        if not sequence_id.length:
            sequence_id = await models.env['ir.sequence'].create({'code': code})
        if sequences: sequences[sequence_id.code] = sequence_id.id
    data.register(create_sequence)

__all__ = ['add_sequence']
