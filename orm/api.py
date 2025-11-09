def onchange(*fields):
    def wrapper(method):
        return method
    wrapper.onchange_fields = fields
    return wrapper

def depends(*fields):
    def wrapper(method):
        return method
    wrapper.depends_fields = fields
    return wrapper

__all__ = ['onchange', 'depends']