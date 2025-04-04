import express from "express";

const app = express()

app.get("/cpu",(req,res)=>{
	for(let i=0;i<100000;i++){
		Math.random()
	}
	res.send("hello world")
})

app.listen(1000)
