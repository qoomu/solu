attributes = ['required', 'readonly', 'defaults', 'compute', 'related', 'no_offline', 'protect', 'defaults']

class Field:
    def __init__(self, fields):
        for key in dict(fields):
            self[key] = fields[key]

def field_factory(*args): return new (Field(Object.assign(*args.reverse())))

def Char(**params):
    return field_factory({'type': 'char', 'string': params.string, 'store': params.store if 'store' in params else True, 'index': params.index if 'index' in params else True, 'defaults': params.defaults or ''}, Object.fromEntries([[attribute, params[attribute] or None] for attribute in attributes]))

def Text(**params):
    return field_factory({'type': 'text', 'string': params.string, 'store': params.store if 'store' in params else True, 'index': params.index if 'index' in params else True, 'defaults': params.defaults or ''}, Object.fromEntries([[attribute, params[attribute] or None] for attribute in attributes]))

def Integer(**params):
    return field_factory({'type': 'integer', 'string': params.string, 'store': params.store if 'store' in params else True, 'index': params.index if 'index' in params else True, 'defaults': params.defaults or 0}, Object.fromEntries([[attribute, params[attribute] or None] for attribute in attributes]))

def Float(**params):
    return field_factory({'type': 'float', 'string': params.string, 'store': params.store if 'store' in params else True, 'index': params.index if 'index' in params else True, 'defaults': params.defaults or 0.0}, Object.fromEntries([[attribute, params[attribute] or None] for attribute in attributes]))

#While javascript have the same Number type for integer and float, we will differentiate them for data-storing purposes. Integer will be stored with parseInt and float will be stored with parseFloat

def Boolean(**params):
    return field_factory({'type': 'boolean', 'string': params.string, 'store': params.store if 'store' in params else True, 'index': params.index if 'index' in params else True, 'defaults': params.defaults or False}, Object.fromEntries([[attribute, params[attribute] or None] for attribute in attributes]))

def Binary(**params):
    return field_factory({'type': 'binary', 'string': params.string, 'store': params.store if 'store' in params else True, 'index': params.index if 'index' in params else True}, Object.fromEntries([[attribute, params[attribute] or None] for attribute in attributes]))

def Many2one(relation, **params):
    return field_factory({'type': 'many2one', 'relation': relation, 'ondelete': 'cascade', 'string': params.string, 'store': params.store if 'store' in params else True, 'index': params.index if 'index' in params else True}, Object.fromEntries([[attribute, params[attribute] or None] for attribute in attributes]))

def One2many(relation, inverse, **params):
    return field_factory({'type': 'one2many', 'relation': relation, 'ondelete': 'cascade', 'defaults': params.defaults or [], 'inverse': inverse, 'string': params.string, 'store': params.store if 'store' in params else True, 'index': params.index if 'index' in params else True}, Object.fromEntries([[attribute, params[attribute] or None] for attribute in attributes]))

def Many2many(relation, **params):
    return field_factory({'type': 'many2many', 'relation': relation, 'ondelete': 'cascade', 'defaults': params.defaults or [], 'string': params.string, 'store': params.store if 'store' in params else True, 'index': params.index if 'index' in params else True}, Object.fromEntries([[attribute, params[attribute] or None] for attribute in attributes]))

#This only exists in pouchdb-relational, maybe we should retire this

#def One2one(relation, **params):
#    return field_factory({'type': 'one2one', 'relation': relation, 'ondelete': 'cascade', 'string': params.string, 'store': params.store if 'store' in params else True, 'index': params.index if 'index' in params else True}, Object.fromEntries([[attribute, params[attribute] or None] for attribute in attributes]))

def Selection(selection, **params):
    if params.selection: selection = params.selection
    if selection.selection:
        selection = selection.selection
        params = selection
    if not Array.isArray(selection):
        params = selection
        selection = []
    return field_factory({'type': 'selection', 'selection': selection, 'string': params.string, 'store': params.store if 'store' in params else True, 'index': params.index if 'index' in params else True}, Object.fromEntries([[attribute, params[attribute] or None] for attribute in attributes]))

def Date(**params):
    return field_factory({'type': 'date', 'string': params.string, 'store': params.store if 'store' in params else True, 'index': params.index if 'index' in params else True}, Object.fromEntries([[attribute, params[attribute] or None] for attribute in attributes]))

def Datetime(**params):
    return field_factory({'type': 'datetime', 'string': params.string, 'store': params.store if 'store' in params else True, 'index': params.index if 'index' in params else True}, Object.fromEntries([[attribute, params[attribute] or None] for attribute in attributes]))

#Add fields.Data for storing JSON
def Data(**params):
    return field_factory({'type': 'data', 'string': params.string, 'store': params.store if 'store' in params else True, 'index': params.index if 'index' in params else True, 'index_fields': []}, Object.fromEntries([[attribute, params[attribute] or None] for attribute in attributes]))

__all__ = ['Field', 'Char', 'Text', 'Integer', 'Float', 'Boolean', 'Binary', 'Many2one', 'One2many', 'Many2many', 'Selection', 'Date', 'Datetime', 'Data']
__default__ = {'Field': Field, 'Char': Char, 'Text': Text, 'Integer': Integer, 'Float': Float, 'Boolean': Boolean, 'Binary': Binary, 'Many2one': Many2one, 'One2many': One2many, 'Many2many': Many2many, 'Selection': Selection, 'Date': Date, 'Datetime': Datetime, 'Data': Data}
