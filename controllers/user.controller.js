function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const db= require('../db');
const shortid= require('shortid');
var num_of_sub=3;
module.exports={
    index:  function(req,res){
        res.render('users/index.pug',{
            users1:  db.get('users1').value(),       
            users2:  db.get('users2').value(),       // transfer value into html files
        });
    },

    // search: function(req,res){
    //     var q= req.query.q;
    //     var matchedUsers = db.get('users1').filter(function(user){
    //         return user.name.toLowerCase().indexOf(q.toLowerCase())!=-1;
    //     }).write();
    //     //console.log(matchedUsers);
    //     res.render('users/search.pug',{
    //         users : matchedUsers,
    //     });
    // },

    search: function(req,res){
        var q= req.query.q;
        var object1=db.get('users1').value();
        // console.log(typeof q);
        // console.log(object1[0].subject);// show the favorite subjects of the first person
        var matchedUsers;
        if (q.length==""){
            mathchedUsers={users:[]}; // need to be debugged
        }
        else {
            matchedUsers = db.get('users1').filter(function(user){
            return user.subject!=null&&user.subject.length>0&&user.subject.indexOf(q)!=-1;//check whether there are any common favorite subjects
            }).write();
        }
        
        console.log(matchedUsers);
        res.render('users/search.pug',{
            users : matchedUsers,
        });
    },

    create1: function(req,res){
        res.render('users/create1',{
            users : db.get('users1').value(),
        });
    },

    // create2: function(req,res){
    //     res.render('users/create2',{
    //         users : db.get('users2').value(),
    //     });
    // },

    viewUser: function(req,res){
        var id = req.params.id;
        var curuser = db.get('users1').find({id:id}).value();
        var matchedUsers;
        curuser.num_visited+=1;
        matchedUsers = db.get('users1').filter(function(user){
            if (user.subject==null||user.subject.length<=0||user.id==curuser.id){
                return 0;
            }
            var check1=0,check2=0;
            for (var i=0;i<curuser.subject.length;i++){
                if (user.subject.indexOf(curuser.subject[i])!=-1){
                    check1=1;
                    // break;
                }
            }
            check2= (user.freeTimeD +user.freeTime== curuser.freeTimeD + curuser.freeTime);
            return (check1 * check2 != 0);
            // return user.subject!=null&&user.subject.length>0&&user.subject.indexOf(q)!=-1;// check if there are anyone whose favorite subject is Math
        }).write();

        res.render('users/viewuser',{
            user: curuser,
            users : matchedUsers,
        });
    },

    postCreate1: function(req,res){
        req.body.id = shortid.generate();//create a random id
        req.body.num_visited=0;
        //var id1= req.body.id;
        // req.body.age = getRandomInt(100);
        // req.body.subject= [];
        // db.get('users1').push(req.body.subject).write();
        db.get('users1').push(req.body).write();//push the inputted object into database
        res.redirect('/users/'+String(req.body.id)); 
        
        // var curuser = db.get('users1').find({id:req.body.id}).value();
        // var matchedUsers;
        // matchedUsers = db.get('users1').filter(function(user){
        //     if (user.subject==null||user.subject.length<=0||user.id==curuser.id){
        //         return 0;
        //     }
        //     var check1=0,check2=0;
        //     for (var i=0;i<curuser.subject.length;i++){
        //         if (user.subject.indexOf(curuser.subject[i])!=-1){
        //             check1=1;
        //             // break;
        //         }
        //     }
        //     check2= (user.freeTimeD +user.freeTime== curuser.freeTimeD + curuser.freeTime);
        //     return (check1 * check2 != 0);
        //     // return user.subject!=null&&user.subject.length>0&&user.subject.indexOf(q)!=-1;// check if there are anyone whose favorite subject is Math
        //     }).write();

        // res.render('users/viewuser',{
        //     user: curuser,
        //     users : matchedUsers,
        // });
        
    },
    
    // match  : function(req,res){
    //     res.render('users/viewuser',{
    //         // user: user,
    //         users : db.get('users1').value(),
    //     });
    // },

    // postCreate2: function(req,res){
    //     req.body.id = shortid.generate();//create a random id
    //     // req.body.age = getRandomInt(100);
    //     db.get('users2').push(req.body).write();//push the inputted object into database
    //     res.redirect('/users'); 
    // },


}