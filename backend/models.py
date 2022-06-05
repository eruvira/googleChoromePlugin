from database import Base
from sqlalchemy import String, Integer, Column

class Item(Base):
    __tablename__='blocked_sites'
    id=Column(Integer, primary_key=True)
    url=Column(String(512), nullable=False)

def __repr__(self):
    return ("Item url ", self.url, self.id)
