'use strict';

const mongoose = require('mongoose');
const Topic = mongoose.model('Topic');
const Thread = mongoose.model('Thread');
const Answer = mongoose.model('Answer');
const ROLE_ADMIN = require('../../config/constants').ROLE_ADMIN;
const ROLE_USER = require('../../config/constants').ROLE_USER;
const EDIT_TIMEOUT = require('../../config/constants').EDIT_TIMEOUT;

const util = require('../utilities/helper');

//=========================================
// Create Thread
//=========================================
module.exports.threadsCreate = function(req, res, next) {
  const title = req.body.title;
  const description = req.body.description;
  const answers = req.body.answers || [];
  const likes = req.body.likes || [];
  const dislikes = req.body.dislikes || [];
  const userId = req.user._id;
  
  if (!title || !description) {
    util.sendJsonResponse(res, 400, {
      "message": "Title and description required"
    });
    return;
  }
  
  if (req.params && req.params.topicId) {
    let topicId = req.params.topicId;
    
    Topic
      .findById(req.params.topicId, (error, foundTopic) => {
      
        if (!foundTopic) {
          res.status(404).json({ message: 'TopicId not found.' });
          return;
        } else if (error) {
          res.status(404).json(error);
          return;
        }
      
        Thread.create({
          author: userId,
          title: title,
          description: description,
          topic: topicId,
          answers: answers,
          likes: likes,
          dislikes: dislikes
        }, (error, newThread) => {
          if (error) {
            util.sendJsonResponse(res, 400, error);
          } else {
            foundTopic.threads.unshift(newThread._id);
            foundTopic.save((error, updatedTopic) => {
              if (error) {
                res.status(404).json(error);
              }
            });
            
            util.sendJsonResponse(res, 201, newThread);
          }
        });

      });
  } else { 
    res.status(404).json({ message: 'No topicId in request.' });
  }

};

//=========================================
// Get One Thread
//=========================================
module.exports.threadsReadOne = function(req, res) {
  if (req.params && req.params.threadId) {
    Thread
      .findById({_id: req.params.threadId})
      .populate([
        {
          path: 'author',
          select: '_id name email profile',
          populate: {
            path: 'profile',
            select: 'nickname image'
          }
        },
        {
          path: 'topic',
          select: '_id title'
        },
        {
          path: 'answers',
          populate: [
            {
              path: 'author',
              select: '_id name email profile',
              populate: {
                path: 'profile',
                select: 'nickname image'
              }
            }
          ]
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
        res.status(200).json(foundThread);
      });
  } else { 
    res.status(404).json({ message: 'No threadId in request.' });
  }
};

//=========================================
// Update Thread
//=========================================
module.exports.threadsUpdateOne = function(req, res) {
  const title = req.body.title;
  const description = req.body.description;
  const userId = req.user._id;
  const userRole = req.user.role;

  if (req.params && req.params.threadId && req.params.topicId) {
    // Find thread
    Thread
      .findById({_id: req.params.threadId})
      .populate({
        path: 'author',
        select: '_id createdAt'
      })
      .exec((error, foundThread) => {
      
        if (!foundThread) {
          res.status(404).json({ message: 'ThreadId not found.'});
          return;
        } else if (error) {
          res.status(404).json(error);
          return;
        }
       
      let isAuthor = (userId.toString() === foundThread.author._id.toString());
      let isAdmin = (userRole === ROLE_ADMIN);
  
      if (!isAuthor && !isAdmin) {
        res.status(401).json({ message: "You do not have permissions to make this operation."});
        return;
      }
      
      foundThread.title = title || foundThread.title;
      foundThread.description = description || foundThread.description;
  
      // Check if there was a move request for the thread (only the admin has permission)
      if (req.params.topicId !== req.body.topic._id) {
        if (isAdmin) {
          Topic
            .findById(req.params.topicId, (error, currentTopic) => {
              if (!currentTopic) {
                res.status(404).json({ message: 'TopicId not found.' });
                return;
              } else if (error) {
                res.status(404).json(error);
                return;
              }
            
            Topic
              .findById(req.body.topic._id, (error, newTopic) => {
                if (!newTopic) {
                  res.status(404).json({ message: 'TopicId not found.' });
                  return;
                } else if (error) {
                  res.status(404).json(error);
                  return;
                }
  
                // Remove thread reference from currentTopic
                let ind = currentTopic.threads.indexOf(foundThread._id);

                if (~ind) {
                  currentTopic.threads.splice(ind, 1);

                  currentTopic.save((error, updatedTopic) => {
                    if (error) {
                      res.status(404).json(error);
                    }
                  });
                } else {
                  res.status(404).json({ message: 'ThreadId not found.' });
                }

                // Update newTopic with thread
                newTopic.threads.unshift(foundThread._id);
                newTopic.save((error, updatedTopic) => {
                  if (error) {
                    res.status(404).json(error);
                  }
                });

                foundThread.topic = newTopic._id;

                // Save updated thread
                saveFoundThread(foundThread);
              });
            
            });
          
        } else {
          res.status(401).json({ message: "You do not have permissions to make this operation."});
          return;
        }
      } else {
        
        if (isAdmin) {
          saveFoundThread(foundThread);
        } else {
          let dateNow = Date.now();
          let threadCreatedAt = Date.parse(foundThread.createdAt);
          let difference = dateNow - threadCreatedAt;
          
          if (difference < EDIT_TIMEOUT) {
            // Save updated thread
            saveFoundThread(foundThread);
          } else {
            res.status(403).json({ message: 'Editing is no longer available.' });
          }
        }

      }

    });
  } else {
    res.status(404).json({ message: 'No threadId or topicId in request.' });
  }
  
  /**
   * Saves the thread in the database.
   * @returns void
   */
  function saveFoundThread(foundThread) {
    foundThread.save((error, updatedThread) => {
      if (error) {
        res.status(404).json(error);
      } else {
        res.status(200).json(updatedThread);
      }
    });
  }
};

//=========================================
// Update Thread with like or dislike
//=========================================
module.exports.threadsUpdateOneWithMark = function(req, res) {
  const userId = req.user._id;
  const mark = req.body.mark;

  if (req.params && req.params.threadId) {
    Thread
      .findById({_id: req.params.threadId})
      .populate(
        {
          path: 'author',
          select: '_id'
        }
      )
      .exec((error, foundThread) => {
        if (!foundThread) {
          res.status(404).json({ message: 'ThreadId not found.' });
          return;
        } else if (error) {
          res.status(404).json(error);
          return;
        }
      
        if (foundThread.author._id.toString() === userId.toString()) {
          res.status(401).json({ message: 'You do not have permission for voting for this thread.' });
          return;
        }
      
        let compareUsers = function(userId) {
          return function(elem) {
            return elem.toString() === userId.toString();
          };
        };
      
        let cbCompareUsers = compareUsers(userId);

        let isInLikes = foundThread.likes.some(cbCompareUsers);
      
        let isInDislikes = foundThread.dislikes.some(cbCompareUsers);

        if (!isInLikes && !isInDislikes) {
          if (mark === 'like') {
            foundThread.likes.push(userId);
            foundThread.rating = foundThread.likes.length - foundThread.dislikes.length;
          } else if (mark === 'dislike') {
            foundThread.dislikes.push(userId);
            foundThread.rating = foundThread.likes.length - foundThread.dislikes.length;
          } else {
            res.status(404).json({ message: 'Missed mark' });
            return;
          }
        } else {
          res.status(403).json({ message: 'You have already voted for this thread.' });
          return;
        }
      
        foundThread.save((error, updatedThread) => {
          if (error) {
            res.status(404).json(error);
          } else {
            res.status(200).json(updatedThread);
          }
        });
        
    });
  } else { 
    res.status(404).json({ message: 'No threadId in request.' });
  }
  
};

//=========================================
// Remove Thread
//=========================================
module.exports.threadsRemoveOne = function(req, res) {
  if (req.params && req.params.threadId) {
    // Find thread
    Thread
      .findById(req.params.threadId, (error, foundThread) => {
      
        if (!foundThread) {
          res.status(404).json({ message: 'ThreadId not found.' });
          return;
        } else if (error) {
          res.status(404).json(error);
          return;
        }
      
        // Find parent topic
        Topic
          .findById(foundThread.topic, (error, foundTopic)  => {
            if (!foundTopic) {
              res.status(404).json({ message: 'Topic not found.' });
              return;
            } else if (error) {
              res.status(404).json(error);
              return;
            }
            
            // Remove thread reference from topic
            let ind = foundTopic.threads.indexOf(foundThread._id);

            if (~ind) {
              foundTopic.threads.splice(ind, 1);
              foundTopic.save((error, updatedTopic) => {
                if (error) {
                  res.status(404).json(error);
                  return;
                }
                
                // Remove all bound answers
                if (foundThread.answers && foundThread.answers.length !== 0) {
                  Answer.remove({thread: foundThread._id}, (error) => {
                    if (error) {
                      console.log(error);
                      return;
                    }
                  });
                }

                // Remove thread itself
                Thread
                  .deleteOne({_id: foundThread._id}, (error) => {
                    if (error) {
                      res.status(404).json(error);
                      return;
                    }
                    res.status(204).json(null);
                });
                
              });
            } else {
              res.status(404).json({ message: 'ThreadId not found in topic.' });
            }
            
        });
 
    });
  } else { 
    res.status(404).json({ message: 'No threadId in request.' });
  }
};
