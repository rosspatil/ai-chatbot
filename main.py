import os
import openai
import logging
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from service import Service
from starlette.responses import RedirectResponse

logging.basicConfig()
logging.getLogger().setLevel(logging.INFO)

openai.api_type = os.environ["OPENAI_API_TYPE"]
openai.api_base = os.environ["OPENAI_API_BASE"]
openai.api_key = os.environ["OPENAI_API_KEY"]
openai.api_version = os.environ["OPENAI_API_VERSION"]
chat = Service()
app = FastAPI()
app.mount("/client", StaticFiles(directory="client"), name="client")


class Query(BaseModel):
    query: str
    session_id: str


@app.get("/")
async def home():
    return RedirectResponse(url="/client/index.html")


@app.post("/chat/")
async def read_root(req: Query):
    if req.query == "":
        return {"reply": "invalid input"}
    try:
        resp = await chat.lets_chat(req.query, req.session_id, os.environ["QDRANT_COLLECTION_NAME"])
        return {"reply": resp}
    except openai.error.InvalidRequestError as error:
        if error.error.code == "content_filter":
            return {"reply": "Restricted query"}


@app.get("/reset/")
async def reset(session_id: str = ""):
    await chat.reset(session_id)
    return {}
