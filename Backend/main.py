from typing import Union

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from llama_index.core import (
    VectorStoreIndex,
    SimpleDirectoryReader,
    StorageContext,
    load_index_from_storage,
)
from pydantic import BaseModel

# inititating an app to handle routes
app = FastAPI()

# to load evnironment variables
load_dotenv()

# setting OPENAI_API_KEY
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

# setting origins for cors
origins=[
    "http://localhost:3000"
]

# setting cors 
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["GET","POST"],
    allow_headers =["*"]
)

documents = SimpleDirectoryReader("data").load_data()
    # indexing the documents data
index = VectorStoreIndex.from_documents(documents)
# setting a query engine to query through indexes
query_engine = index.as_query_engine()


# model for query
class Query(BaseModel):
    text:str

# post route for getting queries from frontend
@app.post("/messages")
async def query(q:Query):
    if not q.text:
        raise HTTPException(status_code=422, detail="Message text cannot be empty")
    print(q)
    # getting response from query engine related to the query 
    response = query_engine.query(q.text)
    return {"response":response}