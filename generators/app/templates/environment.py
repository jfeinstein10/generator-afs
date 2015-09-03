from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session

engine = create_engine('sqlite://')
Session = scoped_session(sessionmaker(bind=engine))
Base = declarative_base(bind=engine)

