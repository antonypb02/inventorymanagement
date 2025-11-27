from fastapi import FastAPI
from models import Product
from database import SessionLocal,engine
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends
import database_models
from products import products





app= FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

database_models.Base.metadata.create_all(bind=engine)


def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:

        db.close()

@app.get("/")
def greet():
    return f"Hello, welcome to the Inventory Management System!"



def init_db():
    db=SessionLocal()

    count=db.query(database_models.Product).count()

    if count==0:

        for product in products:
            db.add(database_models.Product(**product.model_dump()))
        db.commit()
init_db()


@app.get("/products")
def get_products(db:Session=Depends(get_db)):
    return db.query(database_models.Product).all()


@app.get("/product/{id}")
def get_product_by_id(id: int,db:Session=Depends(get_db)):
    db_product= db.query(database_models.Product).filter(database_models.Product.id==id).first()

    if db_product:
        return db_product
        
    return "no product found"




@app.post("/product")
def add_product(product:Product,db:Session=Depends(get_db)):

    new_product=database_models.Product(**product.model_dump())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product


@app.delete("/product/{id}")
def delete_product(id:int,db:Session=Depends(get_db)):
    db_product=db.query(database_models.Product).filter(database_models.Product.id==id).first()

    if db_product:
        db.delete(db_product)
        db.commit()
        return f"Product with id {id} deleted successfully"
    return "No product found to delete"


@app.put("/product/{id}")
def update_product(id:int,product:Product,db:Session=Depends(get_db)):
    db_product=db.query(database_models.Product).filter(database_models.Product.id==id).first()
    if db_product:
        db_product.name=product.name
        db_product.description=product.description 
        db_product.quantity=product.quantity
        db_product.price=product.price
        db.commit()
        return "new product updated"

       
    else:
        return "No product found"
    


