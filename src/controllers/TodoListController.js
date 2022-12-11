const TodoListModle = require("../models/TodoListModel");

exports.CreateTodo=(req,res)=>{
    let reqBody = req.body;

    let TodoSubject =reqBody['TodoSubject']
    let TodoDescription =reqBody['TodoDescription']
    let UserName = req.headers['username']
    let TodoStatus ='New'
    let TodoCreateDate = Date.now();
    let TodoUpdateDate = Date.now();

    let PostBody={
        UserName:UserName,
        TodoSubject:TodoSubject,
        TodoDescription:TodoDescription,
        TodoStatus:TodoStatus,
        TodoCreateDate:TodoCreateDate,
        TodoUpdateDate:TodoUpdateDate
    }

    TodoListModle.create(PostBody, (err, data)=>{
        if(err){
            res.status(400).json({status:"fail", data:err})
        }
        else{
            res.status(200).json({status:"success", data:data})
        }
    })
}

exports.SeleteTodo=(req,res)=>{
   
    let UserName =req.headers['username']
    TodoListModle.find({UserName:UserName},(err,data)=>{
        if(err){

            res.status(400).json({status:"fail", data:err})
        }
        else{
            res.status(200).json({status:"success", data:data})

            }
        }
    )    
}

exports.UpdateTodo=(req,res)=>{
 let TodoSubject= req.body['TodoSubject3']
 let TodoDescription= req.body['TodoDescription']
 let _id =  req.body['_id']
 let TodoUpdateDate = Date.now();

 let PostBody={
    TodoSubject:TodoSubject,
    TodoDescription:TodoDescription,
    TodoUpdateDate: TodoUpdateDate
 }

 TodoListModle.updateOne({_id:_id},{$set:PostBody},{upsert:true},(err,data)=>{
    if(err){

        res.status(400).json({status:"fail", data:err})
    }
    else{
        res.status(200).json({status:"success", data:data})

        }
})


}

exports.UpdateStatusTodo=(req,res)=>{
    let TodoStatus= req.body['TodoStatus']
    let _id =  req.body['_id']
    let TodoUpdateDate = Date.now();
   
    let PostBody={
       TodoStatus:TodoStatus,
       TodoUpdateDate: TodoUpdateDate
    }
   
    TodoListModle.updateOne({_id:_id},{$set:PostBody},{upsert:true},(err,data)=>{
       if(err){
   
           res.status(400).json({status:"fail", data:err})
       }
       else{
           res.status(200).json({status:"success", data:data})
   
           }
   })
   
   
}

exports.RemoveTodo=(req,res)=>{
    
    let _id =  req.body['_id']
   
   
    TodoListModle.remove({_id:_id},(err,data)=>{
       if(err){
   
           res.status(400).json({status:"fail", data:err})
       }
       else{
           res.status(200).json({status:"success", data:data})
   
           }
   })
   
   
}

exports.SeleteTodoByStatus=(req,res)=>{
   
    let UserName =req.headers['username']
    let TodoStatus = req.body['TodoStatus']

    TodoListModle.find({UserName:UserName, TodoStatus:TodoStatus},(err,data)=>{
        if(err){

            res.status(400).json({status:"fail", data:err})
        }
        else{
            res.status(200).json({status:"success", data:data})

            }
        }
    )    
}

exports.SeleteTodoDate=(req,res)=>{

    let UserName =req.headers['username']
    let FormDate = req.body["FormDate"]
    let ToDate = req.body['ToDate']

    TodoListModle.find({UserName:UserName, TodoCreateDate:{$gte:new Date(FormDate), $lte:new Date(ToDate)}},(err,data)=>{
        if(err){

            res.status(400).json({status:"fail", data:err})
        }
        else{
            res.status(200).json({status:"success", data:data})

            }
        }
    )    
}