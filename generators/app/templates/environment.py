from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session

from config import db_url


engine = create_engine(db_url)
Session = scoped_session(sessionmaker(bind=engine))
Base = declarative_base(bind=engine)
