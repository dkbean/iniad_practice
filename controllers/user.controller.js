function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const db= require('../db');
const shortid= require('shortid');
var num_of_sub=3;
module.exports={
    index:  function(req,res){
        // console.log(db.get('users1').value().length);
        res.render('users/index.pug',{
            users1:  db.get('users1').value(),       
            num_of_users: db.get('users1').value().length // transfer value into html files
        });
    },

    admin:  function(req,res){
        // console.log(db.get('users1').value().length);
        res.render('index.pug',{
            users1:  db.get('users1').value(),       
            num_of_users: db.get('users1').value().length // transfer value into html files
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

    invalid: function(req,res){
        var q= req.query.q;
        // console.log(q);
        if (q==null){
            res.render('users/invalid',{
            });
        }
        else {
            var object1=db.get('users1').value();
            // console.log(object1[0].subject);// show the favorite subjects of the first person
            
            //console.log(matchedUsers);
            // res.render('users/search.pug',{
            //     users : matchedUser,
            // });
            var curuser = db.get('users1').find({id:q}).value();
            var is_ID_existed=(curuser!=null); //check the validation of inputted id
            if (is_ID_existed){
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
            }
            else {
                // console.log("Invalid: " + q);
                res.redirect('/users/invalid'); 
            }
        }
        
        // res.render('users/invalid',{
        // });
    },

    search: function(req,res){
        var q= req.query.q;
        var object1=db.get('users1').value();
        // console.log(q);
        // console.log(object1[0].subject);// show the favorite subjects of the first person
        
        //console.log(matchedUsers);
        // res.render('users/search.pug',{
        //     users : matchedUser,
        // });
        if (q=="Vinh cute"){
            res.redirect('/users/admin'); 
        }
        else {
            var curuser = db.get('users1').find({id:q}).value();
            var is_ID_existed=(curuser!=null); //check the validation of inputted id
            if (is_ID_existed){
                
                res.redirect("/users/"+q); 
            }
            else {
                // console.log("Invalid: " + q);
                res.redirect('/users/invalid'); 
            }
        }
        
        
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
            var check1=0,check2=0,check3=0;
            check3= (user.partner==null);
            for (var i=0;i<curuser.subject.length;i++){
                if (user.subject.indexOf(curuser.subject[i])!=-1){
                    check1=1;
                    // break;
                }
            }
            check2= (user.freeTimeD +user.freeTime== curuser.freeTimeD + curuser.freeTime);
            return (check1 * check2 * check3 != 0);
            // return user.subject!=null&&user.subject.length>0&&user.subject.indexOf(q)!=-1;// check if there are anyone whose favorite subject is Math
        }).write();
        var partner;
        if (curuser.partner!=null){
            partner=db.get('users1').find({id:curuser.partner}).value();;
        }
        res.render('users/viewuser',{
            user: curuser,
            users : matchedUsers,
            found_num: matchedUsers.length,
            partner: partner,
        });
    },

    postCreate1: function(req,res){
        req.body.id = shortid.generate();//create a random id
        req.body.num_visited=0;
        req.body.partner=null;
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
    
    match  : function(req,res){
        var id1 = req.params.id1;
        var id2= req.params.id2;
        var curuser = db.get('users1').find({id:id1}).value();
        var paired_user= db.get('users1').find({id:id2}).value();
        curuser.partner= paired_user.id;
        paired_user.partner=curuser.id;
        res.render('users/match.pug',{
            user1: curuser,
            user2: paired_user,
        });
        // console.log(id1);
        // console.log(id2);
    },

    automatch  : function(req,res){
        var id = req.params.id;
        var curuser = db.get('users1').find({id:id}).value();
        matchedUsers = db.get('users1').filter(function(user){
            if (user.subject==null||user.subject.length<=0||user.id==curuser.id){
                return 0;
            }
            var check1=0,check2=0,check3=0;
            check3= (user.partner==null);
            for (var i=0;i<curuser.subject.length;i++){
                if (user.subject.indexOf(curuser.subject[i])!=-1){
                    check1=1;
                    // break;
                }
            }
            check2= (user.freeTimeD +user.freeTime== curuser.freeTimeD + curuser.freeTime);
            return (check1 * check2 * check3 != 0);
            // return user.subject!=null&&user.subject.length>0&&user.subject.indexOf(q)!=-1;// check if there are anyone whose favorite subject is Math
        }).write();
        // console.log(curuser.score);
        var min_dif=100000,result=-1;
        for (var i=0;i<matchedUsers.length;i++){
            var user=matchedUsers[i];
            if (user.score!=null){
                // console.log(user.name+' '+Math.abs(curuser.score-user.score));
                var dif=Math.abs(curuser.score-user.score);
                if (min_dif>dif){
                    min_dif=dif;
                    result=i;
                }
            }
            
        }
        paired_user= matchedUsers[result];
        // console.log(paired_user.name);
        curuser.partner= paired_user.id;
        paired_user.partner=curuser.id;
        res.render('users/match.pug',{
            user1: curuser,
            user2: paired_user,
        });
        // res.render('users/match.pug',{
        //     user1: curuser,
        //     user2: paired_user,
        // });
        // console.log(id);
        // console.log(id2);
    },

    // postCreate2: function(req,res){
    //     req.body.id = shortid.generate();//create a random id
    //     // req.body.age = getRandomInt(100);
    //     db.get('users2').push(req.body).write();//push the inputted object into database
    //     res.redirect('/users'); 
    // },


}