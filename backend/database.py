from sqlalchemy.orm import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine=create_engine("postgresql://rwrisdsykcukou:fff2aca4dc1aa19d1103fec321c209aa57b3d7ebebef95da2178f0c43ea8c8c3@ec2-44-196-174-238.compute-1.amazonaws.com:5432/d2a3icda6vclj9", echo=True)

Base=declarative_base()

SessionLocal=sessionmaker(bind=engine)
