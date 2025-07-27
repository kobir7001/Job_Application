const express = require('express');
const ConnDB=require('./databases/conn.js');
const cors=require('cors');
const path=require('path');
const cookieParser=require('cookie-parser');
const userRouter=require('./routers/userRouter.js');
const jobRouter=require('./routers/jobRouter.js');
const applicationRouter=require('./routers/applicationRouter.js');
const {errorMiddleware}=require('./middlewares/error.js');

const app=express();

ConnDB();

app.use(cors(
  {
    origin:"*",
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
  }
));


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



//router
app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
app.use('/api/v1/user',userRouter);
app.use('/api/v1/application',applicationRouter);
app.use('/api/v1/job',jobRouter);


app.use(errorMiddleware);

app.listen(5000,()=>{
    console.log('Application running on port 5000');
})