#!/usr/bin/env python
from migrate.versioning.shell import main
from config import db_url, debug

if __name__ == '__main__':
    main(repository='models/migrate', url=db_url, debug=str(debug))
