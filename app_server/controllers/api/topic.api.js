'use strict';

const mongoose = require('mongoose');
const Topic = mongoose.model('Topic');
const Thread = mongoose.model('Thread');
const Answer = mongoose.model('Answer');

const util = require('../utilities/helper');

//=========================================
// Get All Topics
//=========================================
module.exports.getTopics = function(req, res) {
  Topic
    .find({})
    .populate({
      path: 'threads',
      populate: [
        {
          path: 'author', 
          select: '_id name email profile',
          populate: {
            path: 'profile',
            select: 'nickname'
          }
        },
        {
          path: 'topic', 
          select: '_id'
        },
        {
          path: 'answers', 
          select: '_id author createdAt', 
          populate: {
            path: 'author',
            select: 'name profile',
            populate: {
              path: 'profile',
              select: 'nickname'
            }
          }
        }
      ],
      options: { limit: 2 }
    })
    .exec((error, topics) => {
    if (!error){
      util.sendJsonResponse(res, 200, topics);
    } else {
      util.sendJsonResponse(res, 400, error);
    }
  });
};

//=========================================
// Get Topics Titles
//=========================================
module.exports.getTopicsTitles = function(req, res) {
  Topic
    .find({})
    .select('_id title')
    .exec((error, topics) => {
    if (!error){
      util.sendJsonResponse(res, 200, topics);
    } else {
      util.sendJsonResponse(res, 400, error);
    }
  });
};

//=========================================
// Create Topic
//=========================================
module.exports.topicsCreate = function(req, res, next) {
  const title = req.body.title;
  const threads = req.body.threads || [];
  
  if (!title) {
    util.sendJsonResponse(res, 400, {
      "message": "Title required"
    });
    return;
  }
  
  Topic.findOne({ title: title }, (error, existingTopic) => {
    if (error) { 
      return next(error);
    }

    // If topic is not unique, return message
    if (existingTopic) {
      return res.status(422).send({ message: 'That topic is already in use.' });
    }
    
    Topic.create({
      title: title,
      threads: threads
    }, (error, newTopic) => {
      if (error) {
        util.sendJsonResponse(res, 400, error);
      } else {
        util.sendJsonResponse(res, 201, newTopic);
      }
    });
  
  });
};

//=========================================
// Get One Topic
//=========================================
module.exports.topicsReadOne = function(req, res) {
  if (req.params && req.params.topicId) {
    Topic
      .findById({_id: req.params.topicId})
      .populate({
        path: 'threads',
        populate: [
          {
            path: 'author', 
            select: '_id name email profile',
            populate: {
              path: 'profile',
              select: 'nickname'
            }
          },
          {
            path: 'topic', 
            select: '_id'
          },
          {
            path: 'answers', 
            select: '_id author createdAt updatedAt',
            populate: {
              path: 'author',
              select: 'name profile',
              populate: {
                path: 'profile',
                select: 'nickname'
              }
            }
          }
        ]
      })
      .exec((error, foundTopic) => {
        if (!foundTopic) {
          res.status(404).json({ message: 'TopicId not found.' });
          return;
        } else if (error) {
          res.status(404).json(error);
          return;
        }
        res.status(200).json(foundTopic);
      });
  } else { 
    res.status(404).json({ message: 'No topicId in request.' });
  }
};

//=========================================
// Update Topic
//=========================================
module.exports.topicsUpdateOne = function(req, res, next) {
  if (req.params && req.params.topicId) {
    Topic
      .findById(req.params.topicId, (error, foundTopic) => {
      
        if (!foundTopic) {
          res.status(404).json({ message: 'TopicId not found.' });
          return;
        } else if (error) {
          res.status(404).json(error);
          return;
        }
        
        Topic.findOne({ title: req.body.title }, (error, existingTopic) => {
          
          if (error) {
            return next(error);
          }
        
          // If topic is not unique, return message
          if (existingTopic) {
            return res.status(422).send({ message: 'That topic is already in use. Please try again.' });
          }
         
          foundTopic.title = req.body.title || foundTopic.title;
          foundTopic.threads = req.body.threads || foundTopic.threads;
          
          foundTopic.save((error, updatedTopic) => {
            if (error) {
              res.status(404).json(error);
            } else {
              res.status(200).json(updatedTopic);
            }
          });
          
        });
  
      });
  } else { 
    res.status(404).json({ message: 'No topicId in request.' });
  }
};

//=========================================
// Remove Topic
//=========================================
module.exports.topicsRemoveOne = function(req, res) {
  if (req.params && req.params.topicId) {
    Topic
      .findById(req.params.topicId, (error, foundTopic) => {
        if (!foundTopic) {
          res.status(404).json({ message: 'TopicId not found.' });
          return;
        } else if (error) {
          res.status(404).json(error);
          return;
        }

        // Remove all bound threads
        if (foundTopic.threads && foundTopic.threads.length !== 0) {

          foundTopic.threads.forEach((threadId) => {
            
            Thread
              .findByIdAndRemove(threadId, (error, foundThread) => {
                if (error) {
                  console.log(error);
                  return;
                }
              
                if (foundThread.answers && foundThread.answers.length !== 0) {
                  Answer.remove({thread: foundThread._id}, (error) => {
                    if (error) {
                      console.log(error);
                      return;
                    }
                  });
                }
            });
          });
        }

        // Remove topic itself
        Topic
          .deleteOne({_id: foundTopic._id}, (error) => {
            if (error) {
              res.status(404).json(error);
              return;
            }
            res.status(204).json(null);
        });
      
    });
  } else { 
    res.status(404).json({ message: 'No topicId in request.' });
  }
};
