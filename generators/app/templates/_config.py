from ConfigParser import SafeConfigParser


_config = SafeConfigParser({
    'debug': True,
    'db_url': 'sqlite://'
})
_config.read('settings.cfg')

debug = _config.getboolean('<%= projectName %>', 'debug')
db_url = _config.get('<%= projectName %>', 'db_url')
secret = _config.get('<%= projectName %>', 'secret')
