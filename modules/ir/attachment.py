from orm import models, fields
from ....database.file import saveFile, deleteFile, getPath

class Attachment(models.Model):
    _name = 'ir.attachment'

    name = fields.Char(string="File Hash", index=True)
    path = fields.Char(string="File Path")

    async def saveToFilesystem(self, buffer, mimeType):
        hash = await saveFile(buffer, mimeType)
        result = await self.create({'name': hash, 'path': getPath(hash, True)})
        return result

    async def unlink(self, ids):
        hashes = [record.name for record in self]
        await super().unlink(self, ids)
        await Promise.all([
            self.env['ir.attachment'].search([('name', '=', hash)]).then(lambda record: not record.length and deleteFile(hash)) for hash in hashes
        ])

models.register(Attachment)
