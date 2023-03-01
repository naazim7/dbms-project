const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bycrypt = require('bcrypt'); 
const db = require('./db');

const app = express();


//middlewhere
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession(
  { secret: 'keyboardcat',
   resave: false,
  saveUninitialized: true ,
  cookie: {
    secure: false,  // if true only transmit cookie over https
    httpOnly: false, // if true prevent client side JS from reading the cookie
    maxAge: 1000 * 60 * 10, // session max age in milliseconds
  },


  })); 

app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true
}));

app.use(cookieParser('keyboardcat')); 

app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport); 

/////////////////////////////////////////////////////////////// Middleware end



//routes

app.get('/',(req,res)=>{
    res.send("Hello");
})

/// User Login and Registration API  
app.post('/register', (req, res) => {
  
    const query = "INSERT INTO `dbms_project`.`user` (`username`, `password`,`email`,`bio`) VALUES (?,?,?,?)";
    const query2 = "SELECT * FROM dbms_project.user where email = ? or username=?";
  
    db.query(query2, [req.body.email,req.body.username] ,async (err, rows) => {
      if (err) {console.log(err);}
      if (rows.length > 0) {res.send("User already exists");}
      if (rows.length === 0) {
        const hashedPassword =  await bycrypt.hash(req.body.password, 10);
        db.query(query, [req.body.username,hashedPassword,req.body.email,req.body.bio], (err, rows) => {
          if (err) {console.log(err);}
          res.send("User Created");
        });
      }
    })
})


app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => { 
    if (err) {console.log(err);}
    if (!user) {res.send("User not found");}
    if (user) {
      req.login(user, (err) => {
        if (err) {console.log(err);}
        res.send(user);
        //console.log(res);
        console.log(user.username);
        
      })
    }
  })(req, res, next); 
})

app.get('/user/:username',(req,res)=>{
  const query2 = "SELECT * FROM dbms_project.user where username=?";
  let result=db.query(query2,[req.body.username]);
  res.send(result);
  console.log(result)


})

//Get user By user Id


app.get('/getUser', (req, res) => {
 
  console.log(req.user)
  res.send(req.user);
})



//End of User Registration and Login API For User



//Tag Api

//Post
app.post('/tags', (req, res) => {
  const tagName = req.body.tagName; // Assuming tagName is a field in your request body

  const query = "INSERT INTO tags (tag_name) VALUES (?)";
  db.query(query, [tagName], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error inserting tag.");
    } else {
      console.log(`Tag ${tagName} inserted successfully!`);
      res.status(200).send("Tag inserted successfully!");
    }
  });
});

//get

//Tag with count 



app.get('/tag', (req, res) => {
  const query = `
    SELECT tags.name, COUNT(dbms_project.question.tag_id) as count
    FROM tags
    LEFT JOIN dbms_project.question ON dbms_project.tags.tag_id = dbms_project.question.tag_id
    GROUP BY tags.tag_id
  `;
  db.query(query, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(rows);
    }
  });
});



//Question BY Tag
app.get('/tag/:tag_name', (req, res) => {
  const tagName = req.params.tag_name;
  //const query = "SELECT question_id, views, title, body, user_id FROM question WHERE tag_id = ?";
  const query="SELECT q.question_id, q.views, q.title, q.body, q.user_id, u.username FROM question q JOIN user u ON q.user_id = u.user_id WHERE q.tag_id = ?;"
  const tagQuery = "SELECT tag_id FROM tags WHERE name = ?";

  db.query(tagQuery, [tagName], (err, tagRows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving tag id");
    } else {
      const tagId = tagRows[0].tag_id;
      db.query(query, [tagId], (err, questionRows) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error retrieving questions by tag");
        } else {
          res.send(questionRows);
        }
      });
    }
  });
});



app.get('/tags', (req, res) => {
  const query = "SELECT * FROM tags";

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving tags.");
    } else {
      res.status(200).send(result);
    }
  });
});
//Deleteee
app.delete('/tags/:id', (req, res) => {
  const tagId = req.params.id;

  const query = "DELETE FROM tags WHERE id = ?";
  db.query(query, [tagId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting tag.");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Tag not found.");
    } else {
      res.status(200).send("Tag deleted successfully!");
    }
  });
});

//Update

app.put('/tags/:id', (req, res) => {
  const tagId = req.params.id;
  const newTagName = req.body.tagName;

  const query = "UPDATE tags SET tag_name = ? WHERE id = ?";
  db.query(query, [newTagName, tagId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating tag.");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Tag not found.");
    } else {
      res.status(200).send("Tag updated successfully!");
    }
  });
});

////////////Question API ///////////////

// CREATE a new question
app.post('/questions', (req, res) => {
  const { title, body, user_id, tag_id } = req.body;
  const query = "INSERT INTO question (title, body, user_id, tag_id) VALUES (?, ?, ?, ?)";

  db.query(query, [title, body, user_id, tag_id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error creating question.");
    } else {
      res.status(200).send("Question created successfully!");
    }
  });
});

// GET all questions
app.get('/questions', (req, res) => {
  const query = "SELECT * FROM question";

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving questions.");
    } else {
      res.status(200).send(result);
    }
  });
});

///Latest Post

app.get('/latest-questions', (req, res) => {
  const query = 'SELECT * FROM question ORDER BY created_at DESC LIMIT 10';

  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});





// GET a specific question by question_id
app.get('/questions/:questionId', (req, res) => {
  const questionId = req.params.questionId;
  const query="SELECT q.question_id, q.views, q.title, q.body, q.user_id, u.username FROM question q JOIN user u ON q.user_id = u.user_id WHERE q.question_id = ?;"

  db.query(query, [questionId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving question.");
    } else if (result.length === 0) {
      res.status(404).send("Question not found.");
    } else {
      res.status(200).send(result[0]);
    }
  });
});

// UPDATE a specific question by question_id
app.put('/questions/:questionId', (req, res) => {
  const questionId = req.params.questionId;
  const { title, body, user_id, tag_id } = req.body;
  const query = "UPDATE question SET title = ?, body = ?, user_id = ?, tag_id = ? WHERE question_id = ?";

  db.query(query, [title, body, user_id, tag_id, questionId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating question.");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Question not found.");
    } else {
      res.status(200).send("Question updated successfully!");
    }
  });
});

// DELETE a specific question by question_id
app.delete('/questions/:questionId', (req, res) => {
  const questionId = req.params.questionId;
  const query = "DELETE FROM question WHERE question_id = ?";

  db.query(query, [questionId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting question.");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Question not found.");
    } else {
      res.status(200).send("Question deleted successfully!");
    }
  });
});



/////////// end Of question API //////////



//Start of Blog Post API//////////







app.post('/post', (req, res) => {
  const { title, body, user_id,img_url} = req.body;
  const query = "INSERT INTO posts (title, body, user_id,img_url) VALUES (?, ?, ?,?)";

  db.query(query, [title, body, user_id,img_url], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error creating question.");
    } else {
      res.status(200).send("Question created successfully!");
    }
  });
});

// GET all Posts
app.get('/posts', (req, res) => {
  const query = "SELECT * FROM posts";

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving questions.");
    } else {
      res.status(200).send(result);
    }
  });
});

///Latest Post

app.get('/latest-posts', (req, res) => {
  const query = 'SELECT * FROM posts ORDER BY created_at ASC LIMIT 10';

  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});





// GET a specific Post by POST ID
app.get('/posts/:post_id', (req, res) => {
  const post_id = req.params.post_id;
  const query = "SELECT * FROM posts WHERE post_id = ?";

  db.query(query, [post_id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving question.");
    } else if (result.length === 0) {
      res.status(404).send("Question not found.");
    } else {
      res.status(200).send(result[0]);
    }
  });
});

// UPDATE a specific question by question_id
app.put('/posts/:post_id', (req, res) => {
  const post_id = req.params.questionId;
  const { title, body, user_id } = req.body;
  const query = "UPDATE posts SET title = ?, body = ?, user_id = ? WHERE post_id = ?";

  db.query(query, [title, body, user_id, post_id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating question.");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Question not found.");
    } else {
      res.status(200).send("Question updated successfully!");
    }
  });
});

// DELETE a specific question by question_id
app.delete('/posts/:post_id', (req, res) => {
  const post_id = req.params.post_id;
  const query = "DELETE FROM posts WHERE post_id = ?";

  db.query(query, [post_id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting question.");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Question not found.");
    } else {
      res.status(200).send("Question deleted successfully!");
    }
  });
});








///

//***********************Answer API****************************//

//Post api ans


app.post('/answer', (req, res) => {
  const { body,user_id,ques_id} = req.body;
  const query = "INSERT INTO answers (user_id,body,ques_id) VALUES (?, ?, ?)";

  db.query(query, [user_id,body,ques_id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error creating question.");
    } else {
      res.status(200).send("Question created successfully!");
    }
  });
});

//





app.get('/answer/:ques_id', (req, res) => {
  const ques_id = req.params.ques_id;
  const query = "SELECT a.answer_id, a.upVotes, a.downVotes, a.body, a.user_id, u.username FROM answers a JOIN user u ON a.user_id = u.user_id WHERE a.ques_id = ? ORDER BY a.upVotes DESC";

  db.query(query, [ques_id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving question.");
    } else if (result.length === 0) {
      res.send('No answer');
    } else {
      res.json(result);
    }
  });
});


//UpVote

app.put('/answers/:answer_id/upvote', async (req, res) => {
  const { answer_id } = req.params;

  try {
    const result = db.query('UPDATE answers SET upVotes = upVotes + 1 WHERE answer_id = ?', [answer_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    return res.status(200).json({ message: 'Answer upvoted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
//Downvote


app.put('/answers/:answer_id/downvote', async (req, res) => {
  const { answer_id } = req.params;

  try {
    const result = db.query('UPDATE answers SET downVotes = downVotes + 1 WHERE answer_id = ?', [answer_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    return res.status(200).json({ message: 'Answer upvoted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



//
//Site statistics
//

app.get('/stats', async (req, res) => {
  try {
    // Fetch total number of users
    const userQuery = 'SELECT COUNT(*) AS user_count FROM user';
    const userResult = await db.query(userQuery);
    const userCount = userResult.rows && userResult.rows.length > 0 ? userResult.rows[0].user_count : 0;

    // Fetch total number of questions
    const questionQuery = 'SELECT COUNT(*) AS question_count FROM question';
    const questionResult = await db.query(questionQuery);
    const questionCount = questionResult.rows && questionResult.rows.length > 0 ? questionResult.rows[0].question_count : 0;

    // Fetch total number of blog posts
    const postQuery = 'SELECT COUNT(*) AS post_count FROM posts';
    const postResult = await db.query(postQuery);
    const postCount = postResult.rows && postResult.rows.length > 0 ? postResult.rows[0].post_count : 0;

    // Fetch total number of answers
    const answerQuery = 'SELECT COUNT(*) AS answer_count FROM answers';
    const answerResult = await db.query(answerQuery);
    const answerCount = answerResult.rows && answerResult.rows.length > 0 ? answerResult.rows[0].answer_count : 0;

    // Send response with statistics
    res.json({
      user_count: userCount,
      question_count: questionCount,
      post_count: postCount,
      answer_count: answerCount
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});




//start server 
app.listen(3001, () => {console.log('Server started on port 3001')});

