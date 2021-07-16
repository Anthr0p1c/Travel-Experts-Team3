from bson.objectid import ObjectId
import matplotlib
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["travelexperts"]
agents = mydb["agents"]

for x in agents.find():
    print(x)



