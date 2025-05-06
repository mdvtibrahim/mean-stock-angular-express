const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 4000;
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const studrouter = require('./router/studrouter')
const userRouter = require('./router/authrouter');
// app.get('/',(req,res)=>{
//     res.send('hellooo!')
// })
// //connection
app.use(cors({
    origin: '*', // Allow requests from Angular frontend (adjust if needed)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  }));
  
  app.use(bodyParser.json()); 
  app.use(express.json());
  mongoose.connect('mongodb://localhost:27017/admin',{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>{
      console.log('mongo connected!'); 
    })
    .catch(err=>{
        console.error('not connect!',err);
    })
    //insert table
    // const userSchema = new mongoose.Schema({
        //     username:String,
        //     mobile:Number,
        //     mail:String
        // })
        // const User = mongoose.model('User',userSchema)
        // // app.get('/add',async(req,res)=>{
            // // try{
                // //     const user = new User({
                    // //         username:'surendhar',
                    // //         mobile:7010632253,
                    // //         mail:'s@gmail.com',
                    // //     })
                    // //     await user.save();
                    // //     res.send('Added Successfully')
                    // // }
                    // // catch(err){
                        // //     console.error('not added',err);
                        
                        // // }
                        // // })
                        // //route
                        
                        // // app.use('/api',(req,res)=>{
                            
                            // // })
                            app.use('/api',studrouter)
                            app.use('/api', userRouter);
                            // app.use(express.static(path.join(__dirname, 'dist/mean_angular')));
                            // app.get('*', (req, res) => {
                            //   res.sendFile(path.join(__dirname, 'dist/mean_angular/index.html'));
                            // });
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
    
})