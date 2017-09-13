'use strict';

const mongoose = require('mongoose');
const Thread = mongoose.model('Thread');
const Answer = mongoose.model('Answer');
const ROLE_ADMIN = require('../../config/constants').ROLE_ADMIN;
const ROLE_USER = require('../../config/constants').ROLE_USER;
const EDIT_TIMEOUT = require('../../config/constants').EDIT_TIMEOUT;

const util = require('../utilities/helper');

//=========================================
// Create Answer
//=========================================
module.exports.answersCreate = function(req, res) {
  const responseText = req.body.responseText;
  const likes = req.body.likes || [];
  const dislikes = req.body.dislikes || [];
  const isUseful = req.body.isUseful || false;
  const userId = req.user._id;
  
  if (!responseText) {
    util.sendJsonResponse(res, 400, {
      "message": "Your response required"
    });
    return;
  }
  
  if (req.params && req.params.threadId) {
    let threadId = req.params.threadId;
    
    Thread
      .findById(req.params.threadId, (error, foundThread) => {
      
        if (!foundThread) {
          res.status(404).json({ message: 'ThreadId not found.' });
          return;
        } else if (error) {
          res.status(404).json(error);
          return;
        }
      
        Answer.create({
          author: userId,
          responseText: responseText,
          thread: threadId,
          likes: likes,
          dislikes: dislikes,
          isUseful: isUseful
        }, (error, newAnswer) => {
          if (error) {
            util.sendJsonResponse(res, 400, error);
          } else {
            foundThread.answers.push(newAnswer._id);
            foundThread.save((error, updatedThread) => {
              if (error) {
                res.status(404).json(error);
              }
            });
            
            util.sendJsonResponse(res, 201, newAnswer);
          }
        });

      });
  } else { 
    res.status(404).json({ message: 'No threadId in request.' });
  }

};

//=========================================
// Get One Answer
//=========================================
module.exports.answersReadOne = function(req, res) {
  const userId = req.user._id;
  
  if (req.params && req.params.answerId) {
    Answer
      .findById({_id: req.params.answerId})
      .populate(
        {
          path: 'author',
          select: '_id name email createdAt updatedAt'
        }
      )
      .exec((error, foundAnswer) => {
        if (!foundAnswer) {
          res.status(404).json({ message: 'AnswerId not found.' });
          return;
        } else if (error) {
          res.status(404).json(error);
          return;
        }
        
        let dateNow = Date.now();
      
        let answerCreatedAt = Date.parse(foundAnswer.createdAt);
      
        let difference = dateNow - answerCreatedAt;
      
        if (difference < EDIT_TIMEOUT) {
          
          if (foundAnswer.author._id.toString() === userId.toString()) {
            res.status(200).json(foundAnswer);
          } else {
            res.status(401).json({ message: 'You do not have permission for editing this answer.' });
            return;
          }
          
        } else {
          res.status(403).json({ message: 'Editing is no longer available.' });
        }

      });
  } else { 
    res.status(404).json({ message: 'No answerId in request.' });
  }
};

//=========================================
// Update Answer
//=========================================
module.exports.answersUpdateOne = function(req, res) {
  const userId = req.user._id;
  const responseText = req.body.responseText;

  if (req.params && req.params.answerId) {
    Answer
      .findById({_id: req.params.answerId})
      .populate(
        {
          path: 'author',
          select: '_id name email createdAt updatedAt'
        }
      )
      .exec((error, foundAnswer) => {
        if (!foundAnswer) {
          res.status(404).json({ message: 'AnswerId not found.' });
          return;
        } else if (error) {
          res.status(404).json(error);
          return;
        }
        
        let dateNow = Date.now();
      
        let answerCreatedAt = Date.parse(foundAnswer.createdAt);

        let difference = dateNow - answerCreatedAt;
      
        if (difference < EDIT_TIMEOUT) {

          if (foundAnswer.author._id.toString() === userId.toString()) {
            foundAnswer.responseText = responseText || foundAnswer.responseText;
            
            foundAnswer.save((error, updatedAnswer) => {
              if (error) {
                res.status(404).json(error);
              } else {
                res.status(200).json(updatedAnswer);
              }
            });
          } else {
            res.status(401).json({ message: 'You do not have permission for editing this answer.' });
            return;
          }
          
        } else {
          res.status(403).json({ message: 'Editing is no longer available.' });
        }

      });
  } else { 
    res.status(404).json({ message: 'No answerId in request.' });
  }
  
};

//=========================================
// Update Answer with like or dislike
//=========================================
module.exports.answersUpdateOneWithMark = function(req, res) {
  const userId = req.user._id;
  const mark = req.body.mark;

  if (req.params && req.params.answerId) {
    Answer
      .findById({_id: req.params.answerId})
      .populate(
        {
          path: 'author',
          select: '_id'
        }
      )
      .exec((error, foundAnswer) => {
        if (!foundAnswer) {
          res.status(404).json({ message: 'AnswerId not found.' });
          return;
        } else if (error) {
          res.status(404).json(error);
          return;
        }

        if (foundAnswer.author._id.toString() === userId.toString()) {
          res.status(401).json({ message: 'You do not have permission for voting for this answer.' });
          return;
        }
      
        let compareUsers = function(userId) {
          return function(elem) {
            return elem.toString() === userId.toString();
          };
        };
      
        let cbCompareUsers = compareUsers(userId);

        let isInLikes = foundAnswer.likes.some(cbCompareUsers);

        let isInDislikes = foundAnswer.dislikes.some(cbCompareUsers);
 
        if (!isInLikes && !isInDislikes) {
          if (mark === 'like') {
            foundAnswer.likes.push(userId);
            foundAnswer.rating = foundAnswer.likes.length - foundAnswer.dislikes.length;
          } else if (mark === 'dislike') {
            foundAnswer.dislikes.push(userId);
            foundAnswer.rating = foundAnswer.likes.length - foundAnswer.dislikes.length;
          } else {
            res.status(404).json({ message: 'Missed mark' });
            return;
          }
        } else {
          res.status(403).json({ message: 'You have already voted for this answer.' });
          return;
        }
      
        foundAnswer.save((error, updatedAnswer) => {
          if (error) {
            res.status(404).json(error);
          } else {
            res.status(200).json(updatedAnswer);
          }
        });
        
    });
  } else { 
    res.status(404).json({ message: 'No answerId in request.' });
  }
  
};

//=========================================
// Update Answer with it usefulness
//=========================================
module.exports.answersUpdateOneWithUseful = function(req, res) {
  const userId = req.user._id;
  
  if (req.params && req.params.answerId && req.params.threadId) {
    Thread
      .findById({_id: req.params.threadId})
      .populate([
        {
          path: 'answers',
          select: '_id isUseful'
        },
        {
          path: 'author',
          select: '_id'
        }
      ])
      .exec((error, foundThread) => {
        if (!foundThread) {
          res.status(404).json({ message: 'ThreadId not found.' });
          return;
        } else if (error) {
          res.status(404).json(error);
          return;
        }

        if (foundThread.author._id.toString() !== userId.toString()) {
          res.status(401).json({ message: 'You do not have permission for voting for this answer.' });
          return;
        }
        
        let usefulAnswers = foundThread.answers.filter( answer => answer.isUseful );
        
        let usefulAnswerId = (usefulAnswers.length === 0) ? null : usefulAnswers[0]._id;

        Answer
         .findById({_id: req.params.answerId})
         .exec((error, foundAnswer) => {
           if (!foundAnswer) {
             res.status(404).json({ message: 'AnswerId not found.' });
             return;
           } else if (error) {
             res.status(404).json(error);
             return;
           }
          
           if (foundThread.author.toString() === foundAnswer.author.toString()) {
             res.status(401).json({ message: 'You do not have permission for voting for this answer.' });
             return;
           } else {
             if (!usefulAnswerId) {
               foundAnswer.isUseful = true;
             } else {
               if (foundAnswer._id.toString() === usefulAnswerId.toString()) {
                 foundAnswer.isUseful = false;
               } else {
                 res.status(403).json({ message: 'The best answer is alerady exists.' });
                 return;
               }
             }
           }

           foundAnswer.save((error, updatedAnswer) => {
             if (error) {
               res.status(404).json(error);
             } else {
               res.status(200).json(updatedAnswer);
             }
           });

        });

    });
    
  } else {
    res.status(404).json({ message: 'No answerId or threadId in request.' });
  }
  
};
